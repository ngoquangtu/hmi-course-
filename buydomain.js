document.addEventListener("DOMContentLoaded", () => {
    // Bước hiện tại
    let currentStep = 1;

    // Các nút điều khiển
    const payVmButton = document.getElementById("pay-vm");

    // Khi nhấn nút "Pay & Create"
    payVmButton.addEventListener("click", () => {
        const cardNumber = document.getElementById("card-number").value;
        const expirationDate = document.getElementById("expiration-date").value;
        const cvv = document.getElementById("cvv").value;

        // Kiểm tra thông tin thanh toán
        if (!cardNumber || !expirationDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        // Thanh toán thành công
        alert("Payment successful! Your domain has been created.");

        // Đóng modal và reset form
        const vmForm = document.getElementById("vm-form");
        vmForm.reset();
        const vmModal = bootstrap.Modal.getInstance(document.getElementById("vmModal"));
        vmModal.hide();
    });
});
