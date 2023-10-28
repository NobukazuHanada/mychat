import { app } from "app";
import { e, t } from "e";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
  signOut,
} from "firebase-auth";
import { loginform, onLogin, onSignup } from "loginform";

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

const waithUI = e("h1", {}, t`wait`);
const signoutButton = e("button", {}, t`sign out`);
const loginedUI = e("div", {}, e("h1", {}, t`logined!!!`), signoutButton);

onLogin((email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      update("logined");
    })
    .catch((error) => {});

  update("wait");
});

onSignup((email, pass) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      update("logined");
    })
    .catch((error) => {});

  update("wait");
});

signoutButton.addEventListener("click", (e) => {
  signOut(auth);
});

let ui;
let _useLocalStorage = false;

export function useLocalStorage() {
  _useLocalStorage = true;
}

export function update(loginStatus) {
  if (_useLocalStorage) {
    loginStatus = loginStatus ?? localStorage.getItem("status") ?? "not login";
  } else {
    loginStatus = loginStatus ?? "not login";
  }

  if (ui) {
    document.body.removeChild(ui);
  }
  if (loginStatus === "not login") {
    ui = loginform;
  } else if (loginStatus === "wait") {
    ui = waithUI;
  } else if (loginStatus === "logined") {
    ui = loginedUI;
  }
  document.body.appendChild(ui);
  if (_useLocalStorage) {
    localStorage.setItem("status", loginStatus);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    update("logined");
  } else {
    update("not login");
  }
});
