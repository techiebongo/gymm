import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SOCIAL_LOGIN_REQUEST, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from "./../Action/type";



const loginReducer = (
    state = {
        status: "",
        response: null,
    },
    action
) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return (Object.assign({}, state, {
                status: action.status
            }))

        case LOGIN_SUCCESS:
            // response: 
            // console.log("action.response=====>", action.response);

            return (Object.assign({}, state, {
                status: action.status,
                response: action.response
            }))

        case LOGIN_FAILURE:
            return (Object.assign({}, state, {
                status: action.status,
                response: action.response
            }))

        /*******************************************************/

        case SOCIAL_LOGIN_REQUEST:
            return (Object.assign({}, state, {
                status: action.status
            }))

        case SOCIAL_LOGIN_SUCCESS:            
            return (Object.assign({}, state, {
                status: action.status,
                response: action.response
            }))

        case SOCIAL_LOGIN_FAILURE:
            return (Object.assign({}, state, {
                status: action.status,
                response: action.response
            }))

        default:
            return state

    }
}

export default loginReducer;
