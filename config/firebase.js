import * as firebase from 'firebase';
var Firebase = "";

const firebaseConfig = {
    apiKey: "AIzaSyD_ucvCCPGSOdhMbew-UE4uyaFx56aklvg",
    authDomain: "cannago-23721.firebaseapp.com",
    databaseURL: "https://cannago-23721-default-rtdb.firebaseio.com",
    projectId: "cannago-23721",
    storageBucket: "cannago-23721.appspot.com",
    messagingSenderId: "705433366225",
    appId: "1:705433366225:web:8c09662f7e4fe3e160dff0",
    measurementId: "G-3SPXELQ1GQ"
};
if (!firebase.apps.length) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;