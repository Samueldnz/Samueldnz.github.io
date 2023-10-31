const submitButton = document.getElementById("submitButton");
const fieldset = document.getElementById("cdcfieldset");
const tableContainer = document.getElementById("table-container");
const dataContainer = document.getElementById("data-container");
const importantData1 = document.getElementById("important-data");
const importantData2 = document.getElementById("important-data2");
const checkbox = document.getElementById("idp");
const entryDIV = document.getElementById("entryDIV");

entryDIV.style.display = "none";

tableContainer.style.display = "none";
dataContainer.style.display = "none";

function messageError(errorMessage, event) {
    document.getElementById("errorMessage").innerHTML = errorMessage;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("successMessage").style.display = "none";
    event.preventDefault();
}
// Function to validate form inputs
function validateForm(event){

    //itax: taxa de juros
    //ipv:  valor financiado
    //ipp: valor final
    
    let errorMessage = "";
    let monthlyRate = parseFloat(document.getElementById("itax").value);
    let principalValue = parseFloat(document.getElementById("ipv").value);
    let finalValue = parseFloat(document.getElementById("ipp").value);
    let time = parseFloat(document.getElementById("parc").value);
    let entryValue = parseFloat(document.getElementById("financingEntry").value);

    if (monthlyRate === 0 && principalValue === 0) {
        errorMessage += "<p>Taxa de juros e valor financiado não podem ser ambos nulos.</p>";
    }
    if (monthlyRate === 0 && finalValue === 0) {
        errorMessage += "<p>Taxa de juros e valor final não podem ser ambos nulos.</p>";
    }
    if (finalValue === 0 && principalValue === 0) {
        errorMessage += "<p>Valor financiado e valor final não podem ser ambos nulos.</p>";
    }

    if (errorMessage !== ""){
        messageError(errorMessage, event);
    }else{
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
        validateData(principalValue, finalValue, time, monthlyRate, checkbox, entryValue);
        event.preventDefault();
    }
};

function validateData(principalValue, finalValue, time, monthlyRate, checkbox, entryValue){

    if(monthlyRate === 0.0){
        monthlyRate = calculateMonthlyInterestRate(principalValue, finalValue, time, checkbox);
        const table = priceTable(principalValue, time, monthlyRate, finalValue, checkbox, entryValue);
        populateTable(table, finalValue, principalValue, entryValue);
        fieldset.style.display = "none";
        tableContainer.style.display = "flex";
        dataContainer.style.display = "flex";

    }else if(finalValue === 0.0){
        const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate, entryValue);
        finalValue = calculateFinalValue(installmentValue, time, entryValue);
        const table = priceTable(principalValue, time, monthlyRate, finalValue, checkbox, entryValue);
        populateTable(table, finalValue, principalValue, entryValue);
        fieldset.style.display = "none";
        tableContainer.style.display = "flex";
        dataContainer.style.display = "flex";
    }else if (principalValue === 0.0){
        // fazer alguma coisa aqui
    };
}

function calculateEquationValue(principalValue, finalValue, interestRate, checkbox, time){
    let a = 0, b = 0, c = 0;

    if(checkbox.checked){
        // a = Math.pow(1 + interestRate, time - 2);
        b = Math.pow(1 + interestRate, time - 1);
        c = Math,pow(1 + interestRate, time);

        return (principalValue + interestRate*b) - (finalValue/time*(c - 1));
    }else{
        a = Math.pow(1 + interestRate, -time);
        b = Math.pow(1 + interestRate, -time-1);

        return (principalValue*interestRate) - ((finalValue/time)*(1-a));
    }
};

function calculateDerivative(principalValue, finalValue, interestRate, checkbox, time){
    let a = 0, b = 0, c = 0;

    if(checkbox.checked){
        a = Math.pow(1 + interestRate, time - 2);
        b = Math.pow(1 + interestRate, time - 1);

        return principalValue*(b + (interestRate * a * (time - 1))) - (finalValue * b);
    }else{
        a = Math.pow(1 + interestRate, -time);
        b = Math.pow(1 + interestRate, -time - 1);

        return principalValue - (finalValue*b);
    }
};


function calculateMonthlyInterestRate(principalValue, finalValue, time, checkbox){
    const tolerance = 0.0001;
    let interestRate = 0.1; //initial guess
    let interestRateBefore = 0.0;

    let equation = 0;
    let derivative = 0;

    while(Math.abs(interestRateBefore - interestRate) >= tolerance){
        interestRateBefore = interestRate;
        equation = calculateEquationValue(principalValue, finalValue, interestRate, checkbox, time);
        derivative = calculateDerivative(principalValue, finalValue, interestRate, checkbox, time);

        interestRate = interestRate - (equation/derivative);
    }

    return interestRate*100;
};

