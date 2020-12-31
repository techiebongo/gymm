import { all } from 'redux-saga/effects';
import { login_saga_request, social_login_request } from "./login_saga"


export default function* rootSaga() {
    yield all([
        login_saga_request(),
        social_login_request()
    ])
}
