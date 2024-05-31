export const DOMelementsOfAuthorization = {
    authorizationWindow: document.querySelector('#authorizationWindow') as HTMLDivElement,
    form: document.querySelector('#formEmail') as HTMLFormElement,
    closeWindowBtn: document.querySelector('#closeAuthorization'),
    btnLogIn: document.querySelector('#logIn'),
    emailInput: document.querySelector('#emailInput') as HTMLInputElement,

    enterCodeWindow: document.querySelector('#enterCodeWindow') as HTMLDivElement,
    btnEneterCode: document.querySelector('#enterCodeBtn'),
    enterCodeForm: document.querySelector('#enterCodeForm'),
    closeEnterCodeWindowBtn: document.querySelector('#closeEnterCodeWindowBtn'),
    inputCode: document.querySelector('#inputCode') as HTMLInputElement
}

export const DOMelementsOfChangeNameWindow = {
    changeNameWindow: document.querySelector('#changeNameWindow') as HTMLDivElement,
    changeNameWindowCloseBtn: document.querySelector('#closeChangeNameWindow'),
    changeNameWindowOpenBtn: document.querySelector('#changeNameWindowOpenBtn'),
    changeNameForm: document.querySelector('#changeNameForm') as HTMLFormElement,
    changeNameInput: document.querySelector('#changeNameInput') as HTMLInputElement
}

export const DOMElementsOfMessage = {
    myMessageTemplate: document.querySelector('#myMessageTemplate') as HTMLTemplateElement,
    formMessage: document.querySelector('#formMessage') as HTMLFormElement,
    inputMessage: document.querySelector('#inputMessage') as HTMLInputElement,
    sendMessageBtn: document.querySelector('#sendMessageBtn'),
    messageContainer: document.querySelector('#messageContainer') as HTMLDivElement,
}

export const errors = {
    emptyValue: 'Пустое поле! Введите значение.'
}


