import { DOMElementsOfMessage, errors } from "./DOM.js";
import Cookies from "../node_modules/js-cookie/dist/js.cookie.mjs"
import { Auth } from "./Authorization.js";

export class Messages {
    listMessages:Array<any> = [];
    partnerUserName = 'daniil'
    
    sendMessages = (event: Event) => {
        event.preventDefault()
        
        if(DOMElementsOfMessage.inputMessage.value === '') {
            alert(errors.emptyValue)
        } else {
            Auth.socket.send(JSON.stringify({ text: `${DOMElementsOfMessage.inputMessage.value}` }));

            this.listMessages.push({
                name: Auth.currentUserName, 
                text: DOMElementsOfMessage.inputMessage.value
            })

            this.renderMessages(this.listMessages)
        }

        DOMElementsOfMessage.inputMessage.value = ''
    }

    renderMessages(currentMessages:Array<any>) {
        DOMElementsOfMessage.messageContainer.innerHTML = ''

        for(let i = 0; i < currentMessages.length; i++) {
            this.createElement(currentMessages[i].text, currentMessages[i].name)
        }
    }

    createElement(newMessage:string, name:string) {
        const isMyMessage = Auth.currentUserName === name;

        const message = DOMElementsOfMessage.myMessageTemplate.content.cloneNode(true) as HTMLDivElement
        const messageDiv = message.querySelector('div')!;

        messageDiv.textContent = `${name}: ${newMessage}`;
        messageDiv.className = `${isMyMessage ? "message" : "message message--partner"}`

        DOMElementsOfMessage.messageContainer.appendChild(message) 
    }
}

export const MyMessages = new Messages()
