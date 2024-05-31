import { Auth } from "./moduleTS/Authorization.js";
import { DOMelementsOfAuthorization, DOMelementsOfChangeNameWindow, DOMElementsOfMessage } from "./moduleTS/DOM.js";
import { MyMessages } from "./moduleTS/Message.js";

DOMelementsOfAuthorization.closeWindowBtn?.addEventListener('click', Auth.closeWindowGetCode)
DOMelementsOfAuthorization.btnLogIn?.addEventListener('click', Auth.openWindowGetCode)
DOMelementsOfAuthorization.form?.addEventListener('submit', Auth.getCode)

DOMelementsOfAuthorization.btnEneterCode?.addEventListener('click', Auth.openCodeWindow)
DOMelementsOfAuthorization.closeEnterCodeWindowBtn?.addEventListener('click', Auth.closeCodeWindow)
DOMelementsOfAuthorization.enterCodeForm?.addEventListener('submit', Auth.enterCode)

DOMelementsOfChangeNameWindow.changeNameWindowOpenBtn?.addEventListener('click', Auth.openChangeNameWindow)
DOMelementsOfChangeNameWindow.changeNameWindowCloseBtn?.addEventListener('click', Auth.closeChangeNameWindow)
DOMelementsOfChangeNameWindow.changeNameForm?.addEventListener('submit', Auth.changeName)

DOMElementsOfMessage.formMessage.addEventListener('submit', MyMessages.sendMessages)


// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc2hhLmthdmVyaW5hLjcyQG1haWwucnUiLCJpYXQiOjE3MTY0NjgxNjIsImV4cCI6MTcyMDA2NDU2Mn0.RKsxY_ggWPnLvOvPSovnFMXtvRR4aPjFDjplNVE8bvg'
// const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);

// socket.onopen = () => {
//     // console.log("connetcion est")
//     socket.send(JSON.stringify({ text: 'тестовый тест' }));
// }

// // console.log(socket)

// socket.onmessage = function(event) { console.log(event.data) };
