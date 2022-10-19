
export type OnClickOutsideCallback = ((e: MouseEvent) => void)|null
export type OnClickOutsideCallbackRefObject = React.MutableRefObject<OnClickOutsideCallback>

function onClickOutside(element: HTMLElement, callback: () => void): (e: MouseEvent) => void{
    const event = (e: MouseEvent) => {
        if(element && !element.contains(e.target as HTMLElement)) {
            callback();
            document.removeEventListener('click', event, true)
        }
    }
    document.addEventListener('click', event, true)
    return event
}

export default onClickOutside