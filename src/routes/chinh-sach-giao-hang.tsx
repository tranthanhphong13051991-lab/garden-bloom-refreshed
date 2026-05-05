import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chinh-sach-giao-hang")({
  component: ShippingPolicy,
});

function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold md:text-4xl text-primary">Chính Sách Giao Hàng</h1>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="prose prose-stone mt-12 max-w-none text-muted-foreground">
            <h3 className="text-primary font-serif">1. Thời gian giao hàng</h3>
            <p>
              Hoa Tươi Thanh Ngọc cam kết giao hàng đúng thời gian đã hẹn với khách hàng. Thông thường:
            </p>
            <ul>
              <li><strong>Nội thành TP.HCM:</strong> Giao hỏa tốc trong vòng 1-2 giờ kể từ khi chốt đơn và hoàn tất thanh toán.</li>
              <li><strong>Khu vực ngoại thành:</strong> Thời gian giao hàng sẽ từ 2-4 giờ tùy khoảng cách.</li>
              <li>Đối với các ngày Lễ, Tết (Valentine, 8/3, 20/10...), do lượng đơn hàng tăng cao, thời gian giao hàng có thể xê dịch đôi chút. Quý khách vui lòng đặt trước 1-2 ngày để đảm bảo thời gian tốt nhất.</li>
            </ul>

            <h3 className="text-primary font-serif">2. Phí giao hàng</h3>
            <p>
              Phí giao hàng được tính dựa trên khoảng cách từ cửa hàng (Quận Bình Thạnh) đến địa chỉ của người nhận. Chúng tôi sẽ thông báo phí giao hàng chính xác khi quý khách xác nhận địa chỉ:
            </p>
            <ul>
              <li>Miễn phí giao hàng (Freeship) cho các quận nội thành lân cận với đơn hàng từ 1.000.000đ.</li>
              <li>Các quận xa hoặc ngoại thành sẽ có biểu phí ship hỗ trợ (dao động từ 30.000đ - 80.000đ).</li>
            </ul>

            <h3 className="text-primary font-serif">3. Quy định khi nhận hàng</h3>
            <p>
              Khi nhận hoa, quý khách (hoặc người nhận hộ) vui lòng kiểm tra kỹ tình trạng hoa. Nếu hoa bị dập nát, héo úa hoặc không đúng mẫu đã đặt do quá trình vận chuyển, quý khách vui lòng phản hồi ngay lập tức cho tài xế hoặc gọi về hotline của cửa hàng để được hỗ trợ đổi trả kịp thời.
            </p>
            <p>
              Trường hợp người nhận đi vắng, chúng tôi sẽ liên hệ trước. Nếu không thể liên lạc, chúng tôi sẽ linh động giao cho lễ tân, bảo vệ hoặc hàng xóm (nếu được người nhận đồng ý) và chụp ảnh xác nhận.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
