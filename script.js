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
let grid = document.querySelector("#grid")
for (let i=1; i < 10; i++) {
  const cell = document.createElement("button");
  cell.style.boxSizing = "border-box";
  cell.style.width = 140 + "px";
  cell.style.height = 140 + "px";
  cell.textContent = `${i}`;
  grid.appendChild(cell);
}
