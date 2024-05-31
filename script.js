var _a, _b, _c, _d, _e, _f, _g, _h, _j;
import { Auth } from "./moduleTS/Authorization.js";
import { DOMelementsOfAuthorization, DOMelementsOfChangeNameWindow, DOMElementsOfMessage } from "./moduleTS/DOM.js";
import { MyMessages } from "./moduleTS/Message.js";
(_a = DOMelementsOfAuthorization.closeWindowBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', Auth.closeWindowGetCode);
(_b = DOMelementsOfAuthorization.btnLogIn) === null || _b === void 0 ? void 0 : _b.addEventListener('click', Auth.openWindowGetCode);
(_c = DOMelementsOfAuthorization.form) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', Auth.getCode);
(_d = DOMelementsOfAuthorization.btnEneterCode) === null || _d === void 0 ? void 0 : _d.addEventListener('click', Auth.openCodeWindow);
(_e = DOMelementsOfAuthorization.closeEnterCodeWindowBtn) === null || _e === void 0 ? void 0 : _e.addEventListener('click', Auth.closeCodeWindow);
(_f = DOMelementsOfAuthorization.enterCodeForm) === null || _f === void 0 ? void 0 : _f.addEventListener('submit', Auth.enterCode);
(_g = DOMelementsOfChangeNameWindow.changeNameWindowOpenBtn) === null || _g === void 0 ? void 0 : _g.addEventListener('click', Auth.openChangeNameWindow);
(_h = DOMelementsOfChangeNameWindow.changeNameWindowCloseBtn) === null || _h === void 0 ? void 0 : _h.addEventListener('click', Auth.closeChangeNameWindow);
(_j = DOMelementsOfChangeNameWindow.changeNameForm) === null || _j === void 0 ? void 0 : _j.addEventListener('submit', Auth.changeName);
DOMElementsOfMessage.formMessage.addEventListener('submit', MyMessages.sendMessages);
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc2hhLmthdmVyaW5hLjcyQG1haWwucnUiLCJpYXQiOjE3MTY0NjgxNjIsImV4cCI6MTcyMDA2NDU2Mn0.RKsxY_ggWPnLvOvPSovnFMXtvRR4aPjFDjplNVE8bvg'
// const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
// socket.onopen = () => {
//     // console.log("connetcion est")
//     socket.send(JSON.stringify({ text: 'тестовый тест' }));
// }
// // console.log(socket)
// socket.onmessage = function(event) { console.log(event.data) };
