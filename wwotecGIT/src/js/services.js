// services.js
export async function loadServices() {
    const response = await fetch('../src/js/services.json');
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return await response.json();
}

export async function loadServicesByProblems() {
    const response = await fetch('../src/js/servicesByProblems.json');
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return await response.json();
}
