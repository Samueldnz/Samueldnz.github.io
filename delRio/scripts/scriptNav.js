
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const menu = document.getElementById("menu");

    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    // Fechar o menu ao clicar em um botão de navegação
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", function () {
            menu.classList.remove("active");
            hamburger.classList.remove("open");
        });
    });
});