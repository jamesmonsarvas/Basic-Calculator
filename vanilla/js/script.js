'use strict';

// Variable Declarations
const display = document.getElementById( 'display' );
const clear = document.getElementById( 'clear' );
const clearEntry = document.getElementById( 'clear-entry' );
const equalBtn = document.getElementById( 'equals' );
const history = document.getElementById( 'history' );

const numbers = document.querySelectorAll( '.number' );
const operators = document.querySelectorAll( '.operator' );

// Assigning textContent
let firstNum, secondNum, operator, total, textContent;

// Starting Condition
const init = function() {
    // Initialize the starting conditions
    display.textContent = '0';
    firstNum = '';
    secondNum = '';
    operator = '';
    total = 0;
    history.innerText = "";
}

init();

/**
 * Do the calculation
 * base on the selected operator
 */
const calculate = function() {
    if ( operator === "+" ) { // Get the sum of the textContents
        display.textContent = parseFloat(firstNum) + parseFloat(secondNum);
        total = Number(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "-" ) { // Get the quotient of the textContents
        display.textContent = parseFloat(firstNum) - parseFloat(secondNum);
        total = Number(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "*" ) { // Get the product of the textContents
        display.textContent = parseFloat(firstNum) * parseFloat(secondNum);
        total = Number(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "/" ) { // Get the difference of the textContents
        display.textContent = parseFloat(firstNum) / parseFloat(secondNum);
        total = Number(display.textContent);
        firstNum = total;
        secondNum = '';
    }
}

// Starting Logical
for (let index = 0; index < numbers.length; index++) {
    /**
     * Loop though all the number
     */
    const element = String(numbers[index].textContent);    
    numbers[index].addEventListener( 'click', function() { // Add an event click on the numbers
        if ( operator === '' ) { // if operator is not selected yet
            firstNum += element;
            display.textContent = firstNum;
        } else {
            secondNum += element;
            display.textContent = secondNum;
        }
    });

    document.addEventListener( 'keydown', function( e ) {// Add an event keydown on the numbers base on the key pressed
        if (operator === '') {
            if ( e.key === element ) {
                firstNum += element;
                display.textContent = firstNum;
            }
        } else {
            if ( e.key === element ) {
                secondNum += element;
                display.textContent = secondNum;
            }
        }
    });
}

for( let index = 0; index < operators.length; index++ ) {
    operators[index].addEventListener( 'click', function() {
        if ( operators[index].textContent !== '=' ) { // if the operator is not equals to "="
            // Store the selected Operator
            operator = operators[index].textContent;
        } else {
            if ( display.textContent !== 0 && secondNum !== '' ) { // if the input/display textContent is not empty do the operations
                history.innerText = `${firstNum} ${operator} ${secondNum}`; // Get the first number, operator and second number and then store it
                switch (operator) {
                    case "+":
                        calculate();
                        break;
                    case "-":
                        calculate();
                        break;
                    case "*":
                        calculate();
                        break;
                    case "/":
                        calculate();
                        break;
                    default:
                        display.textContent = "Not a valid number!";
                        break;
                }
                history.innerText += ` = ${total}` // Add the total string to the history;
            }
        }
    });

    document.addEventListener( 'keydown', function( e ) {
        if ( e.key !== 'Enter' ) { // if the operator is not equals to "Enter"
            if ( e.key === operators[index].textContent ) {
                operator = operators[index].textContent;
            }
        } else {
            if ( display.textContent !== '' && secondNum !== '' ) { // if the input/display textContent is not empty do the operations
                history.innerText = `${firstNum} ${operator} ${secondNum}`; // Get the first number, operator and second number and then store it
                switch (operator) {
                    case "+":
                        calculate();
                        break;
                    case "-":
                        calculate();
                        break;
                    case "*":
                        calculate();
                        break;
                    case "/":
                        calculate();
                        break;
                    default:
                        display.textContent = "Not a valid number!";
                        break;
                }
                history.innerText += ` = ${total}`;
            }
        }
    });
}

clear.addEventListener( 'click', function() {
    // Initialize the init to reset the value
    init();
});

clearEntry.addEventListener( 'click', function() {
    if ( total === 0 ) { // If the total is not set yet
        if ( operator === '' ) { // if operator is not selected yet
            firstNum = firstNum.substring( 0, -1 );
            display.textContent = 0;
        } else {
            secondNum = secondNum.substring( 0, -1 );
            display.textContent = 0;
        }
    }
    else {
        secondNum = secondNum.substring( 0, -1 );
        display.textContent = 0;
    }
});

document.addEventListener( 'keydown', function( e ) {
    console.log( e );
    if ( display.textContent !== '0' ) {
        if ( e.key === 'Escape' ) {
            init();
        }

        if ( e.key === 'Backspace' ) {
            if ( total === 0 ) {
                if ( operator === '' ) { // if operator is not selected yet
                    firstNum = firstNum.substring( 0, -1 );
                    display.textContent = 0;
                } else {
                    secondNum = secondNum.substring( 0, -1 );
                    display.textContent = 0;
                }
            }
            else {
                secondNum = secondNum.substring( 0, -1 );
                display.textContent = 0;
            }
        }
    }

});