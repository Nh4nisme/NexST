// let productData = []; // Khai báo biến productData toàn cục luôn

async function loadProductDetail() {
    let productId = localStorage.getItem("productDetail");
    console.log("ID trong localStorage:", productId);

    if (!productId) {
        $("#product-detail-container").html("<p class='text-center'>Không tìm thấy sản phẩm.</p>");
        return;
    }

    try {
        if (productData.length === 0) {
            const response = await fetch("../json/products.json");
            productData = await response.json(); // fetch xong mới gán
        }

        const product = productData.find(p => p.id == productId);

        if (!product) {
            $("#product-detail-container").html("<p class='text-center'>Không tìm thấy sản phẩm.</p>");
            return;
        }
        $("#description").text(product.description);
        $("#brand").text(product.title);
        $("#cpu").text(product.cpu);
        $("#gpu").text(product.gpu);
        $("#screen").text(product.screen);
        $("#ram").text(product.ram);
        $("#storage").text(product.ssd);
        $(".product-img").attr("src", product.img);

        // Render sản phẩm ra trang
        $("#product-detail-container").html(`
            <div class="card h-100 p-3 d-flex flex-row">
                <div class="img me-3">
                    <img src="${product.img}" class="img-fluid mb-2 w-100" alt="${product.description}">
                    <div class="d-flex">
                        
                    </div>
                </div>
                <div class="info">
                        <h5 class="fw-bold w-100">${product.description}</h5>
                        <p>Brand: ${product.title}</p>
                        <p>Laptop color: Black</p>
                        
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-outline-danger">Black</button>
                            <button type="button" class="btn btn-outline-danger">Gray</button>
                            <button type="button" class="btn btn-outline-danger">Platium</button>
                        </div>

                        <div class="d-flex align-items-center mb-3">
                            <span class="text-danger fw-bold fs-4 me-2">${product.price}</span>
                            <span class="text-muted text-decoration-line-through">${product.oldPrice}</span>
                        </div>
                        <div class="d-flex">
                            <button class="btn buy-now-btn btn-danger me-2">BUY NOW</button>
                            <button class="btn btn-outline-danger add-to-cart-btn" data-id="${product.id}">ADD TO CART</button>
                        </div>
                </div>
            </div>
            
        `);

        // Thêm sự kiện cho nút "BUY NOW"
        setupBuyNowButton();

    } catch (error) {
        console.error("Lỗi load sản phẩm:", error);
    }
}
// Thêm hàm xử lý nút "BUY NOW"
function setupBuyNowButton() {
    $('.buy-now-btn').on('click', function () {
        // Lấy ID sản phẩm hiện tại từ localStorage
        const productId = localStorage.getItem("productDetail");

        if (!productId) {
            alert("Không tìm thấy thông tin sản phẩm!");
            return;
        }

        // Tìm sản phẩm trong dữ liệu sản phẩm đã fetch
        const product = productData.find(p => p.id === productId);
        if (!product) {
            alert("Không tìm thấy sản phẩm!");
            return;
        }

        // Tạo giỏ hàng tạm thời chỉ với sản phẩm này
        const tempCart = [{
            id: productId,
            quantity: 1
        }];

        // Lưu vào localStorage với key đặc biệt để phân biệt với giỏ hàng thông thường
        localStorage.setItem('buyNowCart', JSON.stringify(tempCart));

        // Thêm flag để Check_Out.js biết là "Buy Now"
        localStorage.setItem('isBuyNow', 'true');

        // Chuyển hướng đến trang thanh toán
        window.location.href = '../html/Check_Out.html';
    });
}

$(document).ready(function () {
    loadProductDetail();

    // Xóa thông tin giỏ hàng tạm khi trang chi tiết sản phẩm được load
    localStorage.removeItem('buyNowCart');
    localStorage.removeItem('isBuyNow');
});