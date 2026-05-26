import sys
import os
import subprocess
import re
import json
import time
import io
import urllib.request
import qrcode

# EXPO TUNNEL URL PATTERN
EXPO_URL_RE = re.compile(r'((?:exp|exps)://[a-zA-Z0-9.-]+(?::\d+)?(?:/[a-zA-Z0-9./_-]*)?)')


# KILL PROCESS TREE
def kill_proc(proc: subprocess.Popen | None) -> None:
    if proc is None:
        return
    try:
        subprocess.run(
            ["taskkill", "/F", "/T", "/PID", str(proc.pid)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except Exception:
        try:
            proc.terminate()
        except Exception:
            pass


# START SYSTEM NGROK
def start_ngrok() -> subprocess.Popen:
    return subprocess.Popen(
        ["ngrok", "http", "8081"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


# GET NGROK PUBLIC URL
def get_ngrok_url() -> str | None:
    for port in (4040, 4041, 4042, 4043, 4044, 4045):
        try:
            url = f"http://localhost:{port}/api/tunnels"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=2) as response:
                data = json.loads(response.read().decode())
                for tunnel in data.get("tunnels", []):
                    if tunnel.get("proto") == "https" and "loca.lt" not in tunnel.get("public_url", ""):
                        return str(tunnel.get("public_url"))
        except Exception:
            pass
    return None


# START EXPO DEV SERVER
def start_expo(ngrok_url: str) -> subprocess.Popen:
    env = os.environ.copy()
    env["EXPO_PACKAGER_PROXY_URL"] = ngrok_url
    return subprocess.Popen(
        ["npx", "expo", "start", "--lan"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True,
        env=env,
        cwd=os.path.dirname(os.path.abspath(__file__)),
    )


# PUBLISH CONFIG TO GITHUB
def publish_config(url: str, qr_text: str) -> None:
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    config_path = os.path.join(root_dir, "config.json")
    print(f"\n[Auto-Publisher] Updating {config_path}...")
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            config = json.load(f)
        config["expo_tunnel_url"] = url
        config["expo_ascii_qr"] = qr_text
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        print("[Auto-Publisher] config.json updated. Pushing to GitHub...")
        subprocess.run(["git", "add", "config.json"], shell=True, cwd=root_dir)
        subprocess.run(
            ["git", "commit", "-m", "chore: update remote Expo QR and URL [skip ci]"],
            shell=True,
            cwd=root_dir,
        )
        subprocess.run(["git", "push", "origin", "main"], shell=True, cwd=root_dir)
        print("[Auto-Publisher] Published Expo QR and URL to GitHub raw.")
    except Exception as e:
        print(f"[Auto-Publisher] Error publishing config: {e}")


# FREE PORT 8081
def clean_port_8081() -> None:
    try:
        output = subprocess.check_output("netstat -ano", shell=True, text=True)
        for line in output.splitlines():
            if ":8081" in line and "LISTENING" in line:
                parts = line.strip().split()
                if len(parts) >= 5:
                    pid = parts[-1]
                    print(f"[Auto-Publisher] Killing PID {pid} on port 8081")
                    subprocess.run(
                        ["taskkill", "/F", "/PID", pid],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL,
                    )
    except Exception as e:
        print(f"[Auto-Publisher] Error cleaning port 8081: {e}")


# KILL ALL NGROK PROCESSES
def clean_ngrok() -> None:
    try:
        subprocess.run(
            ["taskkill", "/F", "/IM", "ngrok.exe"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    except Exception:
        pass


# GENERATE ASCII QR
def make_ascii_qr(url: str) -> str:
    qr = qrcode.QRCode(border=1)
    qr.add_data(url)
    qr.make(fit=True)
    buf = io.StringIO()
    qr.print_ascii(out=buf)
    return buf.getvalue()


# MAIN ROUTINE
def main() -> None:
    print("[Auto-Publisher] Cleaning port 8081 and existing ngrok processes...")
    clean_port_8081()
    clean_ngrok()

    print("[Auto-Publisher] Starting ngrok tunnel on port 8081...")
    ngrok_proc = None
    expo_proc = None
    try:
        ngrok_proc = start_ngrok()
        ngrok_url: str | None = None
        start_time = time.time()
        timeout = 120

        while time.time() - start_time < timeout:
            ngrok_url = get_ngrok_url()
            if ngrok_url:
                break
            time.sleep(1)

        if not ngrok_url:
            print("[Auto-Publisher] Failed to capture ngrok URL. Exiting.")
            sys.exit(1)

        print(f"[Auto-Publisher] ngrok URL: {ngrok_url}")
        expo_url = ngrok_url.replace("https://", "exp://")

        qr_text = make_ascii_qr(expo_url)
        print("\nScan this QR in Expo Go:")
        print(qr_text)
        print(f"Expo Go URL: {expo_url}\n")

        publish_config(expo_url, qr_text)

        print("[Auto-Publisher] Starting Expo Metro with proxy URL...")
        expo_proc = start_expo(ngrok_url)

        # Forward stdout
        while True:
            line = expo_proc.stdout.readline()
            if not line:
                break
            sys.stdout.write(line)
            sys.stdout.flush()

    finally:
        print("[Auto-Publisher] Shutting down services...")
        kill_proc(expo_proc)
        kill_proc(ngrok_proc)


if __name__ == "__main__":
    main()
