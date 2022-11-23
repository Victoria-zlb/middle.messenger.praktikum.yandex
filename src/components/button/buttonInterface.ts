export default interface ButtonInterfaceProps {
    value: string,
    id: string | number,
    events: {
        click: () => void
    }
};
