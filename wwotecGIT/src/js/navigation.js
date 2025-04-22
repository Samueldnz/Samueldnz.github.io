export function goToAllServices(selectedCode) {
    if (!selectedCode) {
        alert("Nenhum serviço selecionado!");
        return;
    }

    // Redireciona para a página passando o código como parâmetro
    window.location.href = `../src/pages/allServices.html`;
}