// Calculates the final value to be paid based on the installment amount and the number of installments.
// Parameters:
// - installmentValue: The value of each installment.
// - numberOfInstallment: The total number of installments.
// Returns: The final amount to be paid after all installments.
function calculateFinalValue(installmentValue, numberOfInstallment, entryValue){
    return (installmentValue*numberOfInstallment)+entryValue;
}

// Calculates the value of each installment using the given principal amount, time period, and monthly interest rate.
// Parameters:
// - time: The total number of installments.
// - principalValue: The initial principal amount borrowed.
// - monthlyRate: The monthly interest rate as a percentage.
// Returns: The value of each installment.
function calculateInstallmentValue(time, principalValue, monthlyRate, entryValue){
    const fator = Math.pow(1+monthlyRate/100, time);
    const installmentValue = ((principalValue-entryValue)*(monthlyRate/100)*fator)/(fator - 1);
    return installmentValue;
}

// Generates a price table containing details of each installment including installment number, installment value, interest,
// amortization, and outstanding balance based on the given principal amount, time period, and monthly interest rate.
// Parameters:
// - principalValue: The initial principal amount borrowed.
// - time: The total number of installments.
// - monthlyRate: The monthly interest rate as a percentage.
// Returns: An array of objects representing each installment's details.
function priceTable(principalValue, time, monthlyRate, finalValue, checkbox, entryValue){

    const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate, entryValue);
    const priceTable = [];

    let outstandingBalance = principalValue-entryValue;
    let i = 0;
    for(i = 1; i <= time; i++){
        const interestValue = outstandingBalance * monthlyRate/100;
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
    showData(monthlyRate, principalValue, finalValue, time, installmentValue, checkbox, calculatefinancingCoefficient(monthlyRate, time));
    return priceTable;
}

// Function to populate the HTML table
function populateTable(tableData, finalValue, principalValue, entryValue) {
    const table = document.getElementById("price-table");

    const titleRow = table.insertRow();
    const cell1 = titleRow.insertCell(0);
    const cell2 = titleRow.insertCell(1);
    const cell3 = titleRow.insertCell(2);
    const cell4 = titleRow.insertCell(3);
    const cell5 = titleRow.insertCell(4);

    cell1.textContent = "Index";
    cell2.textContent = "Installment Value";
    cell3.textContent = "Interest Rate Value";
    cell4.textContent = "Amortization Value";
    cell5.textContent = "Outstanding Balance";

    tableData.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = item.installmentNumber;
        cell2.textContent = "R$ " + item.installmentValue.toFixed(2);
        cell3.textContent = "R$ " + item.interestValue.toFixed(2);
        cell4.textContent = "R$ " + item.amortization.toFixed(2);
        cell5.textContent = "R$ " + item.outstandingBalance.toFixed(2);
    });

    const finalRow = table.insertRow();
    const cell6 = finalRow.insertCell(0);
    const cell7 = finalRow.insertCell(1);
    const cell8 = finalRow.insertCell(2);
    const cell9 = finalRow.insertCell(3);
    const cell0 = finalRow.insertCell(4);

    cell6.textContent = "Total: ";
    cell7.textContent = `R$ ${finalValue.toFixed(2)}`;
    cell8.textContent = `R$ ${(finalValue-principalValue).toFixed(2)}`;
    cell9.textContent = `R$ ${(principalValue-entryValue).toFixed(2)}`;
    cell0.textContent = "0";
}

function showData(monthlyRate, principalValue, finalValue, time, installmentValue, checkbox, FCoefficient){
    const importantDataHTML1 = 
        `<p class="title">Important data</p>
        <p>Parcelamento: ${time} meses </p>
        <p>Taxa: ${monthlyRate.toFixed(2)} % a.m</p>
        <p>Coeficiente de financiamento: ${FCoefficient.toFixed(2)}</p>
        <p>Prestação: R$ ${installmentValue.toFixed(2)} </p>`;

    const importantDataHTML2 = 
        `<p class="title">Important data</p>
        <p>Valor Financiado: R$ ${principalValue.toFixed(2)} </p>
        <p>Valor Final: R$ ${finalValue.toFixed(2)} </p>
        <p>Valor a Voltar: 0.0 </p>
        <p>Entrada: ${checkbox.checked}`;

    importantData1.innerHTML = importantDataHTML1;
    importantData2.innerHTML = importantDataHTML2;
}

function calculatefinancingCoefficient(monthlyRate, time){
    const fator = Math.pow(1 + monthlyRate/100, -time);
    return (monthlyRate/100)/(1 - fator);
}

function displayEntryDIV(){
    if(checkbox.checked){
        entryDIV.style.display = "block";
    }else{
        entryDIV.style.display = "none";
    }
};


submitButton.addEventListener("click", validateForm);
checkbox.addEventListener("change", displayEntryDIV);