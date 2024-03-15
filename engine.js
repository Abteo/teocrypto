document.addEventListener("DOMContentLoaded", function() {
  
  // Array di parole
  var words = [
"Cane",
"Gatto",
"Casa",
"Auto",
"Tavolo",
"Letto",
"Libro",
"Computer",
"Telefono",
"Porta",
"Finestra",
"Tavolo",
"Sedia",
"Frigorifero",
"Lampada",
"Orologio",
"Cucina",
"Bagno",
"Giardino",
"Piatto",
"Tazza",
"Forchetta",
"Coltello",
"Cucchiaio",
"Lavatrice",
"Asciugatrice",
"Lavandino",
"Televisione",
"Radio",
"Lettore DVD",
"Giacca",
"Maglietta",
"Pantaloni",
"Scarpe",
"Cappello",
"Calze",
"Mutande",
"Calzini",
"Camicia",
"Cravatta",
"Gonna",
"Vestito",
"Stivale",
"Sandalo",
"Guanto",
"Occhiali",
"Borsa",
"Portafoglio",
"Valigia",
"Cappotto",
"Giacca a vento",
"Cappello",
"Sciarpa",
"Ombrello",
"Palla",
"Rete",
"Pallone",
"Racchetta",
"Pallavolo",
"Tennis"
  ];

  // Funzione per recuperare 4 parole casuali e visualizzarle nell'HTML
  function getRandomWordsAndDisplay() {
    // Array per contenere le 4 parole casuali
    var randomWords = [];

    // Recupera 4 parole casuali dall'array
    for (var i = 0; i < 4; i++) {
      var randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push((i + 1) + ". " + words[randomIndex]);
      words.splice(randomIndex, 1);
    }

    // Visualizza le 4 parole casuali nell'HTML
    var randomWordsList = document.getElementById("random-words");
    randomWords.forEach(word => {
      var listItem = document.createElement("td");
      listItem.textContent = word;
      randomWordsList.appendChild(listItem);
    });
  }
  

  // Gestore dell'evento per il pulsante "Reset"
  document.getElementById("reset").addEventListener("click", function(event) {
    var confirmed = window.confirm("Stai cercando di tornare alla schermata iniziale, la partita verrà persa, vuoi continuare?");
    if (confirmed) {
        location.reload();
    } else {
        event.preventDefault();
    }
  });

  // Gestore dell'evento per il pulsante "Start"
  document.getElementById("start").addEventListener("click", function(event) {
    var button = document.getElementById("start");
    var div = document.getElementById("container");
    button.style.display = "none";
    div.style.display = "block";
  });

  // Chiamata alla funzione per recuperare e visualizzare le parole casuali
  getRandomWordsAndDisplay();

// Gestione tabelle

// Funzione per creare una nuova riga
function createRow(tableId) {
  var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
  var row = table.insertRow();
  
  // Array per memorizzare gli input e le checkbox associati
  var inputs = [];
  var checkboxes = [];

  // Aggiungi il campo di testo
  var cell = row.insertCell();
  var input = document.createElement("input");
  input.type = "text";
  cell.appendChild(input);
  inputs.push(input);

  // Aggiungi le checkbox
  for (var i = 1; i <= 4; i++) {
    var cell = row.insertCell();
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    cell.appendChild(checkbox);
    checkboxes.push(checkbox);
  }

  return { inputs: inputs, checkboxes: checkboxes };
}

// Funzione per verificare se i controlli sono soddisfatti
function validateRows(tableId) {
  var isValid = true;
  var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];

  // Cicla tutte le righe
  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    var inputs = row.cells[0].getElementsByTagName("input");
    var checkboxes = row.getElementsByTagName("input");

    // Verifica se il campo di testo è compilato
    if (inputs[0].value.trim() === "") {
      inputs[0].classList.add("error");
      isValid = false;
    } else {
      inputs[0].classList.remove("error");
    }

    // Verifica se almeno una checkbox è selezionata
    var isCheckboxChecked = false;
    for (var j = 1; j < checkboxes.length; j++) {
      if (checkboxes[j].checked) {
        isCheckboxChecked = true;
        break;
      }
    }
    if (!isCheckboxChecked) {
      for (var j = 1; j < checkboxes.length; j++) {
        checkboxes[j].classList.add("error");
      }
      isValid = false;
    } else {
      for (var j = 1; j < checkboxes.length; j++) {
        checkboxes[j].classList.remove("error");
      }
    }
  }

  return isValid;
}

