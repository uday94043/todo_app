import axios from "axios"

class HelloWorldService{
    executeHelloWorldService(name){
        // let username = 'user'
        // let password =  'password'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        //console.log('executed service')
        return axios.get(`http://localhost:8080/hello-world-bean/${name}`//,{
            // headers: {
            //     authorization : basicAuthHeader
            // }
        //}
        )
    }
}

export default new HelloWorldService()