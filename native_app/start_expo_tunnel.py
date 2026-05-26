import sys
import os
import subprocess
import re
import json
import time

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

# PROCESS EXPO OUTPUT
def process_expo_output(expo_proc):
    qr_lines = []
    expo_url = None
    is_collecting_qr = False
    pushed = False

    while True:
        line = expo_proc.stdout.readline()
        if not line:
            break
        sys.stdout.write(line)
        sys.stdout.flush()

        url = parse_expo_url(line)
        if url:
            expo_url = url
            print(f"\n[Auto-Publisher] Detected Remote Expo Proxy URL: {expo_url}")

        if is_qr_line(line):
            is_collecting_qr = True
            qr_lines.append(line.rstrip('\r\n'))
        else:
            if is_collecting_qr and len(qr_lines) > 5:
                is_collecting_qr = False
                if expo_url and not pushed:
                    publish_config(expo_url, "\n".join(qr_lines))
                    pushed = True

# MAIN ROUTINE
def main():
    print("[Auto-Publisher] Starting Ngrok and Expo Metro server...")
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
        expo_proc = start_expo(ngrok_url)
        process_expo_output(expo_proc)
    finally:
        print("[Auto-Publisher] Cleaning up processes...")
        kill_proc(expo_proc)
        kill_proc(ngrok_proc)

if __name__ == "__main__":
    main()
