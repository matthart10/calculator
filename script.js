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
  return (a / b).toFixed(2);
}

// Variables that define a single calculator operation

var firstNum = "";
var secondNum = "";
var operation = "";
var clearOnNextNum = false;
var equalPressed = false;

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


// Create plus/minus button
const signButton = document.createElement("button");
signButton.classList.add("signButton");
signButton.classList.add("miscButton");
signButton.textContent = "+/-";
grid.appendChild(signButton);

// Create backspace button
const backspaceButton = document.createElement("button");
backspaceButton.classList.add("backspaceButton");
backspaceButton.classList.add("miscButton");
backspaceButton.textContent = "⌫";
grid.appendChild(backspaceButton);

// Create clear button
const clearButton = document.createElement("button");
clearButton.classList.add("clearButton");
clearButton.classList.add("miscButton");
clearButton.textContent = "AC";
grid.appendChild(clearButton)

// Create number buttons
for (let i=9; i > 0; i--) {
  const cell = document.createElement("button");
  cell.classList.add("numberButton");
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}

// Add decimal button
const decimalButton = document.createElement("button");
decimalButton.classList.add("decimalButton");
decimalButton.textContent = ".";
grid.appendChild(decimalButton);

// Create zero button
const zeroButton = document.createElement("button");
zeroButton.classList.add("numberButton");
zeroButton.classList.add("zeroButton");
zeroButton.textContent = "0";
grid.appendChild(zeroButton);



 operatorGrid = document.querySelector("#operatorGrid")
// Create operator buttons
const addButton = document.createElement("button");
addButton.classList.add("operatorButton");
addButton.textContent = `+`;
operatorGrid.appendChild(addButton);

const subtractButton = document.createElement("button");
subtractButton.classList.add("operatorButton");
subtractButton.textContent = `-`;
operatorGrid.appendChild(subtractButton);

const multiplyButton = document.createElement("button");
multiplyButton.classList.add("operatorButton");
multiplyButton.textContent = `×`;
operatorGrid.appendChild(multiplyButton);

const divideButton = document.createElement("button");
divideButton.classList.add("operatorButton");
divideButton.textContent = `÷`;
operatorGrid.appendChild(divideButton);

// Create equals button

const equalButton = document.createElement("button");
equalButton.classList.add("equalButton")
equalButton.textContent = `=`;
operatorGrid.appendChild(equalButton);

// Event Listener that shows if a number button is pressed then put it up on the display

const theDisplay = document.querySelector("#display")

const allNumButtons = document.querySelectorAll(".numberButton")
allNumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberButtonsAndKeyboard()
    theDisplay.textContent += `${button.textContent}`
  })
})
var operatorPressedOnce = false;
// Event Listener that once an operation is pressed, then store the text content inside a variable and store operation so we know what operation to do once equals happens
const allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ensure that nothing happens if there's nothing in display
    if (theDisplay.textContent != "") {
      clearOnNextNum = true;
      equalPressed = false;
      // operatorPressedOnce should have returned to false when equals was pressed, but this will trigger if we're doing multi-operative operation
      if (operatorPressedOnce) {
        secondNum = theDisplay.textContent;
        firstNum = Number(`${firstNum}`);
        secondNum = Number(`${secondNum}`);
        theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
      }
      operatorPressedOnce = true;
      firstNum = theDisplay.textContent;
      operation = `${button.textContent}`
    }
  });
});

// Event Listener that once an equal is pressed, then the store the text content inside the second number and evaluate the two numbers
const theEqualButton = document.querySelector(".equalButton");
theEqualButton.addEventListener("click", () => {
  equalButtonAndKeyboard();
});

// Event Listener that once clear is pressed, then wipe out all numbers and display is blank;
const theClearButton = document.querySelector(".clearButton");
theClearButton.addEventListener("click", () => {
  theDisplay.textContent = "0";
  firstNum = "";
  secondNum = "";
  operation = "";
});

// Event Listener that once backspace button is pressed, execute backspace function
const theBackspaceButton = document.querySelector(".backspaceButton");
theBackspaceButton.addEventListener("click", () => {
  backspaceButtonAndKeyboard();
});

// Event Listener that once sign button is pressed, multiply textcontent by negative 1
const theSignButton = document.querySelector(".signButton");
theSignButton.addEventListener("click", () => {
  theDisplay.textContent = Number(`${theDisplay.textContent}`) * -1;
});

// Event Listener that once decimal button is pressed, add a decimal
const theDecimalButton = document.querySelector(".decimalButton");
theDecimalButton.addEventListener("click", () => {
  decimalButtonAndKeyboard();
});

// Keyboard Support for numbers, decimal, and enter/equals
document.addEventListener("keypress", (e) => {
  if (isFinite(e.key)) {
    numberButtonsAndKeyboard();
    theDisplay.textContent += `${e.key}`;
  };
  if (e.key === ".") {
    decimalButtonAndKeyboard();
  }
  if (e.key === "Enter") {
    equalButtonAndKeyboard();
  }
});

// Keyboard Support for backspace
document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    backspaceButtonAndKeyboard();
  }
})


// Functions

function numberButtonsAndKeyboard() {
  // clearOnNextNum is set to true after pressing an operator button so new number can be read, also when equals is pressed so new calculator operation can be started
  if (clearOnNextNum) {
    theDisplay.textContent = "";
    clearOnNextNum = false;
  }
  // Ensure "01" doesn't happen
  if (theDisplay.textContent === "0") {
    theDisplay.textContent = "";
  }
  // This resets everything since equal was pressed, so new calculator operation will be started
  if (equalPressed && !operatorPressedOnce) {
    firstNum = "";
    secondNum = "";
    operation = "";
    equalPressed = false;
  }
}

function backspaceButtonAndKeyboard() {
  var displayString = `${theDisplay.textContent}`;
  // Reset everything if equal was pressed, starting a new operation
  if (equalPressed) {
    firstNum = "";
    secondNum = "";
    operation = "";
    theDisplay.textContent = "0";
    equalPressed = false;
  } else {
    theDisplay.textContent = displayString.slice(0, -1);
    // Once all the numbers in the display are backspaced, return the display to zero
    if (theDisplay.textContent === "") {
      theDisplay.textContent = "0";
    }
  }
}

function decimalButtonAndKeyboard() {
  // Reset everything if equal was pressed, starting a new operation and starting it with a decimal
  if (equalPressed) {
    firstNum = "";
    secondNum = "";
    operation = "";
    theDisplay.textContent = "0.";
    clearOnNextNum = false;
    equalPressed = false;
  } else if (Number(`${theDisplay.textContent}`) % 1 === 0) {
    theDisplay.textContent += ".";
  };
}

function equalButtonAndKeyboard() {
  // As long as we have an operation and a number, we have the display be second number and we execute an operation
  if (!equalPressed) {
    if (firstNum != "" && operation != "") {
      operatorPressedOnce = false;
      secondNum = theDisplay.textContent;
      firstNum = Number(`${firstNum}`);
      secondNum = Number(`${secondNum}`);
      theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
      clearOnNextNum = true;
      equalPressed = true;
    }
  }
}

// Event Listener for all operator buttons that if it is actively clicked, then have hover background, if not, then return to yellowgreen background
const allButtons = document.querySelectorAll("button");
allButtons.forEach(function (mov) {
  mov.addEventListener("click", handleClick);
});

function handleClick(event) {
  allOperatorButtons.forEach(function (val) {
    if (val == event.target) {
      val.classList.add("activeButton");
    } else {
      val.classList.remove("activeButton");
    }
  });
}
