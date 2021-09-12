interface WatcherOptions {
    el: HTMLElement;
    startProgress: number;
    endProgress: number;
    startStyle: string;
    endStyle: string;
}
declare class Watcher {
    el: HTMLElement;
    options: WatcherOptions;
    styleRenderer: (progress: number) => string;
    constructor(options: WatcherOptions);
    update(progress: number): void;
}
export default Watcher;
