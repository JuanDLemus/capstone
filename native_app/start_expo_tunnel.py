import sys
import os
import subprocess
import re
import json
import time
import io
import qrcode

# NGROK FREE-TIER URL PATTERN — matches ngrok-free.app and ngrok-free.dev
NGROK_URL_RE = re.compile(r'url=(https://[a-zA-Z0-9-]+\.ngrok-free\.[a-z]+)')

# EXPO TUNNEL URL PATTERN — excludes LAN/loopback addresses
EXPO_URL_RE = re.compile(r'((?:exp|exps)://[a-zA-Z0-9.-]+(?::\d+)?(?:/[a-zA-Z0-9./_-]*)?)')


# PARSE NGROK URL FROM LOG LINE
def parse_ngrok_url(line: str) -> str | None:
    match = NGROK_URL_RE.search(line)
    return match.group(1) if match else None


# PARSE EXPO TUNNEL URL FROM LOG LINE
def parse_expo_url(line: str) -> str | None:
    match = EXPO_URL_RE.search(line)
    if match:
        url = match.group(1)
        if "192.168." not in url and "127.0.0.1" not in url and "localhost" not in url:
            return url
    return None


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


# START NGROK TUNNEL ON PORT 8081
def start_ngrok() -> subprocess.Popen:
    return subprocess.Popen(
        ["ngrok", "http", "8081", "--log=stdout"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )


# START EXPO WITH NATIVE TUNNEL (generates real WAN exp:// URL)
def start_expo_tunnel() -> subprocess.Popen:
    return subprocess.Popen(
        ["npx", "expo", "start", "--tunnel"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True,
        cwd=os.path.dirname(os.path.abspath(__file__)),
    )


# GENERATE QR AND PUBLISH TO GITHUB
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


# GENERATE ASCII QR FROM URL
def make_ascii_qr(url: str) -> str:
    qr = qrcode.QRCode(border=1)
    qr.add_data(url)
    qr.make(fit=True)
    buf = io.StringIO()
    qr.print_ascii(out=buf)
    return buf.getvalue()


# MAIN ROUTINE — strategy: Expo --tunnel (Expo's own WAN tunnel via ngrok internally)
def main() -> None:
    print("[Auto-Publisher] Cleaning port 8081 and existing ngrok processes...")
    clean_port_8081()
    clean_ngrok()

    print("[Auto-Publisher] Starting Expo with --tunnel mode (WAN accessible)...")
    expo_proc = None
    try:
        expo_proc = start_expo_tunnel()
        expo_url: str | None = None
        start_time = time.time()
        timeout = 120

        while time.time() - start_time < timeout:
            line = expo_proc.stdout.readline()
            if not line:
                break
            sys.stdout.write(line)
            sys.stdout.flush()

            if expo_url is None:
                found = parse_expo_url(line)
                if found:
                    expo_url = found
                    print(f"\n[Auto-Publisher] WAN Expo URL detected: {expo_url}")

                    qr_text = make_ascii_qr(expo_url)
                    print("\nScan this QR in Expo Go:")
                    print(qr_text)
                    print(f"Expo Go URL: {expo_url}\n")

                    publish_config(expo_url, qr_text)

        if expo_url is None:
            print("[Auto-Publisher] No WAN Expo URL found within timeout. Check Expo tunnel output above.")

    finally:
        print("[Auto-Publisher] Shutting down Expo...")
        kill_proc(expo_proc)


if __name__ == "__main__":
    main()
