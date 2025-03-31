var wines = [];

async function loadWines() {
    try {
        const response = await fetch('../scripts/wines.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        wines = await response.json();
        renderWines(wines);
    } catch (error) {
        console.error("Erro ao carregar os vinhos:", error);
    }
}


function renderWines(wines) {
    const container = document.getElementById('catalogo');
    container.innerHTML = '';
    
    wines.forEach(wine => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${wine.imagem}" alt="${wine.nome}" class="wine-image">
            <h2>${wine.nome}</h2>
            <p><strong>Origem:</strong> ${wine.origem}</p>
            <p><strong>Ano:</strong> ${wine.ano}</p>
            <p>${wine.descricao}</p>
            <p><strong>Valor:</strong> R$ ${wine.valor.toFixed(2)}</p>
            <a href="#" class="button">Comprar</a>
        `;

        container.appendChild(card);
    });
}

loadWines();