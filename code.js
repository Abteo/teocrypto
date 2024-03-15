document.addEventListener("DOMContentLoaded", function() {
  // Array per tenere traccia dei codici già generati
  var generatedCodes = [];
  var totalCombinations = 24; // Numero totale di combinazioni senza ripetizioni

  // Funzione per generare un codice casuale senza ripetizioni
  function generateSecretCode() {
    // Genera tre numeri casuali univoci tra 1 e 4
    var code = [];
    while (code.length < 3) {
      var randomNumber = Math.floor(Math.random() * 4) + 1;
      if (!code.includes(randomNumber)) {
        code.push(randomNumber);
      }
    }
    return code;
  }

  // Funzione per visualizzare il codice segreto nell'HTML
  function displaySecretCode(code) {
    var secretCodeDisplay = document.getElementById("secret-code");
    secretCodeDisplay.textContent = code.join(" - ");
  }

  // Gestore dell'evento per il pulsante "New Code"
  document.getElementById("code").addEventListener("click", function(event) {
    if (generatedCodes.length >= totalCombinations) {
      // Disabilita il pulsante "New Code" quando tutte le combinazioni sono state generate
      this.disabled = true;
    } else {
      // Genera un nuovo codice
      var secretCode;
      do {
        secretCode = generateSecretCode();
      } while (generatedCodes.includes(secretCode.join(",")));
      generatedCodes.push(secretCode.join(","));
      // Visualizza il nuovo codice nell'HTML
      displaySecretCode(secretCode);
    }
  });

  // Gestore dell'evento per il pulsante "Reset"
  document.getElementById("reset").addEventListener("click", function(event) {
	  var confirmed = window.confirm("Vuoi resettare la partita?");
    if (confirmed) {
        location.reload();
		// Resetta l'array dei codici generati
    generatedCodes = [];
    // Abilita nuovamente il pulsante "New Code"
    document.getElementById("code").disabled = false;
    // Resetta l'HTML del codice segreto
    document.getElementById("secret-code").textContent = "";
    } else {
        event.preventDefault();
    }
    
  });
  
  document.getElementById("showPopup").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
});

document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
});


});
