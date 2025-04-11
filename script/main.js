// --- Hàm load HTML vào placeholder ---
async function loadHTML(elementId, filePath, callback) {
    const $element = $(`#${elementId}`);
    if (!$element.length) return;

    // Nếu đã có 1 child rồi thì bỏ qua (header, footer chỉ load 1 lần)
    if ($element.children().length > 0) {
        return;
    }

    try {
        const response = await fetch(filePath);
        let htmlText = await response.text();

        // Bỏ các <script> nếu có trong file load về
        htmlText = htmlText.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

        $element.html(htmlText);
        if (callback) callback();
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// --- Hàm filter sản phẩm theo checkbox (giữ đơn giản trước) ---
function filterByCheckbox(productList) {
    let finalProducts = [...productList];

    const selectedCPUs = new Set($("#cpuSeriesFilter .modified-checbox:checked").map(function () {
        return $(this).val()?.toLowerCase();
    }).get());

    if (selectedCPUs.size > 0) {
        finalProducts = finalProducts.filter(product => {
            const cpu = product.cpu?.toLowerCase() || "";
            return [...selectedCPUs].some(cpuFilter => cpu.includes(cpuFilter));
        });
    }

    const selectedGPUs = new Set($("#graphicsFilter .modified-checbox:checked").map(function () {
        return $(this).val()?.toLowerCase();
    }).get());

    if (selectedGPUs.size > 0) {
        finalProducts = finalProducts.filter(product => {
            const gpu = product.gpu?.toLowerCase() || "";
            return [...selectedGPUs].some(gpuFilter => gpu.includes(gpuFilter));
        });
    }

    return finalProducts;
}

// --- Khi document ready ---
$(document).ready(async function () {
    // 1. Load HTML thành phần
    await loadHTML("header1-placeholder", "../html/header1.html");
    await loadHTML("header2-placeholder", "../html/header2.html", function () {
        const $searchBox = $("#header2-placeholder #searchBox");

        if (!$searchBox.data("events-bound")) {
            $searchBox.on("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    loadProducts($searchBox.val());
                }
            });

            $searchBox.on("input", function () {
                loadProducts($searchBox.val());
            });

            $searchBox.data("events-bound", true);
        }
    });
    await loadHTML("footer-placeholder", "../html/footer.html");
    await loadHTML("filter-content", "../html/filter.html");

    // 2. Load sản phẩm ban đầu
    await fetchProducts();

    // 3. Bắt sự kiện filter checkbox
    $(document).on("change", ".modified-checbox", function () {
        const finalProducts = filterByCheckbox(productData);
        renderProducts(finalProducts, $(".product-find"));
    });

    rebindAddToCartEvent();
});

// --- Hàm gán sự kiện Add To Cart ---
function rebindAddToCartEvent() {
    $(document).off("click", ".add-to-cart-btn").on("click", ".add-to-cart-btn", function (event) {
        console.log("Click Add To Cart");
        event.stopPropagation();
        event.preventDefault();

        const productId = $(this).data("id");
        const product = productData.find(p => p.id === productId);

        if (!product) {
            console.error(" Không tìm thấy sản phẩm với id:", productId);
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
            console.log(`Update: ID = ${cart[existingIndex].id}, Quantity = ${cart[existingIndex].quantity}, Index = ${existingIndex}`);
        } else {
            const newProduct = { ...product, quantity: 1 };
            cart.push(newProduct);
            console.log(`New: ID = ${newProduct.id}, Quantity = 1, Index = ${cart.length - 1}`);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(" Đã thêm sản phẩm vào giỏ hàng!");
    });
}
