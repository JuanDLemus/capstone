import unittest
import sys
import os

# Adjust path to import start_expo_tunnel
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))), "native_app"))

class TestExpoTunnel(unittest.TestCase):
    def test_parse_ngrok_url(self):
        from start_expo_tunnel import parse_ngrok_url
        line = 't=2026-05-26T12:37:39-0500 lvl=info msg="started tunnel" obj=tunnels name=command_line addr=http://localhost:8081 url=https://outclass-upstage-attain.ngrok-free.dev\n'
        url = parse_ngrok_url(line)
        self.assertEqual(url, "https://outclass-upstage-attain.ngrok-free.dev")

    def test_parse_expo_url(self):
        from start_expo_tunnel import parse_expo_url
        # Test with the custom proxy URL (ngrok-free.dev)
        line = 'Project URL: exp://outclass-upstage-attain.ngrok-free.dev\n'
        url = parse_expo_url(line)
        self.assertEqual(url, "exp://outclass-upstage-attain.ngrok-free.dev")

        # Test that local IPs are ignored/filtered out
        line_local = 'Project URL: exp://192.168.1.5:8081\n'
        url_local = parse_expo_url(line_local)
        self.assertIsNone(url_local)

    def test_is_qr_line(self):
        from start_expo_tunnel import is_qr_line
        qr_line = "▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄"
        normal_line = "Starting Metro Bundler..."
        self.assertTrue(is_qr_line(qr_line))
        self.assertFalse(is_qr_line(normal_line))

    def test_clean_functions_exist(self):
        from start_expo_tunnel import clean_port_8081, clean_ngrok
        self.assertTrue(callable(clean_port_8081))
        self.assertTrue(callable(clean_ngrok))

if __name__ == "__main__":
    unittest.main()
