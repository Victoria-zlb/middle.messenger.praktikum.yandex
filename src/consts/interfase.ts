export interface IFormNode {
    elements: [{
        name: string,
        value: string
    }]
}

export interface IElement extends Element {
    type: "name" | "email" | "login" | "password" | "tel" | "text", 
    value: string,
    name: string
}