// Aggiungi le tre righe iniziali per la tabella "yourTable"
for (var i = 0; i < 3; i++) {
  createRow("yourTable");
}

// Aggiungi le tre righe iniziali per la tabella "opponentTable"
for (var i = 0; i < 3; i++) {
  createRow("opponentTable");
}

// Gestore dell'evento per il pulsante "OK" della tabella "yourTable"
document.getElementById("okButtonYourTable").addEventListener("click", function() {
  // Verifica se i controlli sono soddisfatti per la tabella "yourTable"
  if (validateRows("yourTable")) {
    // Se i controlli sono soddisfatti, aggiungi tre nuove righe per la tabella "yourTable"
    for (var i = 0; i < 3; i++) {
      createRow("yourTable");
    }

    // Disabilita l'input e la checkbox delle righe precedenti tranne le ultime tre
    var table = document.getElementById("yourTable").getElementsByTagName('tbody')[0];
    var rows = table.rows;
    for (var i = 0; i < rows.length - 3; i++) {
      var row = rows[i];
      var inputs = row.cells[0].getElementsByTagName("input");
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].disabled = true;
      }
      var checkboxes = row.getElementsByTagName("input");
      for (var j = 1; j < checkboxes.length; j++) {
        checkboxes[j].disabled = true;
      }
    }
  }
});

// Gestore dell'evento per il pulsante "OK" della tabella "opponentTable"
document.getElementById("okButtonOpponentTable").addEventListener("click", function() {
  // Verifica se i controlli sono soddisfatti per la tabella "opponentTable"
  if (validateRows("opponentTable")) {
    // Se i controlli sono soddisfatti, aggiungi tre nuove righe per la tabella "opponentTable"
    for (var i = 0; i < 3; i++) {
      createRow("opponentTable");
    }

    // Disabilita l'input e la checkbox delle righe precedenti tranne le ultime tre
    var table = document.getElementById("opponentTable").getElementsByTagName('tbody')[0];
    var rows = table.rows;
    for (var i = 0; i < rows.length - 3; i++) {
      var row = rows[i];
      var inputs = row.cells[0].getElementsByTagName("input");
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].disabled = true;
      }
      var checkboxes = row.getElementsByTagName("input");
      for (var j = 1; j < checkboxes.length; j++) {
        checkboxes[j].disabled = true;
      }
    }
  }
});

 //ipotesi
 
 function createIpotesi(tableId) {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var row = table.insertRow();
  
    // Array per memorizzare gli input
    var inputs = [];

    // Aggiungi i campi di input
    for (var i = 0; i < 4; i++) {
      var cell = row.insertCell();
      var input = document.createElement("input");
      input.type = "text";
      cell.appendChild(input);
      inputs.push(input);
    }

    return inputs;
  }

  // Funzione per verificare se almeno tre campi della riga sono stati compilati
  function validateRow(inputs) {
    var filledCount = 0;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() !== "") {
        filledCount++;
      }
    }
    return filledCount >= 3;
  }

  // Funzione per disabilitare i campi delle righe precedenti tranne l'ultima
  function disablePreviousRows(tableId) {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length - 1; i++) {
      var inputs = rows[i].getElementsByTagName("input");
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].disabled = true;
      }
    }
  }

  // Aggiungi la prima riga alla tabella "ipotesiTable"
  createIpotesi("ipotesiTable");

  // Gestore dell'evento per il pulsante "Ok"
  document.getElementById("insertButton").addEventListener("click", function() {
    var tableId = "ipotesiTable";
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName("tr");
    var lastRowInputs = rows[rows.length - 1].getElementsByTagName("input");

    if (validateRow(lastRowInputs)) {
      createIpotesi(tableId);
      disablePreviousRows(tableId);
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

