$(document).ready(function () {
    // Hàm thêm style cho nút Save
    function addSaveButtonStyles() {
        $("<style>")
            .prop("type", "text/css")
            .html(`
                .btn-save {
                    background-color: #a00 !important;
                    color: white !important;
                    max-width: 150px !important;
                    border-radius: 10px !important;
                    padding: 10px !important;
                    padding-left: 20px !important;
                    padding-right: 20px !important;
                    border: none !important;
                    transition: background-color 0.3s !important;
                }
                .btn-save:hover {
                    background-color: #870100 !important;
                }
            `)
            .appendTo("head");
    }

    // Xử lý sự kiện click nút EDIT ACCOUNT
    $('#editaccount-btn').on('click', function () {
        // Tải nội dung modal từ file Modal_Edit_Profile.html
        $('#modalContainer').load('Modal_Edit_Profile.html', function () {
            // Sau khi tải xong, hiển thị modal
            const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
            profileModal.show();
            // Ẩn nút "Open Profile Modal" mặc định
            $('[data-bs-target="#profileModal"]').hide();
            // Thêm style cho nút Save
            addSaveButtonStyles();
            // Điền dữ liệu hiện tại vào form
            fillCurrentAccountData();
        });
    });

    // Hàm điền dữ liệu tài khoản vào form
    function fillCurrentAccountData() {
        // Lấy dữ liệu từ trang profile
        const fullName = $('.user-details div:first').text().trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const email = $('.user-details').next().text().replace('Email:', '').trim();
        const phone = $('.user-details').next().next().text().replace('Phone:', '').trim();

        // Điền vào form modal
        $('#firstName').val(firstName);
        $('#lastName').val(lastName);
        $('#email').val(email);
        $('#phoneAccount').val(phone);

        // Cập nhật profile card trong modal
        updateAccountProfileCard();
    }

    // Hàm cập nhật profile card trong modal cho account
    function updateAccountProfileCard() {
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();

        if (firstName || lastName) {
            $('#profileName').text((firstName + ' ' + lastName).trim());
        }

        if (email) {
            $('#profileEmail').text(email);
        }
    }

    // Xử lý sự kiện click nút EDIT ADDRESS
    $('#editaddress-btn').on('click', function () {
        // Tải nội dung modal từ file Address_Info.html
        $('#modalContainer').load('Address_Info.html', function () {
            // Sau khi tải xong, hiển thị modal
            const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
            profileModal.show();
            // Ẩn nút "Open Profile Modal" mặc định
            $('[data-bs-target="#profileModal"]').hide();
            // Thêm style cho nút Save
            addSaveButtonStyles();
            // Điền dữ liệu địa chỉ vào form
            fillCurrentAddressData();
        });
    });

    // Hàm điền dữ liệu địa chỉ vào form
    function fillCurrentAddressData() {
        // Lấy dữ liệu từ trang profile
        const fullName = $('.user-details div:first').text().trim();
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        const email = $('.user-details').next().text().replace('Email:', '').trim();
        const phone = $('.user-details').next().next().text().replace('Phone:', '').trim();

        // Điền vào form modal
        $('#firstName').val(firstName);
        $('#lastName').val(lastName);
        $('#email').val(email);
        $('#phoneAddress').val(phone);

        // Cập nhật profile card trong modal
        updateAddressProfileCard();
    }

    // Hàm cập nhật profile card trong modal cho address
    function updateAddressProfileCard() {
        const nickname = $('#nickname').val();
        const email = $('#email').val();

        // Cập nhật tên
        if (nickname) {
            $('#profileName').text((nickname).trim());
        }

        // Cập nhật email
        if (email) {
            $('#profileEmail').text(email);
        }
    }
});