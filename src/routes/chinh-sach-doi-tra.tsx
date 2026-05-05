import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chinh-sach-doi-tra")({
  component: ReturnPolicy,
});

function ReturnPolicy() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold md:text-4xl text-primary">Chính Sách Đổi Trả & Hoàn Tiền</h1>
            <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
          </div>

          <div className="prose prose-stone mt-12 max-w-none text-muted-foreground">
            <h3 className="text-primary font-serif">1. Điều kiện đổi trả</h3>
            <p>
              Hoa Tươi Thanh Ngọc luôn đặt chất lượng lên hàng đầu. Chúng tôi chấp nhận đổi trả hoặc hoàn tiền 100% trong các trường hợp sau:
            </p>
            <ul>
              <li>Hoa bị dập nát, héo úa, hoặc hư hỏng nghiêm trọng trong quá trình vận chuyển.</li>
              <li>Sản phẩm giao không đúng với mẫu thiết kế (sai loại hoa chủ đạo, sai tông màu) mà không có sự thông báo trước.</li>
              <li>Giao hàng chậm trễ quá thời gian thỏa thuận (mà không có lý do chính đáng và sự đồng ý của khách hàng).</li>
            </ul>

            <h3 className="text-primary font-serif">2. Quy định về việc thay thế hoa</h3>
            <p>
              Do hoa là sản phẩm nông nghiệp và thay đổi theo mùa, theo ngày, một số loại hoa phụ hoặc phụ kiện có thể không có sẵn. Trong trường hợp đó, chúng tôi sẽ thay thế bằng hoa khác có giá trị tương đương và phù hợp với tông màu tổng thể. Chúng tôi cam kết đảm bảo tính thẩm mỹ của sản phẩm. Sự thay đổi nhỏ (dưới 20%) sẽ không được tính là sai mẫu để yêu cầu hoàn tiền.
            </p>

            <h3 className="text-primary font-serif">3. Thời gian tiếp nhận khiếu nại</h3>
            <p>
              Do tính chất hoa tươi dễ héo, chúng tôi chỉ giải quyết khiếu nại về chất lượng sản phẩm trong vòng <strong>4 - 6 tiếng</strong> kể từ lúc giao hàng thành công. Quý khách vui lòng cung cấp hình ảnh/video rõ nét về tình trạng hoa để chúng tôi có cơ sở xác minh và xử lý nhanh chóng.
            </p>

            <h3 className="text-primary font-serif">4. Phương thức hoàn tiền</h3>
            <p>
              Nếu đủ điều kiện hoàn tiền, chúng tôi sẽ tiến hành chuyển khoản lại số tiền (hoặc một phần số tiền tùy mức độ ảnh hưởng) vào tài khoản mà quý khách đã dùng để thanh toán trong vòng 24 - 48 giờ làm việc.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
