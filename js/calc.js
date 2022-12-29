"use strict";
// Calculator Class
class Calculator {
  #message = "Stop trying to create a black hole!";
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clearScreen();
  }
  addDigit(digit) {
    if (this.currentOperand === this.#message) {
      this.clearScreen();
    }
    if (this.operation === "=") {
      this.clearScreen();
    }
    if (digit.toString() === "." && this.currentOperand.includes(".")) return;
    if (
      digit.toString() != "0" &&
      digit.toString() != "." &&
      this.currentOperand === "0"
    ) {
      this.currentOperand = digit.toString();
      this.updateScreen();
      return;
    }
    if (digit.toString() === "0" && this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString() + digit.toString();
    this.updateScreen();
  }
  addOperation(operation) {
    if (this.operation != "") {
      this.evaluate(operation);
      return;
    }
    if (operation === "=" && this.operation === "") return;
    if (operation === "=" && this.operation != "") {
      this.evaluate(operation);
      return;
    }
    this.operation = operation;
    this.previousOperand =
      this.currentOperand.toString() + operation.toString();
    this.currentOperand = "0";
    this.updateScreen();
  }
  clearScreen() {
    this.previousOperand = "0";
    this.currentOperand = "0";
    this.operation = "";
    this.updateScreen();
  }
  deleteDigit() {
    if (this.currentOperand.length === 1) this.currentOperand = "0";
    else
      this.currentOperand = this.currentOperand.substring(
        0,
        this.currentOperand.length - 1
      );
    this.updateScreen();
  }
  evaluate(operation) {
    let _currentNumber = parseFloat(this.currentOperand);
    let _previousNumber = parseFloat(this.previousOperand);
    switch (this.operation) {
      case "+":
        this.currentOperand = "0";
        this.previousOperand = (_previousNumber + _currentNumber).toString();
        break;
      case "-":
        this.currentOperand = "0";
        this.previousOperand = (_previousNumber - _currentNumber).toString();
        break;
      case "*":
        this.currentOperand = "0";
        this.previousOperand = (_previousNumber * _currentNumber).toString();
        break;
      case "÷":
        if (_currentNumber === 0) {
          this.currentOperand = this.#message;
          break;
        }
        this.currentOperand = "0";
        this.previousOperand = (_previousNumber / _currentNumber).toString();
        break;
    }
    if (operation != "" && operation != "=")
      this.previousOperand =
        this.previousOperand.toString() + operation.toString();
    this.operation = operation;
    this.updateScreen();
  }
  updateScreen() {
    this.previousOperandText.innerText = this.previousOperand;
    this.currentOperandText.innerText = this.currentOperand;
  }
}
const clearButtons = document.querySelectorAll("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const previousOperandText = document.getElementById("previous");
const currentOperandText = document.getElementById("current");
const calc = new Calculator(previousOperandText, currentOperandText);

clearButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "AC") calc.clearScreen();
    else calc.deleteDigit();
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.addDigit(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.addOperation(button.innerText);
  });
});

window.addEventListener("keypress", (evt) => {
  switch (evt.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      calc.addDigit(String.fromCharCode(evt.charCode));
      break;
    case "+":
    case "-":
    case "*":
      evt.preventDefault();
      calc.addOperation(String.fromCharCode(evt.charCode));
      break;
    case "/":
      evt.preventDefault();
      calc.addOperation("÷");
      break;
  }
});
window.addEventListener("keydown", (evt) => {
  if (evt.key === "Backspace") calc.deleteDigit();
  if (evt.key === "Enter") calc.evaluate("=");
  if (evt.key === "Escape") calc.clearScreen();
});
