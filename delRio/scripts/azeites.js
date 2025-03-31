var azeites = [];

async function loadAzeites() {
    try {
        const response = await fetch('../scripts/azeites.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        azeites = await response.json();
        renderAzeites(azeites);
    } catch (error) {
        console.error("Erro ao carregar os vinhos:", error);
    }
}


function renderAzeites(azeites) {
    const container = document.getElementById('catalogo');
    container.innerHTML = '';
    
    azeites.forEach(azeite => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${azeite.imagem}" alt="${azeite.nome}" class="wine-image">
            <h2>${azeite.nome}</h2>
            <p><strong>Origem:</strong> ${azeite.origem}</p>
            <p><strong>Ano:</strong> ${azeite.ano}</p>
            <p>${azeite.descricao}</p>
            <p><strong>Valor:</strong> R$ ${azeite.valor.toFixed(2)}</p>
            <a href="#" class="button">Comprar</a>
        `;

        container.appendChild(card);
    });
}

loadAzeites();