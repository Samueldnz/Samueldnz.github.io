document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const menu = document.getElementById("menu");

    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    // Fechar o menu ao clicar em um botão de navegação
    document.querySelectorAll(".navItem").forEach(button => {
        button.addEventListener("click", function () {
            menu.classList.remove("active");
            hamburger.classList.remove("open");
        });
    });
});


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    let formData = new FormData(this);

    fetch("config.php", {
        method: "POST",
        body: formData
    })
    .then(document.getElementById("contactForm").reset());
});
