## **Cookies**

_Cookies là các đoạn dữ liệu nhỏ được gửi từ server và lưu trữ trong máy người dùng._

_Chúng thường được dùng để lưu trữ thông tin người dùng giữa các phiên làm việc (sessions) như trạng thái đăng nhập, thông tin giỏ hàng, các tuỳ chọn cá nhân._

_Các thuộc tính của cookies:_

- name: tên của cookie
- value: giá trị của cookie
- domain: miền mà cookie thuộc về
- path: đường dẫn mà cookie thuộc về
- expires: ngày hết hạn của cookie
- maxAge: thời gian sống của cookie tính bằng giây
- secure: chỉ gửi cookie qua HTTPS
- httpOnly: cookie chỉ có thể truy cập từ máy chủ, không thể truy cập bằng javascript phía client
- sameSiteL chỉ định chính sách `SameSite` cho cookie (lax, strict, none)

_Ví dụ sử dụng cookies:_

- Lưu trữ thông tin đăng nhập:
  - Session ID: 1 trong những mục đích chính của cookie là lưu trữ session ID để nhận diện người dùng giữa các yêu cầu HTTP. Session ID này được liên kết dữ liệu phiên bên server, nơi lưu trữ thông tin người dùng.
  - Token xác thực: Lưu trữ JWT (JSON Web Token) hoặc các token xác thực khác để xác minh người dùng.
- Tuỳ chọn người dùng:
  - Ngôn ngữ: lưu trữ tuỳ chọn của người dùng để hiển thị trang web với ngôn ngữ mà họ chọn.
  - Chế độ hiển thị: Ghi nhớ chế độ hiển thị (dark mode/light mode) hoặc layout, theme và người dùng đã chọn.
- Giỏ hàng mua sắm:
  - Mã sản phẩm.

_Bảo mật cookie:_

- HTTP Only: đặt thuộc tính `httpOnly` để ngăn chặn javascript truy cập vào cookie, giảm thiểu rủi ro XSS (Cross-Site Scripting)
- Secure: đặt thuộc tính `secure` để đảm bảo cookie chỉ được gửi qua kết nối HTTPS, bảo vệ dữ liệu khỏi các cuộc tấn công MITM (Man-In-The-Middle).
- SameSite: đặt thuộc tính `sameSite` để ngăn chặn CSRF (Cross-Site Request Forgery)

## **Sessions**

_Session lưu trữ thông tin người dùng trên máy chủ và sử dụng session ID để theo dõi người dùng giữa các HTTP request._
_Session thường được lưu trữ trong 1 cookie._

_Ưu điểm:_

- Bảo mật hơn vì thông tin được lưu trữ phía server.
- Có thể lưu trữ nhiều dữ liệu hơn và không bị giới hạn kích thước.
- Dễ dàng quản lý và điều khiển từ phía server.

_Ví dụ sử dụng sessions:_

- Thông tin đăng nhập:
  - User ID: lưu trữ ID của người dùng đã đăng nhập để xác định họ trong suốt phiên làm việc.
  - Token xác thực: JWT, ...
- Thông tin người dùng:
  - Tuỳ chọn người dùng: các cài đặt cá nhân hoá như ngôn ngữ, giao diện,...
  - Dữ liệu tạm thời: Thông tin người dùng cần trong ngắn hạn, dữ liệu biểu mẫu, ...
- Giỏ hàng mua sắm:
  - Mã sản phẩm
  - Số lượng sản phẩm
- Trạng thái ứng dụng:
- Chống CSRF: Lưu trữ token `CSRF` để bảo vệ chống lại các cuộc tấn công Cross-Site Request Forgery.
