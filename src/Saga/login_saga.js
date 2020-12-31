import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SOCIAL_LOGIN_REQUEST, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAILURE } from "./../Action/type";
import { put, takeLatest } from 'redux-saga/effects';
import { postRequest } from "../ApiRequest"

function* getStaticResponse(data) {
    console.log("login api called 2", data)

    const header = {
        Contenttype: 'application/json; charset=utf-8',
    }
    try {
        const jsonData = yield postRequest("login", data.object, header)
        console.log("jsonData===>", jsonData);
        yield put({ type: LOGIN_SUCCESS, response: jsonData, status: LOGIN_SUCCESS })

    } catch (error) {
        console.log("jsonData===>", error);
        yield put({ type: LOGIN_FAILURE, response: error, status: LOGIN_FAILURE })
    }

}

export function* login_saga_request() {
    yield takeLatest(LOGIN_REQUEST, getStaticResponse)
}


function* get_social_login_api(data) {
    console.log("social login for google===>", data)

    const header = {
        Contenttype: 'application/json; charset=utf-8',
    }
    try {
        const jsonData = yield postRequest("social-login", data.object, header)
        console.log("jsonData===>", jsonData);
        yield put({ type: SOCIAL_LOGIN_SUCCESS, response: jsonData, status: SOCIAL_LOGIN_SUCCESS })

    } catch (error) {
        console.log("jsonData===>", error);
        yield put({ type: SOCIAL_LOGIN_FAILURE, response: error, status: SOCIAL_LOGIN_FAILURE })
    }

}

export function* social_login_request() {
    // alert("Google")
    yield takeLatest(SOCIAL_LOGIN_REQUEST, get_social_login_api)
}



