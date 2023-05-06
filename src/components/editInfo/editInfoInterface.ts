export interface EditInfoInterface {
    name: string,
    content: string,
    valueName: string,
    events?: {
        click: () => void
    },
}
