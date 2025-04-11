$(document).ready(function () {
    // Regex patterns
    const patterns = {
        name: /^[a-zA-ZÀ-ỹ\s]{2,50}$/,  // Tên có từ 2-50 ký tự, bao gồm chữ cái và khoảng trắng, hỗ trợ tiếng Việt
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Email format
        phone: /^(0|\+84)([0-9]{9,10})$/,  // Số điện thoại Việt Nam (0xxxxxxxxx hoặc +84xxxxxxxxx)
        zipcode: /^\d{5,6}$/,  // Mã bưu điện từ 5-6 chữ số
        address: /^[a-zA-Z0-9À-ỹ\s,.'-]{5,150}$/  // Địa chỉ từ 5-150 ký tự
    };

    // Function to validate field
    function validateField(field, regex) {
        const value = field.val().trim();
        if (regex.test(value)) {
            field.removeClass('is-invalid').addClass('is-valid');
            return true;
        } else {
            field.removeClass('is-valid').addClass('is-invalid');
            return false;
        }
    }

    // Định nghĩa các message lỗi tương ứng
    const errorMessages = {
        firstName: 'Tên phải có từ 2-50 ký tự và chỉ chứa chữ cái',
        lastName: 'Họ phải có từ 2-50 ký tự và chỉ chứa chữ cái',
        email: 'Vui lòng nhập đúng định dạng email',
        phone: 'Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 9-10 số',
        zipCode: 'Mã bưu điện phải có 5-6 chữ số',
        address: 'Địa chỉ phải có từ 5-150 ký tự'
    };

    // Add validation feedback elements
    function addFeedbackElements() {
        $('input[type="text"], input[type="email"]').each(function () {
            const id = $(this).attr('id');
            if (!id) return;

            // Xóa feedback cũ nếu có
            $(this).next('.invalid-feedback').remove();

            // Thêm feedback message mới
            const message = errorMessages[id] || 'Vui lòng nhập đúng định dạng.';
            $(this).after('<div class="invalid-feedback">' + message + '</div>');
        });
    }

    // Khởi tạo form
    function initializeForm() {
        // Thêm id và required attribute vào các field
        $('input.form-control').eq(0).attr({ id: 'firstName', required: true });
        $('input.form-control').eq(1).attr({ id: 'lastName', required: true });
        $('input.form-control').eq(6).attr({ id: 'phone', required: true });
        $('input.form-control').eq(7).attr({ id: 'email', required: true, type: 'email' });
        $('input.form-control').eq(5).attr({ id: 'zipCode', required: true });
        $('input.form-control').eq(3).attr({ id: 'address', required: true });

        // Thêm feedback elements
        addFeedbackElements();

        // Đăng ký các sự kiện input
        registerInputEvents();
    }

    // Đăng ký sự kiện input cho các trường
    function registerInputEvents() {
        $('#firstName').on('input', function () {
            validateField($(this), patterns.name);
        });

        $('#lastName').on('input', function () {
            validateField($(this), patterns.name);
        });

        $('#phone').on('input', function () {
            validateField($(this), patterns.phone);
        });

        $('#email').on('input', function () {
            validateField($(this), patterns.email);
        });

        $('#zipCode').on('input', function () {
            validateField($(this), patterns.zipcode);
        });

        $('#address').on('input', function () {
            validateField($(this), patterns.address);
        });
    }

    // Xử lý khi submit form
    function handleFormSubmit() {
        $('form').on('submit', function (e) {
            let isValid = true;

            // Validate required fields
            $('input[required]').each(function () {
                const field = $(this);
                const fieldType = field.attr('type');
                const id = field.attr('id');

                if (!field.val().trim()) {
                    field.removeClass('is-valid').addClass('is-invalid');
                    isValid = false;
                    return;
                }

                if (fieldType === 'text' || fieldType === 'email') {
                    switch (id) {
                        case 'firstName':
                        case 'lastName':
                            if (!validateField(field, patterns.name)) isValid = false;
                            break;
                        case 'email':
                            if (!validateField(field, patterns.email)) isValid = false;
                            break;
                        case 'phone':
                            if (!validateField(field, patterns.phone)) isValid = false;
                            break;
                        case 'zipCode':
                            if (!validateField(field, patterns.zipcode)) isValid = false;
                            break;
                        case 'address':
                            if (!validateField(field, patterns.address)) isValid = false;
                            break;
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();

                // Hiển thị thông báo lỗi
                $('#validationErrorAlert').remove();
                $('form').prepend(
                    '<div id="validationErrorAlert" class="alert alert-danger" role="alert">' +
                    'Vui lòng điền đầy đủ và chính xác thông tin trước khi đặt hàng.' +
                    '</div>'
                );

                // Scroll đến vị trí đầu form
                $('html, body').animate({
                    scrollTop: $('form').offset().top - 100
                }, 200);
            }
        });
    }

    // Khởi tạo tất cả chức năng
    function init() {
        initializeForm();
        handleFormSubmit();
    }

    // Chạy khởi tạo
    init();
});