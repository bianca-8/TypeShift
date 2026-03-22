const inputText = document.getElementById('input-text');
const outputDiv = document.getElementById('output-text');

let userInput = '';

outputDiv.textContent = 'Encrypted text will appear here...';
outputDiv.style.color = 'rgb(117,117,117)';

inputText.addEventListener('input', function() {
    userInput = inputText.value;
    
    if (userInput === '') {
        outputDiv.textContent = 'Encrypted text will appear here...';
        outputDiv.style.color = 'rgb(117,117,117)';
    } 
    else {
        outputDiv.textContent = userInput;
        outputDiv.style.color = 'rgb(0,0,0)';
    }
});
