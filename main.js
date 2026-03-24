const inputText = document.getElementById('input-text');
const outputDiv = document.getElementById('output-text');
const shiftSelect = document.getElementById('shift-select');
const swapButton = document.getElementById('swap-button');
const copyInputButton = document.getElementById('copy-input');
const copyOutputButton = document.getElementById('copy-output');

let userInput = '';
let shiftValue = 0;
let maps = {};
let isEncryption = true;

// shift
async function loadFiles() {
    const shifts = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    
    for (let shift of shifts) {
        const fileName = `shift${shift}.txt`;
        const response = await fetch(`shift/${fileName}`);
        const fileContent = await response.text();
        maps[shift] = parse(fileContent);
    }
    
    maps[0] = {};
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letter of alphabet) {
        maps[0][letter] = letter;
    }
}

// map letters
function parse(content) {
    const mappings = {};
    const lines = content.trim().split('\n');
    
    for (let line of lines) {
        if (line.includes('=')) {
            const [origChar, shiftChar] = line.split('=');
            if (origChar && shiftChar) {
                mappings[origChar.trim()] = shiftChar.trim();
            }
        }
    }
    
    return mappings;
}

outputDiv.textContent = 'Encrypted text will appear here...';
outputDiv.style.color = 'rgb(117,117,117)';

loadFiles();

// swap button
shiftSelect.addEventListener('change', function() {
    shiftValue = parseInt(shiftSelect.value);
    if (shiftValue < 0) {
        isEncryption = false;
        swapButton.textContent = 'Decryption';
    } else if (shiftValue > 0) {
        isEncryption = true;
        swapButton.textContent = 'Encryption';
    }
    updateOutput();
});

swapButton.addEventListener('click', function() {
    isEncryption = !isEncryption;
    shiftValue = isEncryption ? Math.abs(shiftValue) : -Math.abs(shiftValue);
    if (shiftValue === 0) {
        shiftValue = 0;
    }
    swapButton.textContent = isEncryption ? 'Encryption' : 'Decryption';
    shiftSelect.value = shiftValue;
    
    // swap text
    const currentOutput = outputDiv.textContent;
    if (currentOutput !== 'Encrypted text will appear here...') {
        inputText.value = currentOutput;
        userInput = currentOutput;
    }
    
    updateOutput();
});

// input
inputText.addEventListener('input', function() {
    userInput = inputText.value;
    updateOutput();
});

// copy input
copyInputButton.addEventListener('click', function() {
    if (inputText.value) {
        navigator.clipboard.writeText(inputText.value).then(function() {
            const originalText = copyInputButton.textContent;
            copyInputButton.textContent = 'Copied';
            setTimeout(function() {
                copyInputButton.textContent = originalText;
            }, 1000);
        });
    }
});

// copy output
copyOutputButton.addEventListener('click', function() {
    const outputText = outputDiv.textContent;
    if (outputText && outputText !== 'Encrypted text will appear here...') {
        navigator.clipboard.writeText(outputText).then(function() {
            const originalText = copyOutputButton.textContent;
            copyOutputButton.textContent = 'Copied';
            setTimeout(function() {
                copyOutputButton.textContent = originalText;
            }, 1000);
        });
    }
});

// shift text
function doShift(text, shift) {
    const mapping = maps[shift];
    
    if (!mapping) {
        return text;
    }
    
    let result = '';
    for (let char of text) {
        if (mapping[char]) {
            result += mapping[char];
        } else if (mapping[char.toLowerCase()]) {
            result += mapping[char.toLowerCase()].toUpperCase();
        } else {
            result += char;
        }
    }
    
    return result;
}

// change output text
function updateOutput() {
    if (userInput === '') {
        outputDiv.textContent = 'Encrypted text will appear here...';
        outputDiv.style.color = 'rgb(117,117,117)';
    } else {
        const shiftedText = doShift(userInput, shiftValue);
        outputDiv.textContent = shiftedText;
        outputDiv.style.color = 'rgb(0,0,0)';
    }
}

