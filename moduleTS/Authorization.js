var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DOMelementsOfAuthorization, errors, DOMelementsOfChangeNameWindow } from "./DOM.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
import { MyMessages } from "./Message.js";
export class Authorization {
    constructor() {
        this.currentUserName = '';
        this.socket = null;
        this.enterCode = (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const token = DOMelementsOfAuthorization.inputCode.value;
            DOMelementsOfAuthorization.inputCode.value = '';
            if (!token) {
                alert(errors.emptyValue);
            }
            else {
                Cookies.set('token', token);
                DOMelementsOfAuthorization.enterCodeWindow.style.display = 'none';
                MyMessages.listMessages = [];
                yield this.getMyInfo();
                this.getMessageHistory(this.currentUserName);
                this.webSocketConnect();
            }
        });
    }
    closeWindowGetCode() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = "none";
    }
    openWindowGetCode() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = "flex";
    }
    getCode(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const email = DOMelementsOfAuthorization.emailInput.value;
            DOMelementsOfAuthorization.emailInput.value = '';
            if (!email) {
                alert(errors.emptyValue);
            }
            else {
                const response = yield fetch('https://edu.strada.one/api/user', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                });
                console.log(response);
                const data = yield response.json();
                console.log(data);
            }
        });
    }
    openCodeWindow() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = 'none';
        DOMelementsOfAuthorization.enterCodeWindow.style.display = 'flex';
    }
    webSocketConnect() {
        this.socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`);
        this.socket.onopen = () => {
            console.log('connection opened!');
        };
    }
    getMyInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://edu.strada.one/api/user/me', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            const data = yield response.json();
            this.currentUserName = data.name;
        });
    }
    getMessageHistory(currentUserName) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("https://edu.strada.one/api/messages/", {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
            });
            const { messages: data } = yield res.json();
            console.log(data);
            for (let users of data) {
                if (users.user.name === currentUserName || users.user.name === MyMessages.partnerUserName) {
                    MyMessages.listMessages.unshift({
                        name: users.user.name,
                        text: users.text
                    });
                }
            }
            console.log(MyMessages.listMessages);
            MyMessages.renderMessages(MyMessages.listMessages);
        });
    }
    closeCodeWindow() {
        DOMelementsOfAuthorization.enterCodeWindow.style.display = 'none';
    }
    openChangeNameWindow() {
        DOMelementsOfChangeNameWindow.changeNameWindow.style.display = 'flex';
    }
    closeChangeNameWindow() {
        DOMelementsOfChangeNameWindow.changeNameWindow.style.display = 'none';
    }
    changeName(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const name = DOMelementsOfChangeNameWindow.changeNameInput.value;
            const token = Cookies.get('token');
            DOMelementsOfChangeNameWindow.changeNameInput.value = '';
            if (!name) {
                alert(errors.emptyValue);
            }
            else {
                const response = yield fetch('https://edu.strada.one/api/user', {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: name
                    })
                });
                const data = yield response.json();
                Cookies.set('name', data.name);
                console.log(data);
                console.log(response);
            }
        });
    }
}
export const Auth = new Authorization();
