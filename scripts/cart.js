document.addEventListener('DOMContentLoaded', function() {
    // add header va footer
    fetch('../html/header1.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error("loi khong doc duoc file json"));
    
    fetch('../html/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error("loi khong doc duoc file json"));
}) 