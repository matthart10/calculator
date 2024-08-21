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
  if (b === 0) {
    return "Error!";
  }
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
let grid = document.querySelector("#grid")
// Create clear button
const clearButton = document.createElement("button");
clearButton.classList.add("clearButton");
clearButton.textContent = "AC";
grid.appendChild(clearButton)

// Create plus/minus button
const signButton = document.createElement("button");
signButton.classList.add("signButton");
signButton.textContent = "+/-";
grid.appendChild(signButton);

// Create percentage button
const percentButton = document.createElement("button");
percentButton.classList.add("percentButton");
percentButton.textContent = "%";
grid.appendChild(percentButton);

// Create number buttons
for (let i=1; i < 10; i++) {
  const cell = document.createElement("button");
  cell.classList.add("numberButton");
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}

// Create zero button
const zeroButton = document.createElement("button");
zeroButton.classList.add("numberButton");
zeroButton.classList.add("zeroButton");
zeroButton.textContent = "0";
grid.appendChild(zeroButton);

// Add decimal button
const decimalButton = document.createElement("button");
decimalButton.classList.add("decimalButton");
decimalButton.textContent = ".";
grid.appendChild(decimalButton);

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

// Create equals button

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
    if (theDisplay.textContent === "0") {
      theDisplay.textContent = "";
    }
    if (equalPressed && !operatorPressedOnce) {
      firstNum = "";
      secondNum = "";
      operation = "";
    }
    theDisplay.textContent += `${button.textContent}`
  })
})
var operatorPressedOnce = false;
// Event Listener that once an operation is pressed, then store the text content inside a variable and store operation so we know what operation to do once equals happens
const allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
      clearOnNextNum = true;
      // operatorPressedOnce should have returned to false when equals was pressed
      if (operatorPressedOnce) {
        secondNum = theDisplay.textContent;
        firstNum = parseInt(`${firstNum}`, 10);
        secondNum = parseInt(`${secondNum}`, 10);
        theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
      }
      operatorPressedOnce = true;
      firstNum = theDisplay.textContent;
      operation = `${button.textContent}`
  });
});
var equalPressed = false;
// Event Listener that once an equal is pressed, then the store the text content inside the second number and evaluate the two numbers
const theEqualButton = document.querySelector(".equalButton");
theEqualButton.addEventListener("click", () => {
  if (firstNum != "" && operation != "") {
    operatorPressedOnce = false;
    secondNum = theDisplay.textContent;
    firstNum = parseInt(`${firstNum}`, 10);
    secondNum = parseInt(`${secondNum}`, 10);
    theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
    clearOnNextNum = true;
    equalPressed = true;
  }
})

// Event Listener that once clear is pressed, then wipe out all numbers and display is blank;
const theClearButton = document.querySelector(".clearButton");
theClearButton.addEventListener("click", () => {
  theDisplay.textContent = "";
  firstNum = "";
  secondNum = "";
  operation = "";
})