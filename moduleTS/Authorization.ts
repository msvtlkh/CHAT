import { DOMelementsOfAuthorization, errors, DOMelementsOfChangeNameWindow } from "./DOM.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs";
import { MyMessages } from "./Message.js";


export class Authorization {
    currentUserName = ''
    socket: null | WebSocket = null;

    closeWindowGetCode() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = "none";
    }

    openWindowGetCode() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = "flex";
    }

    async getCode(event: Event) {
        event.preventDefault()

        const email = DOMelementsOfAuthorization.emailInput.value
        DOMelementsOfAuthorization.emailInput.value = ''

        if(!email) {
            alert(errors.emptyValue)
        } else {
            const response = await fetch('https://edu.strada.one/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    email: email
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })

            console.log(response)

            const data = await response.json()

            console.log(data)
        }
    }

    openCodeWindow() {
        DOMelementsOfAuthorization.authorizationWindow.style.display = 'none';
        DOMelementsOfAuthorization.enterCodeWindow.style.display = 'flex';
    }
    
    enterCode = async (event: Event) => {
        event.preventDefault()
        const token = DOMelementsOfAuthorization.inputCode.value
        DOMelementsOfAuthorization.inputCode.value = ''

        if(!token){
            alert(errors.emptyValue)
        } else {
            Cookies.set('token', token)
            DOMelementsOfAuthorization.enterCodeWindow.style.display = 'none';
            MyMessages.listMessages = []

            await this.getMyInfo()
            this.getMessageHistory(this.currentUserName)
            this.webSocketConnect();
        }  
    }

    webSocketConnect() {
        this.socket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`);

        this.socket.onopen = () => {
            console.log('connection opened!')
        }
    }

    async getMyInfo() {
        const response = await fetch('https://edu.strada.one/api/user/me', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

        
        const data = await response.json()
        this.currentUserName = data.name
    }
    
    async getMessageHistory(currentUserName:string) {
        const res = await fetch("https://edu.strada.one/api/messages/", {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
        })
        
        const { messages:data } = await res.json()

        console.log(data)

        for(let users of data) {
            if(users.user.name === currentUserName || users.user.name === MyMessages.partnerUserName) {
                MyMessages.listMessages.unshift({
                    name: users.user.name,
                    text: users.text
                })
            }
        }

        console.log(MyMessages.listMessages)
        MyMessages.renderMessages(MyMessages.listMessages)
    }

    closeCodeWindow() {
        DOMelementsOfAuthorization.enterCodeWindow.style.display = 'none'
    }

    openChangeNameWindow() {
        DOMelementsOfChangeNameWindow.changeNameWindow.style.display = 'flex'
    }

    closeChangeNameWindow() {
        DOMelementsOfChangeNameWindow.changeNameWindow.style.display = 'none'
    }

    async changeName(event: Event) {
        event.preventDefault()

        const name = DOMelementsOfChangeNameWindow.changeNameInput.value
        const token = Cookies.get('token')

        DOMelementsOfChangeNameWindow.changeNameInput.value = ''

        if(!name) {
            alert(errors.emptyValue)
        } else {
            const response = await fetch('https://edu.strada.one/api/user', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name
                })
            })

            const data = await response.json()
            Cookies.set('name', data.name) 

            console.log(data)
            console.log(response)
        }

    }
}

export const Auth = new Authorization();


