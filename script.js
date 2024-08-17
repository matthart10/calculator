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
  cell.classList.add("numberButton");
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}

// Create rest of the buttons
const addButton = document.createElement("button");
addButton.classList.add("operatorButton");
addButton.textContent = `+`;
grid.appendChild(addButton);

const subtractButton = document.createElement("button");
subtractButton.classList.add("operatorButton");
subtractButton.textContent = `-`;
grid.appendChild(subtractButton);

const multiplyButton = document.createElement("button");
multiplyButton.classList.add("operatorButton");
multiplyButton.textContent = `×`;
grid.appendChild(multiplyButton);

const divideButton = document.createElement("button");
divideButton.classList.add("operatorButton");
divideButton.textContent = `÷`;
grid.appendChild(divideButton);

const clearButton = document.createElement("button");
clearButton.textContent = `CLEAR`;
grid.appendChild(clearButton);

const equalButton = document.createElement("button");
equalButton.textContent = `=`;
grid.appendChild(equalButton);

// Event Listener that shows if a number button is pressed then put it up on the display

const theDisplay = document.querySelector("#display")

const allNumButtons = document.querySelectorAll(".numberButton")
allNumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    theDisplay.textContent += `${button.textContent}`
  })
})

// Event Listener that once an operation is pressed, then store the text content inside a variable and store operation so we know what operation to do once equals happens
const allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const firstNumber = theDisplay.textContent;
    theDisplay.textContent = `${button.textContent}`
    const theOperation = theDisplay.textContent;
  })
})
