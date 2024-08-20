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

var firstNum = "";
var secondNum = "";
var operation = "";
var clearOnNextNum = false;

// Operate function that takes in operator and two numbers and calls above function

function operate(a, b, operation) {
  if (operation === "+") {
    return(add(a, b))
  } else if (operation === "-") {
    return (subtract(a, b))
  } else if (operation === "×") {
    return (multiply(a, b))
  } else if (operation === "÷") {
    return (divide(a, b))
  }
}


// Create number buttons

let grid = document.querySelector("#grid")
for (let i=0; i < 10; i++) {
  const cell = document.createElement("button");
  cell.classList.add("numberButton");
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}

// Create operator buttons
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

// Create clear button and equals button

const clearButton = document.createElement("button");
clearButton.classList.add("clearButton");
clearButton.textContent = `CLEAR`;
grid.appendChild(clearButton);

const equalButton = document.createElement("button");
equalButton.classList.add("equalButton")
equalButton.textContent = `=`;
grid.appendChild(equalButton);

// Event Listener that shows if a number button is pressed then put it up on the display

const theDisplay = document.querySelector("#display")

const allNumButtons = document.querySelectorAll(".numberButton")
allNumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (clearOnNextNum) {
      theDisplay.textContent = "";
      clearOnNextNum = false;
    }
    theDisplay.textContent += `${button.textContent}`
  })
})

// Event Listener that once an operation is pressed, then store the text content inside a variable and store operation so we know what operation to do once equals happens
const allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clearOnNextNum = false;
    firstNum = theDisplay.textContent;
    // theDisplay.textContent = `${button.textContent}`
    operation = `${button.textContent}`
    theDisplay.textContent = "";
  });
});

// Event Listener that once an equal is pressed, then the store the text content inside the second number and evaluate the two numbers
const theEqualButton = document.querySelector(".equalButton");
theEqualButton.addEventListener("click", () => {
  secondNum = theDisplay.textContent;
  firstNum = parseInt(`${firstNum}`, 10);
  secondNum = parseInt(`${secondNum}`, 10);
  theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
  clearOnNextNum = true;
})

// Event Listener that once clear is pressed, then wipe out all numbers and display is blank;
const theClearButton = document.querySelector(".clearButton");
theClearButton.addEventListener("click", () => {
  theDisplay.textContent = "";
  firstNum = "";
  secondNum = "";
  operation = "";
})