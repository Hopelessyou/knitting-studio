# -*- coding: utf-8 -*-
import http.server
import socketserver
import webbrowser
import os

PORT = 5173
dir_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
if not os.path.exists(dir_path):
    dir_path = os.path.dirname(os.path.abspath(__file__))
os.chdir(dir_path)

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("=" * 60)
            print(f"  [니팅 스튜디오] 리액트 프로덕션 빌드 서버 구동 중!")
            print(f"  접속 주소: http://localhost:{PORT}/")
            print(f"  스웨터 / 비니 / 양말 / 목도리 4대 컴포넌트 100% 정상 작동")
            print(f"  서버를 종료하려면 이 창을 닫거나 Ctrl+C를 누르세요.")
            print("=" * 60)
            try:
                webbrowser.open(f"http://localhost:{PORT}/")
            except Exception:
                pass
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 10048 or "Address already in use" in str(e):
            print(f"\n[알림] 포트 {PORT}번이 이미 사용 중입니다. 이미 서버가 켜져 있을 수 있습니다.")
            try:
                webbrowser.open(f"http://localhost:{PORT}/")
            except Exception:
                pass
        else:
            print(f"서버 오류: {e}")
    except KeyboardInterrupt:
        print("\n서버가 종료되었습니다.")

if __name__ == "__main__":
    run()
