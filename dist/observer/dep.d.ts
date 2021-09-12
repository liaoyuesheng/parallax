import Watcher from './watcher';
declare class Dep {
    subs: Watcher[];
    data: any;
    constructor(initialData?: any);
    addSub(watcher: Watcher): void;
    notify(data: any): void;
}
export default Dep;
