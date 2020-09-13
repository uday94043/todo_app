import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    // { id: 1, description: 'learn react', done: false, targetDate: new Date() },
                    // { id: 2, description: 'learn react2', done: false, targetDate: new Date() },
                    // { id: 3, description: 'learn react3', done: false, targetDate: new Date() }
                ],
                message: null
        }
        //this.back = this.back.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
    }

    componentDidMount(){
        this.refreshTodos() // called everytime after this component is mounted(rendered) so all updates are re-rendered
    }
    refreshTodos(){
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username) 
        .then(
            response=> {
                //console.log(response)
                this.setState({
                    todos: response.data
                })
            }
        )
    }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log("should") // called everytime before the render is called, render will be called if this method returns true
    //     console.log(nextProps)
    //     console.log(nextState)
    // }

    render() {
        return (
            <div>
                <h1> TODO LIST</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>description</th>
                                <th>done</th>
                                <th>targetDate</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className = "btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className = "btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={() => this.addTodoClicked()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(username + " "+ id)
        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({message : `Delete of todo with id ${id} successful`})
                this.refreshTodos()
            }
        )
        
    }
    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)
    }
    addTodoClicked(){
        let id=-1
        this.props.history.push(`/todos/${id}`)
    }
    //back() {
    //    this.props.history.go(-1)
    //}
}

export default ListTodosComponent