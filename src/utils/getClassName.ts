export const getClassName = (arrStyles: any, element: string) => {
    const content: string = arrStyles[`${element}`];
    return content;
}