const colors = ["red", "white", "blue", "pink", "orange", "purple", "yellow", "green"];
let guess = [];
let currentLine = 1;
let currentBox = 1;
let complete = false;

let copyGuesses = null;
let copySolution = null;
let hints = null;

const generateSolution = () => {
    const sol = [];
    for (let i = 0; i < 4; i++) {
        sol.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return sol;
};
const solution = generateSolution();

function showSolution() {
    let elements = document.querySelectorAll("#solution > .row > .color-box > .color")

    for (let i = 0; i < 4; i++) {
        elements[i].style.backgroundColor = solution[i];
    }
}

function removeColor() {
    let base = document.querySelector(`#guesses > .row:nth-child(${currentLine}) > .color-box:nth-child(${currentBox-1})`);
    let element = document.querySelector(`#guesses > .row:nth-child(${currentLine}) > .color-box:nth-child(${currentBox-1}) > .color`);

    element.style.backgroundColor = "";
    base.onclick = null;
    currentBox--;
    guess.pop();
}

function pickColor(color) {
    let base = document.querySelector(`#guesses > .row:nth-child(${currentLine}) > .color-box:nth-child(${currentBox})`);
    let element = document.querySelector(`#guesses > .row:nth-child(${currentLine}) > .color-box:nth-child(${currentBox}) > .color`);
    
    element.style.backgroundColor = color;
    base.onclick = removeColor;
    currentBox++;

    guess.push(color);
}

function generateHints() {
    copyGuesses = guess.slice();
    copySolution = solution.slice();
    hints = [];

    for (let i = 0; i < copyGuesses.length; i++) {
        if (copyGuesses[i] === copySolution[i]) {
            hints.push("black");
            copyGuesses[i] = null;
            copySolution[i] = null;
        }
    }

    for (let i = 0; i < copyGuesses.length; i++) {
        const index = copySolution.indexOf(copyGuesses[i]);
        if (index !== -1 && copyGuesses[i] !== null) {
            hints.push("white");
            copySolution[index] = null;
            copyGuesses[i] = null;
        }
    }

    return hints;
}

function showHints(hints) {
    if (hints.length > 0) {
        let elements = document.querySelectorAll(`#guesses > .row:nth-child(${currentLine}) > .hints > .hint-box > .hint`)
        
        for (let i = 0; i < hints.length; i++) {
            elements[i].style.backgroundColor = hints[i];
        }
    }
}

function checkMatch() {
    if (guess.length == 4) {
        showHints(generateHints());
        if (JSON.stringify(solution) == JSON.stringify(guess)) {
            showSolution();
            alert("Gratulálok nyertél");
        }
        else {
            guess = [];
            currentLine++;
            currentBox = 1;

            if (currentLine == 12) {
                showSolution();
            }
        }
    }
    else {
        alert("Ezt még nem teheted meg!")
    }
}