import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/chinh-sach-bao-mat")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold md:text-4xl text-primary">Chính Sách Bảo Mật Thông Tin</h1>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="prose prose-stone mt-12 max-w-none text-muted-foreground">
            <h3 className="text-primary font-serif">1. Mục đích và phạm vi thu thập</h3>
            <p>
              Việc thu thập dữ liệu chủ yếu trên website {SITE.domain} bao gồm: email, điện thoại, tên khách hàng, địa chỉ giao hàng. Đây là các thông tin mà chúng tôi cần khách hàng cung cấp bắt buộc khi đặt hàng để liên hệ xác nhận, đảm bảo quyền lợi cho người tiêu dùng.
            </p>

            <h3 className="text-primary font-serif">2. Phạm vi sử dụng thông tin</h3>
            <p>
              Chúng tôi sử dụng thông tin khách hàng cung cấp để:
            </p>
            <ul>
              <li>Cung cấp các dịch vụ/sản phẩm đến khách hàng.</li>
              <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và cửa hàng.</li>
              <li>Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt.</li>
              <li>Không sử dụng thông tin cá nhân của khách hàng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại cửa hàng.</li>
            </ul>

            <h3 className="text-primary font-serif">3. Thời gian lưu trữ thông tin</h3>
            <p>
              Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân khách hàng sẽ được bảo mật trên máy chủ của {SITE.domain}.
            </p>

            <h3 className="text-primary font-serif">4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h3>
            <p>
              <strong>Hoa Tươi Thanh Ngọc</strong><br/>
              Địa chỉ: {SITE.address}<br/>
              Điện thoại: {SITE.phones[0]}<br/>
              Email: {SITE.email}
            </p>

            <h3 className="text-primary font-serif">5. Cam kết bảo mật thông tin cá nhân khách hàng</h3>
            <p>
              Thông tin cá nhân của khách hàng trên {SITE.domain} được chúng tôi cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
