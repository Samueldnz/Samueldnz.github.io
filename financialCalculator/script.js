const submitButton = document.getElementById("submitButton");

function validateForm(event){

    //itax: taxa de juros
    //ipv:  valor financiado
    //ipp: valor final
    
    let errorMessage = "";
    let itaxValue = parseFloat(document.getElementById("itax").value);
    let ipvValue = parseFloat(document.getElementById("ipv").value);
    let ippValue = parseFloat(document.getElementById("ipp").value);

    if (itaxValue === 0 && ipvValue === 0) {
        errorMessage += "<p>Taxa de juros e valor financiado não podem ser ambos nulos.</p>";
    }
    if (itaxValue === 0 && ippValue === 0) {
        errorMessage += "<p>Taxa de juros e valor final não podem ser ambos nulos.</p>";
    }
    if (ipvValue === 0 && ippValue === 0) {
        errorMessage += "<p>Valor financiado e valor final não podem ser ambos nulos.</p>";
    }

    if (errorMessage !== ""){
        document.getElementById("errorMessage").innerHTML = errorMessage;
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("successMessage").style.display = "none";
        event.preventeDefault();
    }else{
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
    }
};

submitButton.addEventListener("click", validateForm);


