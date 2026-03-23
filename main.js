const inputText = document.getElementById('input-text');
const outputDiv = document.getElementById('output-text');
const shiftSelect = document.getElementById('shift-select');

let userInput = '';
let shiftValue = 0;

outputDiv.textContent = 'Encrypted text will appear here...';
outputDiv.style.color = 'rgb(117,117,117)';

shiftSelect.addEventListener('change', function() {
    shiftValue = parseInt(shiftSelect.value);
    updateOutput();
});

inputText.addEventListener('input', function() {
    userInput = inputText.value;
    updateOutput();
});

function updateOutput() {
    if (userInput === '') {
        outputDiv.textContent = 'Encrypted text will appear here...';
        outputDiv.style.color = 'rgb(117,117,117)';
    } else {
        outputDiv.textContent = userInput;
        outputDiv.style.color = 'rgb(0,0,0)';
    }
}
