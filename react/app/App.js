import React, { useState, useEffect } from 'react';
import './App.scss';

const App = () => {
    const [current, setCurrent] = useState('0');
    const [firstNum, setFirstNum] = useState('');
    const [secondNum, setSecondNum] = useState('');
    const [operator, setOperator] = useState('');
    const [total, setTotal] = useState('');
    const [history, setHistory] = useState('');

    // renderCount += 1;
    // console.log('storeNum:', storeNum);

    // Calculate
    const calculate = (firstNum, operator, secondNum) => {
        let totalValue = total;
        if (firstNum !== '' && secondNum !== '') {
            if (operator === '+') {
                totalValue = parseFloat(firstNum) + parseFloat(secondNum);
                setTotal(totalValue);
                setFirstNum(totalValue);
                setSecondNum('');
                setCurrent(totalValue);
            } else if (operator === '-') {
                totalValue = parseFloat(firstNum) - parseFloat(secondNum);
                setTotal(totalValue);
                setFirstNum(totalValue);
                setSecondNum('');
                setCurrent(totalValue);
            } else if (operator === '*') {
                totalValue = parseFloat(firstNum) * parseFloat(secondNum);
                setTotal(totalValue);
                setFirstNum(totalValue);
                setSecondNum('');
                setCurrent(totalValue);
            } else if (operator === '/') {
                totalValue = parseFloat(firstNum) / parseFloat(secondNum);
                setTotal(totalValue);
                setFirstNum(totalValue);
                setSecondNum('');
                setCurrent(totalValue);
            }
        }

        return setHistory(
            `${firstNum} ${operator} ${secondNum} = ${totalValue}`
        );
    };

    const handleKeyPress = (e) => {
        const number =
            (e.key >= 0 && e.key <= 9) || e.keyCode === 190 || e.keyCode === 46
                ? e.key
                : '';
        const firstNumInput = firstNum + number;
        const secondNumInput = secondNum + number;
        const operatorSelected = e.key;
        if (number) {
            if (operator === '') {
                setFirstNum(firstNumInput);
                setCurrent(firstNumInput);
            } else {
                setSecondNum(secondNumInput);
                setCurrent(secondNumInput);
            }
        }

        if (
            (e.keyCode === 187 && e.key === '+') ||
            (e.keyCode === 189 && e.key === '-') ||
            (e.keyCode === 56 && e.key === '*') ||
            (e.keyCode === 191 && e.key === '/')
        ) {
            if (operatorSelected !== '=') {
                setOperator(operatorSelected);
                if (firstNumInput !== '' && secondNumInput !== '') {
                    calculate(firstNumInput, operator, secondNumInput);
                }
            } else {
                calculate(firstNumInput, operator, secondNumInput);
            }
        }

        if (secondNumInput !== '') {
            if (
                (e.keyCode === 187 && e.key === '=') ||
                (e.keyCode === 13 && e.key === 'Enter')
            ) {
                calculate(firstNumInput, operator, secondNumInput);
            }
        }

        if (
            e.key === 'c' ||
            (e.keyCode === 67 && e.key === 'C') ||
            (e.keyCode === 27 && e.key === 'Escape')
        ) {
            setCurrent('0');
            setFirstNum('');
            setSecondNum('');
            setOperator('');
            setTotal('');
            setHistory('');
        } else if (e.keyCode === 8) {
            if (operator === '') {
                setCurrent('0');
                setFirstNum('');
            } else {
                setCurrent('0');
                setSecondNum('');
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [firstNum, operator, secondNum]);

    /**
     * Create Component Number that accept 'className' and object spread '...rest '
     */

    const handleNumberClick = (value) => {
        const firstNumInput = firstNum + value;
        const secondNumInput = secondNum + value;

        if (operator === '') {
            setFirstNum(firstNumInput);
            setCurrent(firstNumInput);
        } else {
            setSecondNum(secondNumInput);
            setCurrent(secondNumInput);
        }
    };

    const Number = ({ className = '', inputNum, ...rest }) => {
        return (
            <div
                onClick={() => handleNumberClick(inputNum)}
                className={`number btn ${className}`}
                {...rest}
            />
        );
    };

    /**
     * Create Component Operators that accept 'className' and object spread '...rest '
     */

    const handleOperatorClick = (value) => {
        const operatorSelected = value;
        const firstNumInput = firstNum;
        const secondNumInput = secondNum;
        if (operatorSelected !== '=') {
            setOperator(operatorSelected);
            if (firstNumInput !== '' && secondNumInput !== '') {
                calculate(firstNumInput, operator, secondNumInput);
            }
        } else {
            calculate(firstNumInput, operator, secondNumInput);
        }
    };

    const Operator = ({ className = '', operator, ...rest }) => {
        return (
            <div
                onClick={() => handleOperatorClick(operator)}
                className={`operator btn ${className}`}
                {...rest}
            />
        );
    };

    /**
     * Clear Operations
     */

    const handleClearClick = (value) => {
        const totalValue = total;
        const operatorSelected = operator;
        if (value === 'C' || value === 'c') {
            setCurrent('0');
            setFirstNum('');
            setSecondNum('');
            setOperator('');
            setTotal('');
            setHistory('');
        } else {
            if (totalValue === '') {
                if (operatorSelected === '') {
                    setCurrent('0');
                    setFirstNum('');
                } else {
                    setCurrent('0');
                    setSecondNum('');
                }
            }
        }
    };

    const Clear = ({ className, type, ...rest }) => {
        return (
            <div
                onClick={() => handleClearClick(type)}
                className={`btn clr-btn ${className}`}
                {...rest}
            />
        );
    };

    return (
        <div id="calculator">
            <div className="calc">
                <div className="heading">
                    <h1>Calculator</h1>
                </div>
                <div className="output">
                    <div id="history" className="history">
                        {history}
                    </div>
                    <div id="display" className="display">
                        {current}
                    </div>
                </div>
                <div className="box">
                    <Clear type="C" className="clear">
                        C
                    </Clear>
                    <Clear type="CE" className="clear-entry">
                        CE
                    </Clear>
                    <Number inputNum="7" className="number-7">
                        7
                    </Number>
                    <Number inputNum="8" className="number-8">
                        8
                    </Number>
                    <Number inputNum="9" className="number-9">
                        9
                    </Number>
                    <Operator operator="/" className="divide">
                        /
                    </Operator>
                    <Number inputNum="4" className="number-4">
                        4
                    </Number>
                    <Number inputNum="5" className="number-5">
                        5
                    </Number>
                    <Number inputNum="6" className="number-6">
                        6
                    </Number>
                    <Operator operator="*" className="multiply">
                        *
                    </Operator>
                    <Number inputNum="1" className="number-1">
                        1
                    </Number>
                    <Number inputNum="2" className="number-2">
                        2
                    </Number>
                    <Number inputNum="3" className="number-3">
                        3
                    </Number>
                    <Operator operator="-" className="minus">
                        -
                    </Operator>
                    <Number inputNum="." className="decimal">
                        .
                    </Number>
                    <Number inputNum="0" className="number-0">
                        0
                    </Number>
                    <Operator operator="=" className="equals">
                        =
                    </Operator>
                    <Operator operator="+" className="sum">
                        +
                    </Operator>
                </div>
            </div>
        </div>
    );
};

export default App;
