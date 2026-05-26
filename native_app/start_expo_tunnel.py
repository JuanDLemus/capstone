import sys
import os
import subprocess
import re
import json
import time
import io
import qrcode

# IS QR LINE
def is_qr_line(line):
    stripped = line.strip()
    if not stripped:
        return False
    return bool(re.match(r'^[\u2580-\u259f\u25a0\s]+$', stripped))

# PARSE NGROK URL
def parse_ngrok_url(line):
    match = re.search(r'url=(https://[a-zA-Z0-9.-]+\.ngrok-free\.dev)', line)
    return match.group(1) if match else None

# PARSE EXPO URL
def parse_expo_url(line):
    match = re.search(r'((?:exp|exps)://[a-zA-Z0-9.-]+(?::\d+)?(?:/[a-zA-Z0-9./_-]*)?)', line)
    if match:
        url = match.group(1)
        if "192.168." not in url and "127.0.0.1" not in url and "localhost" not in url:
            return url
    return None

# KILL PROCESS
def kill_proc(proc):
    if proc:
        try:
            subprocess.run(["taskkill", "/F", "/T", "/PID", str(proc.pid)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except Exception:
            try:
                proc.terminate()
            except Exception:
                pass

# START NGROK
def start_ngrok():
    return subprocess.Popen(
        ["ngrok", "http", "8081", "--log=stdout"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True
    )

# START EXPO
def start_expo(ngrok_url):
    env = os.environ.copy()
    env["EXPO_PACKAGER_PROXY_URL"] = ngrok_url
    return subprocess.Popen(
        ["npx", "expo", "start", "--lan"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        shell=True,
        env=env,
        cwd=os.path.dirname(os.path.abspath(__file__))
    )

# PUBLISH CONFIG
def publish_config(url, qr_text):
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
        print("[Auto-Publisher] Updated config.json locally. Pushing to GitHub...")
        subprocess.run(["git", "add", "config.json"], shell=True)
        subprocess.run(["git", "commit", "-m", "chore: update remote Expo QR and URL [skip ci]"], shell=True)
        subprocess.run(["git", "push", "origin", "main"], shell=True)
        print("[Auto-Publisher] Successfully published Expo QR and URL to GitHub raw!")
    except Exception as e:
        print(f"[Auto-Publisher] Error publishing config: {e}")

# CLEAN PORT 8081
def clean_port_8081():
    try:
        output = subprocess.check_output("netstat -ano", shell=True, text=True)
        for line in output.splitlines():
            if ":8081" in line and "LISTENING" in line:
                parts = line.strip().split()
                if len(parts) >= 5:
                    pid = parts[-1]
                    print(f"[Auto-Publisher] Killing process {pid} using port 8081...")
                    subprocess.run(["taskkill", "/F", "/PID", pid], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"[Auto-Publisher] Error cleaning port 8081: {e}")

# CLEAN NGROK
def clean_ngrok():
    try:
        subprocess.run(["taskkill", "/F", "/IM", "ngrok.exe"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

# MAIN ROUTINE
def main():
    print("[Auto-Publisher] Cleaning up port 8081 and active Ngrok instances...")
    clean_port_8081()
    clean_ngrok()
    print("[Auto-Publisher] Starting Ngrok...")
    ngrok_proc = None
    expo_proc = None
    try:
        ngrok_proc = start_ngrok()
        ngrok_url = None
        start_time = time.time()
        while time.time() - start_time < 15:
            line = ngrok_proc.stdout.readline()
            if not line:
                break
            url = parse_ngrok_url(line)
            if url:
                ngrok_url = url
                break
        if not ngrok_url:
            print("[Auto-Publisher] Failed to establish Ngrok tunnel.")
            return

        print(f"[Auto-Publisher] Tunnel active: {ngrok_url}")
        expo_url = ngrok_url.replace("https://", "exp://")
        
        print("[Auto-Publisher] Generating ASCII QR code for Expo Go...")
        qr = qrcode.QRCode(border=1)
        qr.add_data(expo_url)
        qr.make(fit=True)
        f = io.StringIO()
        qr.print_ascii(out=f)
        qr_text = f.getvalue()
        
        print("\nScan this QR code to load the app in Expo Go:")
        print(qr_text)
        print(f"Expo Go URL: {expo_url}\n")
        
        publish_config(expo_url, qr_text)
        
        print("[Auto-Publisher] Starting Expo Metro Bundler...")
        expo_proc = start_expo(ngrok_url)
        while True:
            line = expo_proc.stdout.readline()
            if not line:
                break
            sys.stdout.write(line)
            sys.stdout.flush()
    finally:
        print("[Auto-Publisher] Cleaning up processes...")
        kill_proc(expo_proc)
        kill_proc(ngrok_proc)

if __name__ == "__main__":
    main()
