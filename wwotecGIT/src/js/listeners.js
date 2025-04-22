// listeners.js
export function setupListClickListener(serviceListEl, servicesByProblems, renderCardsFn, cardContainer, setSelectedCode) {
    serviceListEl.addEventListener('click', function (e) {
        const button = e.target.closest('.service-button');
        if (!button) return;

        // Remove seleção anterior
        document.querySelectorAll('.service-button').forEach(btn => btn.classList.remove('selected'));

        // Marca como selecionado
        button.classList.add('selected');

        const selectedCode = button.getAttribute('data-service');
        setSelectedCode(selectedCode);

        renderCardsFn(cardContainer, servicesByProblems, selectedCode);
    });
}
