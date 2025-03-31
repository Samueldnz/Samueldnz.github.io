var cafeteria = [];

async function loadCafeteria() {
    try {
        const response = await fetch('../scripts/cafeteria.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        cafeteria = await response.json();
        renderCafeteria(cafeteria);
    } catch (error) {
        console.error("Erro ao carregar os vinhos:", error);
    }
}


function renderCafeteria(cafeteria) {
    const container = document.getElementById('catalogo');
    container.innerHTML = '';
    
    cafeteria.forEach(cafes => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${cafes.imagem}" alt="${cafes.nome}" class="wine-image">
            <h2>${cafes.nome}</h2>
            <p><strong>Origem:</strong> ${cafes.origem}</p>
            <p>${cafes.descricao}</p>
            <p><strong>Ingredientes:</strong> ${cafes.ingredientes}</p>
            <p><strong>Valor:</strong> R$ ${cafes.valor.toFixed(2)}</p>
            <a href="#" class="button">Comprar</a>
        `;

        container.appendChild(card);
    });
}

loadCafeteria();