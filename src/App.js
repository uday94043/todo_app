import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FirstComponent from './components/learning-examples/FirstComponent'
import CounterButton from './components/counter/Counter';
import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp'
import './bootstrap.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoApp/>
            </div>
        );
    }
}


export default App;
