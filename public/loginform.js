import { e, t } from "e";

const emailLabel = e("label", { for: "email" }, t`email`);
const emailInput = e("input", { id: "email", type: "text" });
const passLabel = e("label", { for: "pass" }, t`pass`);
const passInput = e("input", { id: "pass", type: "password" });
const loginButton = e("button", {}, t`login`);
const signUpButton = e("button", {}, t`sign up`);

let signupActions = [];
let loginActions = [];

export const loginform = e(
  "div",
  {},
  e("h1", {}, t`new user`),
  e("p", {}, emailLabel, emailInput),
  e("p", {}, passLabel, passInput),
  loginButton,
  signUpButton
);

export function onLogin(action) {
  loginActions.push(action);
}

export function onSignup(action) {
  signupActions.push(action);
}

loginButton.addEventListener("click", (e) => {
  const email = emailInput.value;
  const pass = passInput.value;
  loginActions.forEach((action) => action(email, pass));
});

signUpButton.addEventListener("click", (e) => {
  const email = emailInput.value;
  const pass = passInput.value;
  signupActions.forEach((action) => action(email, pass));
});
