import Watcher from './watcher'

class Dep {
  subs: Watcher[] = []
  data: any;

  constructor(initialData?: any) {
    this.data = initialData
  }

  addSub(watcher: Watcher) {
    this.subs.push(watcher)
    if(this.data !== undefined) {
      watcher.update(this.data)
    }
  }

  notify(data: any) {
    this.subs.forEach((sub) => {
      sub.update(data)
    })
  }
}

export default Dep
