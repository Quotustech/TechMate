import axios from 'axios'
import { Config } from '../config'



export const Login = (email, password) => {

    return new Promise((resolve, reject) => {
        axios.post(`${Config.BaseUrl}/login`, {
            email,
            password,
        }).then((result) => {
            resolve(result.data)
        })
            .catch((error) => {

                console.log("", error)
                reject(error)
            })
    })
}