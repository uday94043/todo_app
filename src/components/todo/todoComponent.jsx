import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class todoComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id : this.props.match.params.id,
            description : "",
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    
    onSubmit(values){
        //console.log(values)
        let username = AuthenticationService.getLoggedInUserName()
        if (this.state.id === -1) {
            TodoDataService.createTodo(username,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=> this.props.history.push('/todos'))
         }
        else {
            TodoDataService.updateTodo(username,this.state.id,{
                id:this.state.id,
                description:values.description,
                targetDate:values.targetDate
            }).then(()=> this.props.history.push('/todos'))
         }
        

    }
    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = "Enter a description"
        }else if(values.description.length<5){
            errors.description ="Description should be more than 5 characters"
        }
        if(!values.targetDate){
            errors.targetDate = "specify target date for completing the todo"
        }
        return errors
    }
    componentDidMount(){
        if(this.state.id===-1){
            return
        }
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username,this.state.id)
        .then((response)=>this.setState({
            description:response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }
   render(){
       let des = this.state.description
       let tar = this.state.targetDate
       return (
           <div>
               <h1>Todo</h1>
               <div className="container">
                   <Formik initialValues={{description:des,targetDate:tar}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    enableReinitialize={true}
                   >
                       {
                           (props) => (
                               <Form>
                                   <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                   <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                   <fieldset className="form-group">
                                       <label>Description</label>
                                       <Field className="form-control" type="text" name="description"/>
                                   </fieldset>
                                   <fieldset className="form-group">
                                       <label>TargetDate</label>
                                       <Field className="form-control" type="date" name="targetDate"/>
                                   </fieldset>
                                   <button className="btn btn-success" type="submit">Save</button>
                               </Form>
                           )
                       }
                   </Formik>
               </div>
           </div>

            //<div>todo component for id {this.props.match.params.id}</div>
       )
   }
}
export default todoComponent