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
    display.textContent = '0';
    firstNum = '';
    secondNum = '';
    operator = '';
    total = 0;
    history.innerText = "";
}

init();

const calculate = function() {
    if ( operator === "+" ) { // Get the sum of the textContents
        display.textContent = parseFloat(firstNum) + parseFloat(secondNum);
        total = parseFloat(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "-" ) { // Get the quotient of the textContents
        display.textContent = parseFloat(firstNum) - parseFloat(secondNum);
        total = parseFloat(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "x" ) { // Get the product of the textContents
        display.textContent = parseFloat(firstNum) * parseFloat(secondNum);
        total = parseFloat(display.textContent);
        firstNum = total;
        secondNum = '';
    } else if ( operator === "/" ) { // Get the difference of the textContents
        display.textContent = parseFloat(firstNum) / parseFloat(secondNum);
        total = parseFloat(display.textContent);
        firstNum = total;
        secondNum = '';
    }
}

// Starting Logical

for (let index = 0; index < numbers.length; index++) {
    numbers[index].addEventListener( 'click', function() {
        if ( operator === '' ) { // if operator is not selected yet
            firstNum += numbers[index].textContent;
            display.textContent = firstNum;
        } else {
            secondNum += numbers[index].textContent;
            display.textContent = secondNum;
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
                history.innerText = `${firstNum} ${operator} ${secondNum}`;
                switch (operator) {
                    case "+":
                        calculate();
                        break;
                    case "-":
                        calculate();
                        break;
                    case "x":
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
    init();
});

clearEntry.addEventListener( 'click', function() {
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

        if ( e.key !== 'Enter' ) {
            operator = e.key;
            console.log( operator );
        } else {
            if ( display.textContent !== '' && secondNum !== '' ) { // if the input/display textContent is not empty do the operations
                history.innerText = `${firstNum} ${operator} ${secondNum}`;
                switch (operator) {
                    case "+":
                        calculate();
                        break;
                    case "-":
                        calculate();
                        break;
                    case "x":
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
    }
});

// Backup

// let storetextContent = [];
// let sum = ( a, b ) => a + b;
// let quotient = ( a, b ) => a + b;
// let product = ( a, b ) => a + b;
// let difference = ( a, b ) => a + b;
// let total;

// for (let index = 0; index < operators.length; index++) {
//     operators[index].addEventListener( 'click', function() {
//         if (display.textContent !== '') {
//             if ( this.textContent === '' ) {
//                 storetextContent.push( Number(display.textContent) );
//                 total = storetextContent.reduce( sum );
//                 display.textContent = "";
//                 console.log( total );
//                 document.getElementById("demo").innerHTML = total;
//             }
//         }
//     });
// }