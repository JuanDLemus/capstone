import json
import threading
import tkinter as tk
from tkinter import ttk, scrolledtext
import requests


BASE_URL = "http://192.168.20.189:1234/v1"
MODEL = "local-model"  # LM Studio usually ignores this if a model is already loaded
TIMEOUT = 300


class LMStudioChatGUI:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("LM Studio Chat")
        self.root.geometry("900x700")

        self.messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            }
        ]

        self._build_ui()

    def _build_ui(self):
        main = ttk.Frame(self.root, padding=10)
        main.pack(fill="both", expand=True)

        top = ttk.Frame(main)
        top.pack(fill="x", pady=(0, 8))

        ttk.Label(top, text="Server").grid(row=0, column=0, sticky="w")
        self.server_var = tk.StringVar(value=BASE_URL)
        self.server_entry = ttk.Entry(top, textvariable=self.server_var, width=50)
        self.server_entry.grid(row=0, column=1, sticky="ew", padx=5)

        ttk.Label(top, text="Model").grid(row=0, column=2, sticky="w")
        self.model_var = tk.StringVar(value=MODEL)
        self.model_entry = ttk.Entry(top, textvariable=self.model_var, width=20)
        self.model_entry.grid(row=0, column=3, sticky="ew", padx=5)

        self.test_button = ttk.Button(top, text="Test connection", command=self.test_connection)
        self.test_button.grid(row=0, column=4, padx=(5, 0))

        top.columnconfigure(1, weight=1)
        top.columnconfigure(3, weight=0)

        self.chat_box = scrolledtext.ScrolledText(main, wrap=tk.WORD, state="disabled", font=("Segoe UI", 11))
        self.chat_box.pack(fill="both", expand=True, pady=(0, 8))

        settings = ttk.Frame(main)
        settings.pack(fill="x", pady=(0, 8))

        ttk.Label(settings, text="Temperature").grid(row=0, column=0, sticky="w")
        self.temp_var = tk.DoubleVar(value=0.7)
        self.temp_spin = ttk.Spinbox(settings, from_=0.0, to=2.0, increment=0.1, textvariable=self.temp_var, width=8)
        self.temp_spin.grid(row=0, column=1, padx=(5, 15))

        ttk.Label(settings, text="Max tokens").grid(row=0, column=2, sticky="w")
        self.max_tokens_var = tk.IntVar(value=512)
        self.max_tokens_spin = ttk.Spinbox(settings, from_=1, to=8192, increment=1, textvariable=self.max_tokens_var, width=10)
        self.max_tokens_spin.grid(row=0, column=3, padx=(5, 15))

        self.streaming_var = tk.BooleanVar(value=False)
        self.streaming_check = ttk.Checkbutton(settings, text="Stream", variable=self.streaming_var)
        self.streaming_check.grid(row=0, column=4, sticky="w")

        input_frame = ttk.Frame(main)
        input_frame.pack(fill="x")

        self.input_box = scrolledtext.ScrolledText(input_frame, wrap=tk.WORD, height=6, font=("Segoe UI", 11))
        self.input_box.pack(fill="x", expand=True, side="left")
        self.input_box.bind("<Control-Return>", self._send_shortcut)

        button_frame = ttk.Frame(input_frame)
        button_frame.pack(fill="y", side="left", padx=(8, 0))

        self.send_button = ttk.Button(button_frame, text="Send", command=self.send_message)
        self.send_button.pack(fill="x", pady=(0, 5))

        self.clear_button = ttk.Button(button_frame, text="Clear chat", command=self.clear_chat)
        self.clear_button.pack(fill="x", pady=(0, 5))

        self.new_context_button = ttk.Button(button_frame, text="Reset context", command=self.reset_context)
        self.new_context_button.pack(fill="x")

        self.status_var = tk.StringVar(value="Ready")
        status = ttk.Label(main, textvariable=self.status_var, anchor="w")
        status.pack(fill="x", pady=(8, 0))

        self._append_chat("System", "Connected GUI initialized.\nCtrl+Enter = send")

    def _append_chat(self, speaker: str, text: str):
        self.chat_box.configure(state="normal")
        self.chat_box.insert(tk.END, f"\n{speaker}:\n{text}\n")
        self.chat_box.see(tk.END)
        self.chat_box.configure(state="disabled")

    def _set_status(self, text: str):
        self.status_var.set(text)

    def _send_shortcut(self, event):
        self.send_message()
        return "break"

    def clear_chat(self):
        self.chat_box.configure(state="normal")
        self.chat_box.delete("1.0", tk.END)
        self.chat_box.configure(state="disabled")
        self._append_chat("System", "Chat cleared visually. Context preserved.")

    def reset_context(self):
        self.messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            }
        ]
        self._append_chat("System", "Conversation context reset.")

    def test_connection(self):
        def worker():
            self._set_status("Testing connection...")
            try:
                base = self.server_var.get().rstrip("/")
                url = f"{base}/models"
                response = requests.get(url, timeout=15)
                response.raise_for_status()
                data = response.json()

                model_names = []
                if isinstance(data, dict) and "data" in data:
                    for item in data["data"]:
                        if isinstance(item, dict) and "id" in item:
                            model_names.append(item["id"])

                msg = "Connection OK."
                if model_names:
                    msg += f" Models: {', '.join(model_names)}"

                self.root.after(0, lambda: self._append_chat("System", msg))
                self.root.after(0, lambda: self._set_status("Connection OK"))
            except Exception as e:
                self.root.after(0, lambda: self._append_chat("System", f"Connection failed:\n{e}"))
                self.root.after(0, lambda: self._set_status("Connection failed"))

        threading.Thread(target=worker, daemon=True).start()

    def send_message(self):
        user_text = self.input_box.get("1.0", tk.END).strip()
        if not user_text:
            return

        self.input_box.delete("1.0", tk.END)
        self._append_chat("You", user_text)
        self.messages.append({"role": "user", "content": user_text})

        self.send_button.config(state="disabled")
        self._set_status("Generating response...")

        if self.streaming_var.get():
            threading.Thread(target=self._stream_response, daemon=True).start()
        else:
            threading.Thread(target=self._normal_response, daemon=True).start()

    def _payload(self):
        return {
            "model": self.model_var.get().strip() or "local-model",
            "messages": self.messages,
            "temperature": float(self.temp_var.get()),
            "max_tokens": int(self.max_tokens_var.get()),
        }

    def _normal_response(self):
        try:
            url = f"{self.server_var.get().rstrip('/')}/chat/completions"
            payload = self._payload()
            payload["stream"] = False

            response = requests.post(url, json=payload, timeout=TIMEOUT)
            response.raise_for_status()
            data = response.json()

            assistant_text = (
                data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")
                .strip()
            )

            if not assistant_text:
                assistant_text = "[Empty response from model]"

            self.messages.append({"role": "assistant", "content": assistant_text})

            self.root.after(0, lambda: self._append_chat("Assistant", assistant_text))
            self.root.after(0, lambda: self._set_status("Ready"))

        except Exception as e:
            self.root.after(0, lambda: self._append_chat("System", f"Error:\n{e}"))
            self.root.after(0, lambda: self._set_status("Error"))

        finally:
            self.root.after(0, lambda: self.send_button.config(state="normal"))

    def _stream_response(self):
        placeholder = "\nAssistant:\n"
        assistant_chunks = []

        def start_stream_ui():
            self.chat_box.configure(state="normal")
            self.chat_box.insert(tk.END, placeholder)
            self.chat_box.see(tk.END)
            self.chat_box.configure(state="disabled")

        def append_stream_ui(text_chunk: str):
            self.chat_box.configure(state="normal")
            self.chat_box.insert(tk.END, text_chunk)
            self.chat_box.see(tk.END)
            self.chat_box.configure(state="disabled")

        def end_stream_ui():
            self.chat_box.configure(state="normal")
            self.chat_box.insert(tk.END, "\n")
            self.chat_box.see(tk.END)
            self.chat_box.configure(state="disabled")

        try:
            self.root.after(0, start_stream_ui)

            url = f"{self.server_var.get().rstrip('/')}/chat/completions"
            payload = self._payload()
            payload["stream"] = True

            with requests.post(url, json=payload, stream=True, timeout=TIMEOUT) as response:
                response.raise_for_status()

                for raw_line in response.iter_lines(decode_unicode=True):
                    if not raw_line:
                        continue
                    if not raw_line.startswith("data: "):
                        continue

                    data_str = raw_line[6:].strip()
                    if data_str == "[DONE]":
                        break

                    try:
                        chunk = json.loads(data_str)
                        delta = chunk.get("choices", [{}])[0].get("delta", {}).get("content", "")
                        if delta:
                            assistant_chunks.append(delta)
                            self.root.after(0, append_stream_ui, delta)
                    except json.JSONDecodeError:
                        continue

            full_text = "".join(assistant_chunks).strip()
            if not full_text:
                full_text = "[Empty streamed response from model]"

            self.messages.append({"role": "assistant", "content": full_text})
            self.root.after(0, end_stream_ui)
            self.root.after(0, lambda: self._set_status("Ready"))

        except Exception as e:
            self.root.after(0, lambda: self._append_chat("System", f"Streaming error:\n{e}"))
            self.root.after(0, lambda: self._set_status("Error"))

        finally:
            self.root.after(0, lambda: self.send_button.config(state="normal"))


if __name__ == "__main__":
    root = tk.Tk()
    style = ttk.Style()
    try:
        style.theme_use("clam")
    except Exception:
        pass

    app = LMStudioChatGUI(root)
    root.mainloop()