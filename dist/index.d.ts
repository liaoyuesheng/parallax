export declare type ParallaxSelector = string | HTMLElement | Array<HTMLElement> | ArrayLike<HTMLElement>;
export interface ParallaxOptions {
    container?: ParallaxSelector;
    elements?: ParallaxSelector;
    elementAttrPrefix?: string;
    startTop?: number;
    endTop?: number;
    scrollElement?: ParallaxSelector;
    customProgress?: boolean;
    on: {
        [eventName: string]: (...args: any[]) => void;
    };
}
declare class Parallax {
    container: HTMLElement;
    options: ParallaxOptions;
    progress: number;
    private _dispatcher;
    private _eventEmitter;
    constructor(options?: ParallaxOptions);
    private _initElements;
    private _initScroll;
    private _initEvents;
    private _updateProgress;
    update(progress?: number, triggerProgressEvent?: boolean): void;
    on(eventName: string, listener: (parallax: Parallax, progress: number) => void): this;
}
export default Parallax;
