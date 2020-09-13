import React, { Component} from 'react';
import './Counter.css'
import PropTypes from 'prop-types'

export default class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }

        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);

    }

    render() {
        return (
            <div className="Counter">
                <CounterButton by={1} incrementMethod={this.increment} />
                <br></br>
                <CounterButton by={2} incrementMethod={this.increment} />
                <br></br>
                <CounterButton by={5} incrementMethod={this.increment} />
                <br></br>
                <CounterButton by={-1} incrementMethod={this.increment} />
                <br></br>
                <CounterButton by={-2} incrementMethod={this.increment} />
                <br></br>
                <CounterButton by={-5} incrementMethod={this.increment} />
                <br></br>
                <span className="count"> {this.state.counter} </span>
                <div><ResetButton resetMethod={this.reset} /></div>
                
            </div>
        );
    }

    increment(by) {
        //console.log("increment")
        this.setState({
            counter: this.state.counter + by
        });
    }
    reset() {
        this.setState({
            counter: 0
        });
    }
}

class CounterButton extends Component {

    constructor() {
        super();
        //this.state = {
       //     counter: 0
        //}

        this.increment = this.increment.bind(this);

    }

    render() {
        return (
            <div className="CounterButton">
                <button onClick={this.increment}> { this.props.by} </button>
                {/*<span className="count"> {this.state.counter} </span>*/}
            </div>
        )
    }

    increment() {
        //console.log("increment")
        //this.setState({
         //   counter: this.state.counter + this.props.by
        //});
        this.props.incrementMethod(this.props.by);
    }

    

}

CounterButton.defaultProps = {
    by: 1
}
CounterButton.propTypes = {
    by: PropTypes.number
}

class ResetButton extends Component {

    constructor() {
        super();
       
 
    }

    render() {
        return (
            <div className="CounterButton">
                <button className = "reset" onClick={this.props.resetMethod}> Reset </button>
            </div>
        )
    }
    

}
