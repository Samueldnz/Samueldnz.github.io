
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


    const cores = [
            
        {
            background: '#3D3D3D', // Cinza escuro
            border: '#6E6E6E',     // Cinza médio para contraste
            aboutCard: '#555555',    // Cinza intermediário mais claro
            colorText: '#FFFFFF'
        },

        {
            background: '#C8AD6F', // Dourado suave para fundo
            border: '#E0C78D',     // Dourado mais claro para contraste
            aboutCard: '#B19050',   // Dourado mais escuro para elementos destacados
            colorText: '#000000'
        }
    ];

    const navBtns = document.getElementsByClassName('nav-btn');
    const headerBtn = document.getElementById('headerBtn');
    const video = document.getElementById('videoHeader');
    const submitBTN = document.getElementById('submit-btn');
    const footer = document.getElementById('footer');
    const backgroundToggle = document.getElementsByClassName('backgroundToggle');
    const titleToggle = document.getElementsByClassName('titleToggle');
    const serviceCard = document.getElementsByClassName('serviceCard');
    const titleAbout = document.getElementsByClassName('titleAbout');
    
    
    function alternarCorSincronizada() {
        if (!video || video.readyState < 2) return; // Verifica se o vídeo está carregado
        const tempoAtual = video.currentTime;
        const index = Math.floor(tempoAtual / 10) % cores.length;
        atualizarEstilos(index);
    }

    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // Atualiza a cada 500ms para refletir mudanças no tempo do vídeo
    setInterval(alternarCorSincronizada, 500);


    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o recarregamento da página

        let formData = new FormData(this);

        fetch("config.php", {
            method: "POST",
            body: formData
        })
        .then(document.getElementById("contactForm").reset());
    });

    function atualizarEstilos(index){
        const { background, border, aboutCard, colorText} = cores[index];

        // Atualiza estilos principais
        if (headerBtn) {
            headerBtn.style.backgroundColor = background;
            headerBtn.style.borderColor = border;
        }

        Array.from(backgroundToggle).forEach((element) => {
            element.style.backgroundColor = background;
        });

        if (footer){
            footer.style.backgroundColor = background;
            footer.style.color = colorText;
        }

        if (submitBTN) {
            submitBTN.style.background = background;
            submitBTN.style.borderColor = border;
        }

        // Atualiza classes de hover nos botões da navegação
        Array.from(navBtns).forEach((btn) => {
            if (index === 0) {
                btn.classList.remove('secondColor');
                btn.classList.add('firstColor');
            } else {
                btn.classList.remove('firstColor');
                btn.classList.add('secondColor');
            }
        });
        

        Array.from(titleToggle).forEach((element) => {
            element.style.color = background;
        });

        Array.from(serviceCard).forEach((element) => {
            element.style.borderTop = `5px solid ${background}`;
            element.style.color = background;
            element.style.backgroundColor = background;
        });

        Array.from(titleAbout).forEach((element) => {
            element.style.background = aboutCard;
        });
    }

        
        