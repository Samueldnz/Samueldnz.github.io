// const submitButton = document.getElementById("submitButton");

// function validateForm(event){

//     //itax: taxa de juros
//     //ipv:  valor financiado
//     //ipp: valor final
    
//     let errorMessage = "";
//     let interestRateValue = parseFloat(document.getElementById("itax").value);
//     let principalValue = parseFloat(document.getElementById("ipv").value);
//     let finalValue = parseFloat(document.getElementById("ipp").value);

//     if (interestRateValue === 0 && principalValue === 0) {
//         errorMessage += "<p>Taxa de juros e valor financiado não podem ser ambos nulos.</p>";
//     }
//     if (interestRateValue === 0 && finalValue === 0) {
//         errorMessage += "<p>Taxa de juros e valor final não podem ser ambos nulos.</p>";
//     }
//     if (finalValue === 0 && principalValue === 0) {
//         errorMessage += "<p>Valor financiado e valor final não podem ser ambos nulos.</p>";
//     }

//     if (errorMessage !== ""){
//         document.getElementById("errorMessage").innerHTML = errorMessage;
//         document.getElementById("errorMessage").style.display = "block";
//         document.getElementById("successMessage").style.display = "none";
//         event.preventeDefault();
//     }else{
//         document.getElementById("successMessage").style.display = "block";
//         document.getElementById("errorMessage").style.display = "none";
//     }
// };

// submitButton.addEventListener("click", validateForm);



function calculateMonthlyInterestRate(principalValue, finalValue, time){
    const precision = 0.0001; //desire accuracy
    let monthlyRate = 0.1; //estimated initial rate

    // Function that represents the financial equation
    function equation(monthlyRate){
        return principalValue * Math.pow(1 + monthlyRate, time) - finalValue;
    }

    // Derivative of the equation with respect to the rate (required for the Newton-Raphson Method)
    function derivative(monthlyRate){
        return time * principalValue * Math.pow(1 + monthlyRate, time - 1);
    }

    // Apply the Newton-Raphson Method to find the interest rate
    while(Math.abs(equation(monthlyRate)) > precision){
        monthlyRate = monthlyRate - equation(monthlyRate)/derivative(monthlyRate);
    }

    return monthlyRate * 100;
}

function calculateFinalValue(installmentValue, numberOfInstallment){
    return installmentValue*numberOfInstallment;
}

function calculateInstallmentValue(time, principalValue, monthlyRate){
    const fator = Math.pow(1*monthlyRate, time);
    const installmentValue = (principalValue*monthlyRate*fator)/(fator - 1);
    return installmentValue;
}

function priceTable(principalValue, time, monthlyRate){
    const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate);
    const priceTable = [];

    let outstandingBalance = principalValue;
    for(let i = 1; i <= time; i++){
        const interestValue = outstandingBalance * monthlyRate;
        const amortization = installmentValue - interestValue;
        outstandingBalance = outstandingBalance - amortization;
        
        priceTable.push({
            installmentNumber : i,
            installmentValue,
            interestValue,
            amortization,
            outstandingBalance
        });
    }

    return priceTable;
}

const principalValue = 100000;
const monthlyRate = 6;
const time = 120;

const a = priceTable(principalValue, time, monthlyRate);
const tableDIV = document.getElementById("priceTable");
const tableHTML = `
    <table>
        <tr>
            <th>Número da Parcela</th>
            <th>Valor da Parcela</th>
            <th>Juros</th>
            <th>Amortização</th>
            <th>Saldo Devedor</th>
        </tr>
        ${a.map(parcela => `
            <tr>
                <td>${parcela.installmentNumber}</td>
                <td>R$ ${parcela.installmentValue.toFixed(2)}</td>
                <td>R$ ${parcela.interestValue.toFixed(2)}</td>
                <td>R$ ${parcela.amortization.toFixed(2)}</td>
                <td>R$ ${parcela.outstandingBalance.toFixed(2)}</td>
            </tr>
        `).join('')}
    </table>`;

tableDIV.innerHTML = tableHTML;


