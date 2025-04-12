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

        // Render sản phẩm ra trang
        $("#product-detail-container").html(`
            <div class="card h-100 p-3 d-flex flex-row w-75">
                <div class="img me-3">
                    <img src="${product.img}" class="img-fluid mb-2" alt="${product.description}">
                    <div class="d-flex">
                        
                    </div>
                </div>
                <div class="info">
                        <h5 class="fw-bold">${product.description}</h5>
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
                            <button class="btn btn-danger me-2">BUY NOW</button>
                            <button class="btn btn-outline-danger">ADD TO CART</button>
                        </div>
                </div>
            </div>
            
        `);
    } catch (error) {
        console.error("Lỗi load sản phẩm:", error);
    }
}

$(document).ready(function () {
    loadProductDetail();
});
