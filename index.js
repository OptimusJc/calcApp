// const cell = document.querySelectorAll("td");
// let display = document.querySelector(".display");
// const keys = document.querySelectorAll(".key--operator");

// // ? set up event listeners on each cell :thumbsup:
// // * display the value of each cell clicked on the display :thumbsup:
// // ! perform a calculation on each cell value when the combination of cell values includes an operator and display the total

// function displayed(num) {
//     display.textContent = num.textContent; 
// }

// // function inputDigit(digit) {
// //     display.textContent = displayNum === '0' ? digit : displayNum + digit;
// // }


// cell.forEach((element) => {
    
//     element.addEventListener('click', (e)=> {
//         e.preventDefault();
//         // console.log(`You clicked cell ${element.textContent}`);
//         displayed(element);
        
//         // key that is clicked
//         const key = e.target;
//         const { textContent } = key;
        
//         // get the custom action attribute 'action' of that key
//         const { action } = key.dataset;
        
//         // let keyNum = element.textContent;
//         let keyNum = textContent.toString();
//         displayNum = display.textContent.toString();

//          // remove the pressed state from all keys 
//         Array.from(key.parentNode.children).forEach((child) => {
//                 child.classList.remove('key--operator-pressed');
//         });

//         // check if the buttons are working 
//         if(!action) {
//             console.log('number is clicked.');

//             display.textContent = displayNum === '0' ? keyNum : displayNum + keyNum;

//         } else if(action == 'add' ||
//                     action == 'subtract' ||
//                     action == 'multiply' ||
//                     action == 'divide'
//                 ) {
//             console.log('operator is clicked.');
//             element.classList.add('key--operator-pressed');
//             let operator = textContent;
//             console.log(operator);

//         }  
//         else if(action == 'clear') {
//             console.log('ac is clicked.');
//             display.textContent = '0';
//         } 
//         else if(action == 'calculate') {
//             console.log('calculate method is clicked.');

//         } 
//         else if(action == 'decimal') {
//             console.log('decimal is clicked.');
//             display.textContent = displayNum + '.';
//         }

        
//     });
// });


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    updateOperand(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
        // console.log(`${this.currentOperand} ${number}`)
    }

    chooseOperation(operand) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operand;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    calculate() {
        let total;
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(curr)) return

        switch(this.operation) {
            case '+':
                total = prev + curr;
                break;
            case '-':
                total = prev - curr;
                break;
            case '*':
                total = prev * curr;
                break;
            case '/':
                total = prev / curr;
                break;
            default: return
        }

        this.currentOperand = total;
        this.operation = undefined;
        this.previousOperand = ''

    }

    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''

        return floatNumber.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.currentOperand;
        if(this.operation != null) {

            this.previousOperandTextElement.innerHTML = 
            `${this.getDisplayNumber(this.previousOperand)}  ${this.operation}`;
        } else {
            this.currentOperandTextElement.innerHTML = '';
        }
    }


}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-clear]');
const display = document.querySelector('[data-display]');
const equalButton = document.querySelector('[data-equal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        calculator.updateOperand(button.innerHTML);
        // console.log(button.innerHTML)

        calculator.updateDisplay();

    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        calculator.chooseOperation(button.innerHTML);
        // console.log(button.innerHTML)

        calculator.updateDisplay();

    })
})

equalButton.addEventListener('click', (e) => {
    e.preventDefault();

    calculator.calculate();
    calculator.updateDisplay();
})


clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
})