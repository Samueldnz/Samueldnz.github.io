var bistro = [];

async function loadBistro() {
    try {
        const response = await fetch('../scripts/bistro.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        
        bistro = await response.json();
        renderBistro(bistro);
    } catch (error) {
        console.error("Erro ao carregar os vinhos:", error);
    }
}


function renderBistro(bistro) {
    const container = document.getElementById('catalogo');
    container.innerHTML = '';
    
    bistro.forEach(bistro => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${bistro.imagem}" alt="${bistro.nome}" class="wine-image">
            <h2>${bistro.nome}</h2>
            <p><strong>Origem:</strong> ${bistro.origem}</p>
            <p>${bistro.descricao}</p>
            <p><strong>Ingredientes:</strong> ${bistro.ingredientes}</p>
            <p><strong>Valor:</strong> R$ ${bistro.valor.toFixed(2)}</p>
            <a href="#" class="button">Comprar</a>
        `;

        container.appendChild(card);
    });
}

loadBistro();