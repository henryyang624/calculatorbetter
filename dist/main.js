class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) {
            return;
        }
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.current === '') {
            return;
        }
        if (this.previous !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';

    }

    compute() {
        let result;
        this.previousTextElement.innerText = '';
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break
            case '-':
                result = prev - curr;
                break
            case '*':
                result = prev * curr;
                break
            case '÷':
                result = prev / curr;
                break
            default:
                return
        }
        this.current = result;
        this.operation = undefined;
        this.previous = '';


    }

    updateDisplay() {
        this.currentTextElement.innerText = this.current;
        if (this.operation != null){
            this.previousTextElement.innerText = `${this.previous} ${this.operation}`
        };
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

