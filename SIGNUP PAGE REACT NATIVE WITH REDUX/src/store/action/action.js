
import ActionTypes from '../constant/constant';
import history from '../../History';
import firebase from 'firebase';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory()



// var config = {
//     apiKey: "AIzaSyDqKEhMJ-_mztRx_imbYs9gwJfJ3aFCgzg",
//     authDomain: "example-c1bd0.firebaseapp.com",
//     databaseURL: "https://example-c1bd0.firebaseio.com",
//     projectId: "example-c1bd0",
//     storageBucket: "example-c1bd0.appspot.com",
//     messagingSenderId: "976242645286"
// };
// firebase.initializeApp(config);




export function signupAction(user) {
    return dispatch => {
        dispatch({ type: ActionTypes.USERNAME, payload: messages })

    }
}





