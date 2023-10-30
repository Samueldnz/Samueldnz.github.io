const submitButton = document.getElementById("submitButton");
const fieldset = document.getElementById("cdcfieldset");
const tableContainer = document.getElementById("table-container");
const dataContainer = document.getElementById("data-container");
const importantData1 = document.getElementById("important-data");
const importantData2 = document.getElementById("important-data2");

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
    let time = parseInt(document.getElementById("parc").value);

    console.log("Valores: " + monthlyRate + ";" + principalValue + ";" + finalValue + ";" + time);

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
        validateData(monthlyRate, principalValue, finalValue, time);
        event.preventDefault();
    }
};

function validateData(monthlyRate, principalValue, finalValue, time){

    if(monthlyRate === 0.0){
        monthlyRate = calculateMonthlyInterestRate(principalValue, finalValue, time);
        const table = priceTable(principalValue, time, monthlyRate, finalValue);
        populateTable(table, finalValue);
        fieldset.style.display = "none";
        tableContainer.style.display = "flex";
        dataContainer.style.display = "flex";

    }else if(finalValue === 0.0){
        const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate);
        finalValue = calculateFinalValue(installmentValue, time);
        const table = priceTable(principalValue, time, monthlyRate, finalValue);
        populateTable(table, finalValue);
        fieldset.style.display = "none";
        tableContainer.style.display = "flex";
        dataContainer.style.display = "flex";
    }else if (principalValue === 0.0){
        // fazer alguma coisa aqui
    };
}

// Function to calculate monthly interest rate using Newton-Raphson method
// Parameters:
// - time: The total number of installments.
// - principalValue: The initial principal amount borrowed.
// - monthlyRate: The monthly interest rate as a percentage.
function calculateMonthlyInterestRate(principalValue, finalValue, time){
    const precision = 0.000001; //desire accuracy
    let monthlyRate = 0.01; //estimated initial rate

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

// Calculates the final value to be paid based on the installment amount and the number of installments.
// Parameters:
// - installmentValue: The value of each installment.
// - numberOfInstallment: The total number of installments.
// Returns: The final amount to be paid after all installments.
function calculateFinalValue(installmentValue, numberOfInstallment){
    return installmentValue*numberOfInstallment;
}

// Calculates the value of each installment using the given principal amount, time period, and monthly interest rate.
// Parameters:
// - time: The total number of installments.
// - principalValue: The initial principal amount borrowed.
// - monthlyRate: The monthly interest rate as a percentage.
// Returns: The value of each installment.
function calculateInstallmentValue(time, principalValue, monthlyRate){
    const fator = Math.pow(1+monthlyRate/100, time);
    const installmentValue = (principalValue*(monthlyRate/100)*fator)/(fator - 1);
    return installmentValue;
}

// Generates a price table containing details of each installment including installment number, installment value, interest,
// amortization, and outstanding balance based on the given principal amount, time period, and monthly interest rate.
// Parameters:
// - principalValue: The initial principal amount borrowed.
// - time: The total number of installments.
// - monthlyRate: The monthly interest rate as a percentage.
// Returns: An array of objects representing each installment's details.
function priceTable(principalValue, time, monthlyRate, finalValue){

    const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate);
    const priceTable = [];

    let outstandingBalance = principalValue;
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
    showData(monthlyRate, principalValue, finalValue, time, installmentValue);
    return priceTable;
}

// Function to populate the HTML table
function populateTable(tableData, finalValue) {
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
        cell2.textContent = item.installmentValue.toFixed(2);
        cell3.textContent = item.interestValue.toFixed(2);
        cell4.textContent = item.amortization.toFixed(2);
        cell5.textContent = item.outstandingBalance.toFixed(2);
    });

    const finalRow = table.insertRow();
    const cell6 = finalRow.insertCell(0);
    const cell7 = finalRow.insertCell(1);
    const cell8 = finalRow.insertCell(2);
    const cell9 = finalRow.insertCell(3);
    const cell0 = finalRow.insertCell(4);

    cell6.textContent = "Total: ";
    cell7.textContent = `R$ ${finalValue.toFixed(2)}`;
    cell8.textContent = "0";
    cell9.textContent = "0";
    cell0.textContent = "0";
}

function showData(monthlyRate, principalValue, finalValue, time, installmentValue){
    const importantDataHTML1 = 
        `<p class="title">Important data</p>
        <p>Parcelamento: ${time} meses </p>
        <p>Taxa: ${monthlyRate.toFixed(2)} % a.m</p>
        <p>Coeficiente de prestação: </p>
        <p>Prestação: R$ ${installmentValue.toFixed(2)} </p>`;

    const importantDataHTML2 = 
        `<p class="title">Important data</p>
        <p>Valor Financiado: R$ ${principalValue.toFixed(2)} </p>
        <p>Valor Final: R$ ${finalValue.toFixed(2)} </p>
        <p>Valor a Voltar: 0.0 </p>
        <p>Entrada: </p>`;

    importantData1.innerHTML = importantDataHTML1;
    importantData2.innerHTML = importantDataHTML2;
}


submitButton.addEventListener("click", validateForm);