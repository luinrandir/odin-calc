"use strict";
// Calculator Class
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clearScreen();
  }
  addDigit(digit) {
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
  deleteDigit() {
    if (this.currentOperand.length === 1) this.currentOperand = "0";
    else
      this.currentOperand = this.currentOperand.substring(
        0,
        this.currentOperand.length - 1
      );
    this.updateScreen();
  }
  clearScreen() {
    this.previousOperand = "0";
    this.currentOperand = "0";
    this.operation = "";
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
