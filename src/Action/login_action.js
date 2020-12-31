import { LOGIN_REQUEST, SOCIAL_LOGIN_REQUEST } from "./../Action/type";


export function login_request_saga(object){
    return {
        type: LOGIN_REQUEST,
        status: false,
        object: object
    }
}

export function login_request(object){
    console.log("Login action object=====>"+JSON.stringify(object))
    return login_request_saga(object)
}

export function social_login_request_saga(object){
    return {
        type: SOCIAL_LOGIN_REQUEST,
        status: false,
        object: object
    }
}


export function socialLogin_request(object){
    console.log("social Login action object=====>"+JSON.stringify(object))
    return social_login_request_saga(object)
}




