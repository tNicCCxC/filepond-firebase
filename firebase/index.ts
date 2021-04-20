import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAO5FD5MNVpnD2FTiZ_p1QkD6zH_UtAd4k",
    authDomain: "test-ccxc.firebaseapp.com",
    databaseURL: "https://test-ccxc-default-rtdb.firebaseio.com",
    projectId: "test-ccxc",
    storageBucket: "test-ccxc.appspot.com",
    messagingSenderId: "119419853062",
    appId: "1:119419853062:web:0059581455b79904c5a687"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app();
}

const storage = firebase.storage();
const database = firebase.database();
export {storage , database , firebase as default};
