const submitButton = document.getElementById("submitButton");
const fieldset = document.getElementById("cdcfieldset");
const tableContainer = document.getElementById("table-container");

tableContainer.style.display = "none";

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
        event.preventDefault();
    }
};

submitButton.addEventListener("click", submitButtonClicked);

function submitButtonClicked(event){
    validateForm(event);
    validateData();
}

function validateData(event){
    let monthlyRate = parseFloat(document.getElementById("itax").value);
    let principalValue = parseFloat(document.getElementById("ipv").value);
    let finalValue = parseFloat(document.getElementById("ipp").value);
    let time = parseInt(document.getElementById("parc").value);

    if(monthlyRate === 0.0){
        monthlyRate = calculateMonthlyInterestRate(principalValue, finalValue, time);
        const table = priceTable(principalValue, time, monthlyRate);
        populateTable(table);
        fieldset.style.display = "none";
        tableContainer.style.display = "flex";

    }else if(finalValue === 0.0){
        const installmentValue = calculateInstallmentValue(time, principalValue, monthlyRate);
        finalValue = calculateFinalValue(installmentValue, time);
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
function priceTable(principalValue, time, monthlyRate){

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
    return priceTable;
}

// Function to populate the HTML table
function populateTable(tableData) {
    const table = document.getElementById("price-table");

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
}





