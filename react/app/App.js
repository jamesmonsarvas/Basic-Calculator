import React from 'react';
import './App.scss';
import Numbers from './components/Numbers';

const App = () => {
    return (
        <div id="calculator">
            <div className="heading">
                <h1>Calculator</h1>
            </div>
            <div className="output">
                <div id="history" className="history">
                    35 + 35 = 70
                </div>
                <div id="display" className="display">
                    123
                </div>
            </div>
            <div className="box">
                <Numbers />
            </div>
        </div>
    );
};

export default App;
