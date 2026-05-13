import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/chinh-sach-thanh-toan")({
  component: PaymentPolicy,
});

function PaymentPolicy() {
  return (
    <SiteLayout>
      <main className="min-h-screen bg-cream pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 pt-4 md:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Về trang chủ</Link>
        </div>
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold md:text-4xl text-primary">Chính Sách Thanh Toán</h1>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="prose prose-stone mt-12 max-w-none text-muted-foreground">
            <p>
              Để mang lại sự thuận tiện nhất cho khách hàng, Hoa Tươi Thanh Ngọc áp dụng các phương thức thanh toán linh hoạt, an toàn và bảo mật sau đây:
            </p>

            <h3 className="text-primary font-serif">1. Thanh toán chuyển khoản ngân hàng</h3>
            <p>
              Đây là hình thức phổ biến nhất. Khách hàng có thể chuyển khoản trực tiếp vào tài khoản ngân hàng của cửa hàng trước khi giao hoa. 
              Vui lòng ghi chú mã đơn hàng hoặc số điện thoại người đặt trong nội dung chuyển khoản để chúng tôi xác nhận nhanh chóng.
            </p>
            <div className="bg-primary/5 p-6 rounded-xl my-4 border border-primary/10">
              <p className="mb-2"><strong>Thông tin tài khoản:</strong></p>
              <ul className="mt-0">
                <li>Ngân hàng: <strong>Vietcombank</strong></li>
                <li>Số tài khoản: <strong>0123456789</strong></li>
                <li>Chủ tài khoản: <strong>NGUYEN THANH NGOC</strong></li>
              </ul>
            </div>

            <h3 className="text-primary font-serif">2. Thanh toán khi nhận hàng (COD)</h3>
            <p>
              Khách hàng có thể thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng sau khi nhận hoa và kiểm tra tình trạng hoa.
              <em> (Lưu ý: Hình thức này chỉ áp dụng cho người đặt là người trực tiếp nhận hoa).</em>
            </p>

            <h3 className="text-primary font-serif">3. Thanh toán qua ví điện tử</h3>
            <p>
              Chúng tôi hỗ trợ thanh toán nhanh chóng qua các ví điện tử phổ biến như MoMo, ZaloPay, VNPay. Mã QR thanh toán sẽ được gửi kèm khi chốt đơn.
            </p>

            <h3 className="text-primary font-serif">4. Quy định đặt cọc (Đối với đơn hàng lớn)</h3>
            <p>
              Đối với các đơn hàng sự kiện, hoa cưới, hoa khai trương có giá trị từ 2.000.000đ trở lên, quý khách vui lòng thanh toán hoặc đặt cọc trước ít nhất 50% giá trị đơn hàng để chúng tôi tiến hành chuẩn bị hoa và thiết kế tốt nhất.
            </p>
          </div>
        </div>
      </div>
    </main>
    </SiteLayout>
  );
}
