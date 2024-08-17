// Functions that execute basic math operators

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
    return a * b;
  };

const divide = function(a, b) {
    return a / b;
}

// Variables that define a single calculator operation

var firstNum = 0;
var secondNum = 0;
var operation = "";

// Operate function that takes in operator and two numbers and calls above function

function operate() {

}

// Create number buttons

let grid = document.querySelector("#grid")
for (let i=0; i < 10; i++) {
  const cell = document.createElement("button");
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}

// Create rest of the buttons
const addButton = document.createElement("button");
addButton.textContent = `+`;
grid.appendChild(addButton);

const subtractButton = document.createElement("button");
subtractButton.textContent = `-`;
grid.appendChild(subtractButton);

const multiplyButton = document.createElement("button");
multiplyButton.textContent = `×`;
grid.appendChild(multiplyButton);

const divideButton = document.createElement("button");
divideButton.textContent = `÷`;
grid.appendChild(divideButton);

const clearButton = document.createElement("button");
clearButton.textContent = `CLEAR`;
grid.appendChild(clearButton);

const equalButton = document.createElement("button");
equalButton.textContent = `=`;
grid.appendChild(equalButton);

// Event Listener that shows if a button is pressed then put it up on the display

const theDisplay = document.querySelector("#display")
const allButtons = document.querySelectorAll("button")
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    theDisplay.textContent = `${button.textContent}`
  })
})