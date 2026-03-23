let audio = document.getElementById("marsAudio");
let display = document.getElementById("display");

function appendToDisplay(value) { display.value += value; }
function clearDisplay() { display.value = ""; }
function deleteLast() { display.value = display.value.slice(0, -1); }
function calculate() { 
    try { 
        display.value = eval(display.value.replace('×', '*').replace('÷', '/')); 
    } catch(e) { display.value = "Error"; } 
}

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.getElementById("musicBtn").innerHTML = "STOP MUSIC ⏹️";
    } else {
        audio.pause();
        document.getElementById("musicBtn").innerHTML = "PLAY MUSIC ▶️";
    }
}

document.body.addEventListener('click', () => {
    if (audio.paused) audio.play();
}, { once: true });

