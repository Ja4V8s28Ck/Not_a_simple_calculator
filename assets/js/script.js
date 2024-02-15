/* The above class defines a calculator object with methods for performing basic arithmetic operations
and updating the display. */
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  /**
   * The function clears the current and previous operands and sets the operation to undefined.
   */
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  /**
   * This function deletes the last character of the current operand.
   */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  /**
   * The function appends a number to the current operand, unless the number is a decimal point and the
   * current operand already includes a decimal point.
   * @param number - The parameter `number` is a value that is passed into the `appendNumber` function.
   * It can be any valid number or a decimal point (represented by the string '.'). The function checks
   * if the current operand already contains a decimal point and if so, it does not allow another
   * decimal point to
   * @returns If the `number` being passed is a decimal point (`.`) and the `currentOperand` already
   * includes a decimal point, then nothing is being returned (the function exits early). Otherwise,
   * the `number` is being appended to the `currentOperand` and converted to a string.
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  /**
   * This function sets the operation to be performed and stores the current operand as the previous
   * operand.
   * @param operation - The `operation` parameter is a string that represents the mathematical
   * operation to be performed, such as addition, subtraction, multiplication, or division.
   * @returns If the `currentOperand` property of the object calling the `chooseOperation` method is an
   * empty string, then nothing is returned.
   */
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  /**
   * This function performs basic arithmetic operations on two operands and updates the current operand
   * with the result.
   * @returns If either `prev` or `current` is not a number, the function returns nothing
   * (`undefined`). If the `operation` is not one of the four specified cases (`+`, `-`, `*`, `/`), the
   * function also returns nothing. Otherwise, the function sets the `currentOperand` to the result of
   * the computation, sets the `operation` to `undefined`, and sets the
   */
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    // #
    if (document.getElementById("hty").innerHTML.search("Data") != -1){
      document.getElementById("hty").innerHTML = "";
    }
    if (c >= 8){
      document.getElementById(`l${c % 8}`).remove();
    }
    document.getElementById("hty").insertAdjacentHTML("afterbegin",`<div class="output lkg" id="l${c % 8}" style="height: 75px;background: var(--bs-light-text-emphasis);color: var(--bs-body-bg);font-family: ABeeZee, sans-serif;font-size:22px;border: 7px solid var(--bs-body-color);">${prev} ${this.operation} ${current} = ${computation}</div>\n`);
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    c+=1;
  }

  /**
   * The function formats a number by adding commas to separate thousands and displaying decimal places
   * if present.
   * @param number - The input number that needs to be formatted and returned as a string with commas
   * separating the thousands. If the number has decimal places, they should be retained in the output.
   * @returns a formatted string representation of a number with commas separating the thousands and an
   * optional decimal point. If the input number has decimal digits, they are preserved in the output.
   * If the input number is not a valid number, an empty string is returned.
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  /**
   * The function updates the display of the calculator with the current and previous operands and
   * operation.
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

// #
document.getElementById("hty").innerHTML += '<div class="lkg" style="background-color:var(--bs-orange);font-size:35px;">No Data</div>'
var c = 0;
/* These lines of code are selecting various HTML elements from the DOM using their data attributes. */
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

/* `const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)` is
creating a new instance of the `Calculator` class and assigning it to the `calculator` constant. The
`previousOperandTextElement` and `currentOperandTextElement` arguments are passed to the constructor
of the `Calculator` class, which sets the `previousOperandTextElement` and
`currentOperandTextElement` properties of the new `calculator` object to the corresponding DOM
elements. This allows the `calculator` object to update the display on the webpage with the current
and previous operands and operation. */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/* This code is adding a click event listener to each button in the `numberButtons` array. When a
button is clicked, the `appendNumber` method of the `calculator` object is called with the inner
text of the button as an argument. This updates the `currentOperand` property of the `calculator`
object with the clicked number and then updates the display using the `updateDisplay` method. */
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

/* This code is adding a click event listener to each button in the `operationButtons` array. When a
button is clicked, the `chooseOperation` method of the `calculator` object is called with the inner
text of the button as an argument. This updates the `operation` property of the `calculator` object
with the clicked operation and then updates the display using the `updateDisplay` method. */
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

/* This code is adding a click event listener to the `equalsButton` element. When the button is
clicked, the `compute` method of the `calculator` object is called to perform the arithmetic
operation on the current and previous operands, and the result is stored in the `currentOperand`
property of the `calculator` object. Then, the `updateDisplay` method is called to update the
display on the webpage with the result. */
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

/* This code is adding a click event listener to the `allClearButton` element. When the button is
clicked, the `clear` method of the `calculator` object is called to reset the `currentOperand`,
`previousOperand`, and `operation` properties to their initial values. Then, the `updateDisplay`
method is called to update the display on the webpage with the cleared values. */
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

/* This code is adding a click event listener to the `deleteButton` element. When the button is
clicked, the `delete` method of the `calculator` object is called to delete the last character of
the `currentOperand` property. Then, the `updateDisplay` method is called to update the display on
the webpage with the updated `currentOperand`. */
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

/* This code is adding an event listener to the entire document that listens for keydown events. When a
keydown event occurs, the function specified as the second argument is executed. This function
checks if the key pressed matches certain patterns for numbers, operators, or special keys (such as
Enter, Backspace, or Delete). Depending on the key pressed, the function calls different methods of
the `calculator` object (such as `appendNumber`, `chooseOperation`, `compute`, `delete`, or `clear`)
and updates the display on the webpage using the `updateDisplay` method. The
`event.preventDefault()` method is called to prevent the default behavior of the key pressed (such
as typing a character or scrolling the page). This allows the calculator to be used with keyboard
input as well as mouse input. */
document.addEventListener('keydown', function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.compute()
    calculator.updateDisplay()
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete()
    calculator.updateDisplay()
  }
  if (event.key == 'Delete') {
    event.preventDefault();
    calculator.clear()
    calculator.updateDisplay()
  }

});
