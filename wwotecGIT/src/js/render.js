// render.js
export function renderList(serviceListEl, services) {
    serviceListEl.innerHTML = '';

    services.forEach((service, index) => {
        const item = document.createElement('li');

        item.innerHTML = `
            <button class="service-button ${index === 0 ? 'selected' : ''}" data-service="${service.code}">
                <i class="${service.icon} service-icon" aria-hidden="true"></i>
                <span class="service-name">${service.name}</span>
                <span class="arrow">›</span>
            </button>
        `;

        serviceListEl.appendChild(item);
    });
}

export function renderCards(cardContainer, servicesByProblems, serviceCode, limitFromCaller = null) {
    cardContainer.innerHTML = "";

    const limitAttr = cardContainer.getAttribute("data-limit");
    const limit = limitFromCaller ?? (limitAttr ? parseInt(limitAttr, 10) : 0);

    const items = servicesByProblems[serviceCode] || [];
    const cardsToRender = limit ? items.slice(0, limit) : items;

    cardsToRender.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-type-card";

        card.innerHTML = `
            <div class="icon-wrapper">
                <i class="${service.icon} service-type-icon" aria-hidden="true"></i>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
        `;

        cardContainer.appendChild(card);
    });
}
