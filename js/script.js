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

display.textContent = '0';
history.textContent = '';

const KEY_CODE = {
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
    27: 'Escape',
    190: '.',
    191: '/'
};

const getCode = (code) => {
    if (!KEY_CODE[code]) {
        console.log('Key is not existing on the provided key codes');
        return;
    }
    return KEY_CODE[code];
};

// for (const key in KEY_CODE) {
//     if (Object.hasOwnProperty.call(KEY_CODE, key)) {
//         const element = KEY_CODE[key];
//         document.addEventListener( 'keydown', function(e) {
//             if ( getCode( e.keyCode ) ) {
//                 console.log( element );
//             }
//         });
//     }
// }
const str = '。';
if ( str.charCodeAt() === 12290 ) {
    str.replace(/。/g, '.');
    console.log(str);
}

document.addEventListener( 'keydown', function(e) {
    if ( e.keyCode === 190 ) {
        dotFunction();
        console.log( e );
    }

    var regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g; 
    var input = display.textContent;

    if (regex.test(input)) {
        console.log( regex.test(input) );
    } else {
        console.log("No Japanese characters");
    }
});

let state = {
    firstNum: '',
    secondNum: '',
    operator: '',
    total: '',
    keysPressed: '',
    input: '',
};

const defaultState = {...state};

const resetState = function() {
    state = {...defaultState};
    display.textContent = '0';
    history.textContent = '';
    console.log( state );
}

/**
 * Check if the input has dot
 * if already have don't add more
 */
const dotFunction = function() {
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
const calculate = function() {
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
const operatorFunction = function() {
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

dot.addEventListener( 'click', function() {
    dotFunction();
});

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

    // document.addEventListener( 'keydown', function( e ) {// Add an event keydown on the numbers base on the key pressed
    //     if (state.operator === '') {
    //         if ( e.key === element ) {
    //             state.firstNum += element;
    //             state.textContent = state.firstNum;
    //         }
    //     } else {
    //         if ( e.key === element ) {
    //             state.secondNum += element;
    //             state.textContent = state.secondNum;
    //         }
    //     }
    // });
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

    // document.addEventListener( 'keydown', function( e ) {
    //     if ( e.key !== 'Enter' || operators[index].textContent !== '=' ) { // if the operator is not equals to "Enter"
    //         if ( e.key === operators[index].textContent ) { // Check first if the key is equals to the operator and then store it
    //             operator = operators[index].textContent;
    //         }
    //     } else {
    //         operatorFunction();
    //     }
    // });
}

clear.addEventListener( 'click', resetState);

clearEntry.addEventListener( 'click', function() {
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
});