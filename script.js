function handleButtonClick() {
    const searchPlace = document.getElementById("search-place");
    const wordEntered = searchPlace.value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordEntered}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.title === "No Definitions Found") {
                var wordContainer = document.getElementById('wordPlace');
                var definitionContainer = document.getElementById('definitionPlace');
                var audioContainer = document.getElementById('audioContainer');
                var textContainer = document.getElementById('textID');

                wordContainer.textContent = "No Definitions Found";
                definitionContainer.textContent = "Sorry pal, we couldn't find definitions for the word you were looking for.";
                textContainer.textContent = "";

                audioContainer.innerHTML = '';
                return;
            }

            const wordSearched = data[0]?.word;
            const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
            let audioLink = data[0]?.phonetics[0]?.audio;
            let text = data[0]?.phonetics[0]?.text;

            if (!text && data[0]?.phonetics[1]?.text) {
                text = data[0]?.phonetics[1]?.text;
            }

            if (!audioLink && data[0]?.phonetics[1]?.audio) {
                audioLink = data[0]?.phonetics[1]?.audio;
            }

            var wordContainer = document.getElementById('wordPlace');
            var definitionContainer = document.getElementById('definitionPlace');
            var audioContainer = document.getElementById('audioContainer');
            var textContainer = document.getElementById('textID');

            wordContainer.textContent = wordSearched;
            definitionContainer.textContent = definition;
            textContainer.textContent = text;

            if (audioLink) {
                audioContainer.innerHTML = `
                    <img src="images/speaker.png" alt="Speaker" id="speakerImage" onclick="playAudio('${audioLink}')" style="height: 20px; width: 20px;">
                `;
            } else {
                audioContainer.innerHTML = '';
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}

