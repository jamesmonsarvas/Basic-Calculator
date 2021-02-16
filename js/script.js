'use strict';

// Variable Declarations
const display = document.getElementById( 'display' );
const clear = document.getElementById( 'clear' );
const clearEntry = document.getElementById( 'clear-entry' );
const equalBtn = document.getElementById( 'equals' );
const history = document.getElementById( 'history' );
const dot = document.getElementById( 'decimal' );

const numbers = document.querySelectorAll( '.number' );
const operators = document.querySelectorAll( '.operator' );

display.textContent = 0;
history.textContent = '';

const KEY_CODE = {
    8: 'Backspace',
    13: 'Enter',
    27: 'Escape',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    56: '*',
    187: '+',
    189: '-',
    190: '.',
    191: '/'
};

const getCode = (code) => {
    if (!KEY_CODE[code]) {
        return;
    }
    
    return KEY_CODE[code];
};

// for (const key in KEY_CODE) {
//     if (Object.hasOwnProperty.call(KEY_CODE, key)) {
//         const element = KEY_CODE[key];
//         document.addEventListener( 'keydown', function(e) {
//             if ( getCode( e.keyCode ) ) {
//                 console.log( getCode( e.keyCode ) );
//             }
//         });
//     }
// }

let state = {
    firstNum: '',
    secondNum: '',
    operator: '',
    total: '',
    keysPressed: '',
    input: '',
};

const defaultState = {...state};

const resetState = () => {
    state = {...defaultState};
    display.textContent = 0;
    history.textContent = '';
    console.log( state );
}

const clearStateEntry = () => {
    let firstNum = state.firstNum;
    let secondNum = state.secondNum;
    let operator = state.operator;

    if ( operator === '' ) { // if operator is not selected yet
        state.firstNum = firstNum.substring( 0, -1 );
        display.textContent = '0';
    } else {
        state.secondNum = secondNum.substring( 0, -1 );
        display.textContent = '0';
    }
}

/**
 * Check if the input has dot
 * if already have don't add more
 */
const dotFunction = () => {
    if (!/\./.test(state.keysPressed)) {
        if ( state.operator === '' ) { // if operator is not selected yet
            state.firstNum += display.textContent === '0' ? 0 + dot.textContent : dot.textContent;
            display.textContent = state.firstNum;
            state.input = display.textContent;
            // no dot pressed before now, so add to keysPressed
            state.keysPressed += state.input; // adds input because there was not a previous dot in keysPressed
        } else {
            state.secondNum += display.textContent === '0' ? 0 + dot.textContent : dot.textContent;
            display.textContent = state.secondNum;
            state.input = display.textContent;
            // no dot pressed before now, so add to keysPressed
            state.keysPressed += state.input; // adds input because there was not a previous dot in keysPressed
        }
    }
}

/**
 * Do the calculation
 * base on the selected operator
 */
const calculate = () => {
    if ( state.operator === "+" ) { // Get the sum of the textContents
        display.textContent = parseFloat(state.firstNum) + parseFloat(state.secondNum);
        state.total = Number(display.textContent);
        state.firstNum = state.total;
        state.secondNum = '';
    } else if ( state.operator === "-" ) { // Get the quotient of the textContents
        display.textContent = parseFloat(state.firstNum) - parseFloat(state.secondNum);
        state.total = Number(display.textContent);
        state.firstNum = state.total;
        state.secondNum = '';
    } else if ( state.operator === "*" ) { // Get the product of the textContents
        display.textContent = parseFloat(state.firstNum) * parseFloat(state.secondNum);
        state.total = Number(display.textContent);
        state.firstNum = state.total;
        state.secondNum = '';
    } else if ( state.operator === "/" ) { // Get the difference of the textContents
        display.textContent = parseFloat(state.firstNum) / parseFloat(state.secondNum);
        state.total = Number(display.textContent);
        state.firstNum = state.total;
        state.secondNum = '';
    }
}

/**
 * This is part of the calculation
 */
const operatorFunction = () => {
    if ( display.textContent !== '' && state.secondNum !== '' ) { // if the input/display textContent is not empty do the operations
        history.innerText = `${state.firstNum} ${state.operator} ${state.secondNum}`; // Get the first number, operator and second number and then store it
            switch (state.operator) {
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
        history.innerText += ` = ${state.total}`;
    }
}

// Starting Logical
for (let index = 0; index < numbers.length; index++) {
    /**
     * Loop though all the number
     */
    const element = String(numbers[index].textContent);
    numbers[index].addEventListener( 'click', function() { // Add an event click on the numbers
        if (state.operator === '') {
            state.firstNum += element;
            display.textContent = state.firstNum;
        } else {
            state.secondNum += element;
            display.textContent = state.secondNum;
        }
    });

    document.addEventListener( 'keydown', function( e ) {// Add an event keydown on the numbers base on the key pressed
        if (state.operator === '') {
            if ( getCode( e.keyCode ) ) {
                if ( e.key === element ) {
                    state.firstNum += element;
                    display.textContent = state.firstNum;
                }
            }
        } else {
            if ( getCode( e.keyCode ) ) {
                if ( e.key === element ) {
                    state.secondNum += element;
                    display.textContent = state.secondNum;
                }
            }
        }
    });
}

for( let index = 0; index < operators.length; index++ ) {

    operators[index].addEventListener( 'click', function() {
        state.keysPressed = '';
        state.input = '';

        if ( operators[index].textContent !== '=' ) { // if the operator is not equals to "="
            // Store the selected Operator
            state.operator = operators[index].textContent;
        } else {
            operatorFunction();
        }
    });

    document.addEventListener( 'keydown', function( e ) {
        if ( getCode( e.keyCode ) ) {
            if ( e.key !== getCode( 13 ) ) { // if the operator is not equals to "Enter"
                if ( e.key === operators[index].textContent ) { // Check first if the key is equals to the operator and then store it
                    state.operator = e.key;
                    console.log( state.operator );
                }
            } else {
                operatorFunction();
            }
        }
    });
}

dot.addEventListener( 'click', dotFunction);
clear.addEventListener( 'click', resetState);
clearEntry.addEventListener( 'click', clearStateEntry);

document.addEventListener( 'keydown', function( e ) {
    if (getCode( e.keyCode )) {
        if ( e.key === getCode( 27 ) ) {
            resetState();
        }

        if ( e.key === getCode( 8 ) ) {
            clearStateEntry();
        }

        if ( e.key === getCode( 190 ) ) {
            dotFunction();
        }
    }
});

const str = toString(display.textContent);
let result;
if ( str.charCodeAt() === 12290 ) {
    result = str.replace(/。/g, '.');
    console.log(result);
}