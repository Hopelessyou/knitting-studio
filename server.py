# -*- coding: utf-8 -*-
import http.server
import socketserver
import webbrowser
import os
import sys

# Change directory to the web assets folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent YouTube embed Error 153 by setting Referrer-Policy
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Clean request log
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")
        sys.stdout.flush()

def main():
    socketserver.TCPServer.allow_reuse_address = True
    ports_to_try = [3000, 5000, 8080, 8000]
    httpd = None
    selected_port = None

    for port in ports_to_try:
        try:
            httpd = socketserver.TCPServer(("", port), CustomHandler)
            selected_port = port
            break
        except OSError:
            continue

    if not httpd:
        print("[오류] 포트(3000, 5000, 8080, 8000)가 모두 사용 중입니다.")
        input("종료하려면 엔터 키를 누르세요...")
        return

    url = f"http://localhost:{selected_port}/"
    print("=" * 60)
    print(f"  [니팅 스튜디오] 로컬 웹 서버 실행 완료!")
    print(f"  접속 주소: {url}")
    print(f"  유튜브 영상 및 4대 계산기 100% 정상 작동")
    print(f"  서버를 종료하려면 이 검은색 창을 닫아주세요.")
    print("=" * 60)
    sys.stdout.flush()

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버가 정상적으로 종료되었습니다.")

if __name__ == "__main__":
    main()
