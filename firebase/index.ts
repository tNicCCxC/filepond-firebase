import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAO5FD5MNVpnD2FTiZ_p1QkD6zH_UtAd4k",
    authDomain: "test-ccxc.firebaseapp.com",
    projectId: "test-ccxc",
    storageBucket: "test-ccxc.appspot.com",
    messagingSenderId: "119419853062",
    appId: "1:119419853062:web:0059581455b79904c5a687"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {storage , firebase as default};
