interface WebElement extends HTMLElement {
    listeners: {
        type: string;
        event: Event;
    }[];
}
export declare class Component<P = void, S = void> extends HTMLElement {
    props: P;
    state: S;
    virtualDom: ChildNode[];
    constructor();
    connectedCallback(): void;
    init(): void;
    find(id: string): {
        element: WebElement;
        onClick(event: EventListener): void;
        onChange(event: EventListener): void;
    };
    render(): string;
    _render(): void;
    diff(previous: any, next: any): void;
}
export {};
