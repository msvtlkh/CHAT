import { DOMElementsOfMessage, errors } from "./DOM.js";
import { Auth } from "./Authorization.js";
export class Messages {
    constructor() {
        this.listMessages = [];
        this.partnerUserName = 'daniil';
        // async getMyInfo(event: Event) {
        //     event.preventDefault()
        //     const response = await fetch('https://edu.strada.one/api/user/me', {
        //         headers: {
        //             Authorization: `Bearer ${Cookies.get('token')}`
        //         }
        //     })
        //     const data = await response.json()
        //     console.log(data)
        // }
        this.sendMessages = (event) => {
            event.preventDefault();
            if (DOMElementsOfMessage.inputMessage.value === '') {
                alert(errors.emptyValue);
            }
            else {
                Auth.socket.send(JSON.stringify({ text: `${DOMElementsOfMessage.inputMessage.value}` }));
                this.listMessages.push({
                    name: Auth.currentUserName,
                    text: DOMElementsOfMessage.inputMessage.value
                });
                this.renderMessages(this.listMessages);
            }
            DOMElementsOfMessage.inputMessage.value = '';
        };
    }
    renderMessages(currentMessages) {
        DOMElementsOfMessage.messageContainer.innerHTML = '';
        for (let i = 0; i < currentMessages.length; i++) {
            this.createElement(currentMessages[i].text, currentMessages[i].name);
        }
    }
    createElement(newMessage, name) {
        const isMyMessage = Auth.currentUserName === name;
        const message = DOMElementsOfMessage.myMessageTemplate.content.cloneNode(true);
        const messageDiv = message.querySelector('div');
        messageDiv.textContent = `${name}: ${newMessage}`;
        messageDiv.className = `${isMyMessage ? "message" : "message message--partner"}`;
        DOMElementsOfMessage.messageContainer.appendChild(message);
    }
}
export const MyMessages = new Messages();
