const inputText = document.getElementById('input-text');
const outputDiv = document.getElementById('output-text');
const shiftSelect = document.getElementById('shift-select');

let userInput = '';
let shiftValue = 0;
let maps = {};

async function loadFiles() {
    const shifts = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    
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

shiftSelect.addEventListener('change', function() {
    shiftValue = parseInt(shiftSelect.value);
    updateOutput();
});

inputText.addEventListener('input', function() {
    userInput = inputText.value;
    updateOutput();
});

function doShift(text, shift) {
    const mapping = maps[shift];
    
    if (!mapping) {
        return text;
    }
    
    let result = '';
    for (let char of text) {
        if (mapping[char]) {
            result += mapping[char];
        } else {
            result += char;
        }
    }
    
    return result;
}

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
