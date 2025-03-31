var torrefacao = [];

async function loadTorrefacao() {
    try {
        const response = await fetch('../scripts/torrefacao.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        torrefacao = await response.json();
        renderTorrefacao(torrefacao);
    } catch (error) {
        console.error("Erro ao carregar os vinhos:", error);
    }
}


function renderTorrefacao(torrefacao) {
    const container = document.getElementById('catalogo');
    container.innerHTML = '';
    
    torrefacao.forEach(cafes => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${cafes.imagem}" alt="${cafes.nome}" class="wine-image">
            <h2>${cafes.nome}</h2>
            <p><strong>Origem:</strong> ${cafes.origem}</p>
            <p><strong>Ano:</strong> ${cafes.ano}</p>
            <p><strong>Peso:</strong> ${cafes.peso}</p>
            <p>${cafes.descricao}</p>
            <p><strong>Valor:</strong> R$ ${cafes.valor.toFixed(2)}</p>
            <a href="#" class="button">Comprar</a>
        `;

        container.appendChild(card);
    });
}

loadTorrefacao();