// Invia un messaggio al content script per ottenere i dati
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getStudenti,
    }, (results) => {
      if (results && results[0] && results[0].result) {
        const studenti = results[0].result;
        const listaStudenti = document.getElementById('studenti');
        
        studenti.forEach(studente => {
          const li = document.createElement('li');
          li.textContent = studente;
          listaStudenti.appendChild(li);
        });
      }
    });
  });
  
  // Questa funzione verrà eseguita nella pagina corrente
  function getStudenti() {
    const studenti = [];
    const tds = document.querySelectorAll('td.elenco_studenti > div:first-child');
    tds.forEach(td => {
      studenti.push(td.textContent);
    });

    // Da https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    shuffleArray(studenti);

    return studenti;
  }