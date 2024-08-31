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
  return +(a / b).toFixed(2);
}

// Variables that define a single calculator operation

var firstNum = "";
var secondNum = "";
var operation = "";
var clearOnNextNum = false;
var equalPressed = false;
var operatorPressedOnce = false;

// Operate function that takes in operator and two numbers and calls above function

function operate(a, b, operation) {
  if (operation === "+") {
    return(add(a, b));
  } else if (operation === "-") {
    return (subtract(a, b));
  } else if (operation === "×") {
    return (multiply(a, b));
  } else if (operation === "÷") {
    return (divide(a, b));
  }
}

// All non operation buttons section of calculator 

let grid = document.querySelector("#grid");

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
grid.appendChild(clearButton);

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

// Section of calculator (far right column) for operator buttons

operatorGrid = document.querySelector("#operatorGrid");

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
equalButton.classList.add("equalButton");
equalButton.textContent = `=`;
operatorGrid.appendChild(equalButton);

// Event Listener for number buttons, call numberButtonsAndKeyboard on click

const theDisplay = document.querySelector("#display");

const allNumButtons = document.querySelectorAll(".numberButton");
allNumButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberButtonsAndKeyboard();
    // Don't exceed the display width
    if (theDisplay.textContent.length < 16) {
      theDisplay.textContent += `${button.textContent}`;
    };
  });
});

// Event Listener that once an operation is pressed, then store the text content inside a variable and store operation so we know what operation to do once equals happens

const allOperatorButtons = document.querySelectorAll(".operatorButton");
allOperatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // operatorPressedOnce should have returned to false when equals was pressed, but this will trigger if we're doing multi-operative operation
    if (operatorPressedOnce) {
      secondNum = theDisplay.textContent;
      firstNum = Number(`${firstNum}`);
      secondNum = Number(`${secondNum}`);
      // If the answer will overflow the display, shorten answer to two sig figs
      if (operate(firstNum, secondNum, operation).toString().length < 17) {
        theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
      } else {
        theDisplay.textContent = `${(operate(firstNum, secondNum, operation)).toPrecision(2)}`;
      };
    };
    // Check to change to second number after this press
    clearOnNextNum = true;
    // Check to allow operation to continue if wanted after an equal press
    equalPressed = false;
    // Check to allow multi-operative operations
    operatorPressedOnce = true;
    // Set number and operation on clicks
    firstNum = theDisplay.textContent;
    operation = `${button.textContent}`
  });
});

// Event Listener for equal button

const theEqualButton = document.querySelector(".equalButton");
theEqualButton.addEventListener("click", () => {
  equalButtonAndKeyboard();
});

// Event Listener that once clear is clicked, reset everything

const theClearButton = document.querySelector(".clearButton");
theClearButton.addEventListener("click", () => {
  theDisplay.textContent = "0";
  firstNum = "";
  secondNum = "";
  operation = "";
  equalPressed = false;
  clearOnNextNum = true;
  operatorPressedOnce = false;
});

// Event Listener for backspace button

const theBackspaceButton = document.querySelector(".backspaceButton");
theBackspaceButton.addEventListener("click", () => {
  backspaceButtonAndKeyboard();
});

// Event Listener that once sign button is pressed, multiply textcontent by negative 1

const theSignButton = document.querySelector(".signButton");
theSignButton.addEventListener("click", () => {
  theDisplay.textContent = Number(`${theDisplay.textContent}`) * -1;
});

// Event Listener for decimal button

const theDecimalButton = document.querySelector(".decimalButton");
theDecimalButton.addEventListener("click", () => {
  decimalButtonAndKeyboard();
});

// Keyboard Support

document.addEventListener("keydown", (e) => {
  // If keydown was a number
  if (isFinite(e.key)) {
    numberButtonsAndKeyboard();
    // Overflow check
    if (theDisplay.textContent.length < 16) {
      theDisplay.textContent += `${e.key}`;
    }
  } else if (e.key === ".") {
    decimalButtonAndKeyboard();
  } else if (e.key === "Enter") {
    equalButtonAndKeyboard();
  } else if (e.key === "Backspace") {
    backspaceButtonAndKeyboard();
  }
});




// Functions

function numberButtonsAndKeyboard() {
  // clearOnNextNum is set to true after pressing an operator button so new number can be read
  if (clearOnNextNum) {
    theDisplay.textContent = "";
    clearOnNextNum = false;
  }
  // Ensure "01" doesn't happen
  if (theDisplay.textContent === "0") {
    theDisplay.textContent = "";
  }
  // This resets everything since equal was pressed and we weren't continuing with a new operation, so new calculator operation will be started
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
    operatorPressedOnce = false;
  } else {
    theDisplay.textContent = displayString.slice(0, -1);
    // Once all the numbers in the display are backspaced, return the display to zero
    if (theDisplay.textContent === "") {
      theDisplay.textContent = "0";
    };
  };
};

function decimalButtonAndKeyboard() {
  if (clearOnNextNum) {
    theDisplay.textContent = "0.";
    clearOnNextNum = false;
  // Do nothing if there is a decimal in the current display
  } else if (theDisplay.textContent.indexOf('.') > -1) {
  } else {
    theDisplay.textContent += "."
  };
}

function equalButtonAndKeyboard() {
  // As long as we have an operation and a number and equal was set back to false, we have the display be second number and we execute an operation
  if (firstNum != "" && operation != "" && !equalPressed) {
    operatorPressedOnce = false;
    secondNum = theDisplay.textContent;
    firstNum = Number(`${firstNum}`);
    secondNum = Number(`${secondNum}`);
    // Overflow check
    if (operate(firstNum, secondNum, operation).toString().length < 17) {
      theDisplay.textContent = `${operate(firstNum, secondNum, operation)}`;
    } else {
      theDisplay.textContent = `${(operate(firstNum, secondNum, operation)).toPrecision(2)}`;
    };
    equalPressed = true;
    clearOnNextNum = true;
    operation = "";
  };
};

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




