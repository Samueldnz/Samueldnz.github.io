
        //Hamburguer Menu Code
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const menu = document.querySelector('.menu');

        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('open');
            menu.classList.toggle('active');
        });

        //toggle color code
        const btnChange = document.getElementById('btn-change');
        const video = document.querySelector('header video');
        const navBtns = document.querySelectorAll('.nav-btn');
        const navMenu = document.getElementById('navMenu');
        const footer = document.getElementById('footer');
        const backgroundToggle = document.getElementsByClassName('toggleColor');
        const titleToggle = document.getElementsByClassName('titleToggle');
        const borderCard = document.querySelectorAll('.serviceCard');
        const titleAbout = document.getElementsByClassName('titleAbout');
        const submitBTN = document.getElementById('submit-btn');
        
    
        const cores = [
            
            {
                background: '#3D3D3D', // Cinza escuro
                border: '#6E6E6E',     // Cinza médio para contraste
                navMenuColor: '#3D3D3D98', // Cinza translúcido para o menu
                aboutCard: '#555555',    // Cinza intermediário mais claro
                colorText: '#FFFFFF'
            },

            {
                background: '#C8AD6F', // Dourado suave para fundo
                border: '#E0C78D',     // Dourado mais claro para contraste
                navMenuColor: '#C8AD6F98', // Dourado translúcido para o menu
                aboutCard: '#B19050',   // Dourado mais escuro para elementos destacados
                colorText: '#000000'
            }
        ];
    
        function atualizarEstilos(index) {
            const { background, border, navMenuColor, aboutCard, colorText} = cores[index];
    
            // Atualiza estilos principais
            if (btnChange) {
                btnChange.style.backgroundColor = background;
                btnChange.style.borderColor = border;
            }
            if (navMenu) navMenu.style.backgroundColor = background;

            if (footer){
                footer.style.backgroundColor = background;
                footer.style.color = colorText;
            }

            if (submitBTN) {
                submitBTN.style.background = background;
                submitBTN.style.borderColor = border;
            }

            // Atualiza elementos com a classe 'toggleColor'
            Array.from(backgroundToggle).forEach((element) => {
                element.style.backgroundColor = background;
            });

            Array.from(titleToggle).forEach((element) => {
                element.style.color = background;
            });

            if (borderCard) {
                borderCard.forEach((card) => {
                    card.style.borderTop = `5px solid ${background}`;
                });
            }

            Array.from(titleAbout).forEach((element) => {
                element.style.background = aboutCard;
            });

            // Atualiza classes de hover nos botões da navegação
            navBtns.forEach((btn) => {
                if (index === 0) {
                    btn.classList.remove('secondColor');
                    btn.classList.add('firstColor');
                } else {
                    btn.classList.remove('firstColor');
                    btn.classList.add('secondColor');
                }
            });
        }
    
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
