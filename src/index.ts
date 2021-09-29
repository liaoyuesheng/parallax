import {isElement} from 'lodash-es/lodash'
import Events from '@liaoys/events'
import Dep from './observer/dep'
import Watcher from './observer/watcher'

export type ParallaxSelector = string | HTMLElement | NodeList | HTMLCollection | Array<HTMLElement> | ArrayLike<HTMLElement>

export interface ParallaxOptions {
  container?: ParallaxSelector,
  elements?: ParallaxSelector,
  elementAttrPrefix?: string,
  startTop?: number,
  endTop?: number,
  scrollElement?: ParallaxSelector,
  customProgress?: boolean,
  on?: {
    [eventName: string]: (...args: any[]) => void,
  }
}

const EVENT_NAMES = ['init', 'progress']

function checkEventName(eventName) {
  if (EVENT_NAMES.indexOf(eventName) === -1) {
    console.warn(`[parallax warn]: Event name must one of members of Array ${EVENT_NAMES}. received ${eventName}.`)
  }
}

function getElements(el: ParallaxSelector, container: HTMLElement | Document = document): Array<HTMLElement> {
  if (isElement(el)) {
    return [el as HTMLElement]
  }
  if (typeof el === 'string') {
    const els = container.querySelectorAll<HTMLElement>(el)
    return Array.from(els)
  }
  return Array.from(el as Array<HTMLElement>).filter((currentEl) => {
    return isElement(currentEl)
  })
}

function getElementTop(element: HTMLElement) {
  return element.getBoundingClientRect().top
}

function getProgress(value: number, startValue: number, endValue: number, minProgress?: number, maxProgress?: number) {
  let progress = (value - startValue) / (endValue - startValue)
  if (typeof minProgress === 'number') {
    progress = Math.max(minProgress, progress)
  }
  if (typeof maxProgress === 'number') {
    progress = Math.min(maxProgress, progress)
  }
  return progress
}

const defaults = {
  elements: '.parallax-element',
  elementAttrPrefix: 'parallax',
  customProgress: false,
  startTop: 0,
  endTop: -500,
  on: {},
}

class Parallax {
  container: HTMLElement
  options: ParallaxOptions
  progress: number
  private _dispatcher: Dep
  private _eventEmitter = new Events()

  constructor(options?: ParallaxOptions) {
    this.options = Object.assign({}, defaults, options)
    if (!this.options.customProgress) {
      const container = getElements(this.options.container, document)[0] as HTMLElement
      if (!container) {
        console.warn(`[parallax warn]: Cannot find element: "${this.options.container}". Check the option "container"`)
        return this
      }
      this.container = container
    }

    this._initElements()
    this._initEvents()

    if (!this.options.customProgress) {
      this._initScroll()
      this.update(null, true)
    }

    this._eventEmitter.emit('init', this)
  }

  private _initElements() {
    this._dispatcher = new Dep()
    const elements = getElements(this.options.elements, this.container)
    if (!elements.length) {
      console.warn(`[parallax warn]: Cannot find element: "${this.options.elements}". Check the option "elements"`)
      return this
    }
    const startProgressAttrName = this.options.elementAttrPrefix + '-start-progress'
    const endProgressAttrName = this.options.elementAttrPrefix + '-end-progress'
    const startStyleAttrName = this.options.elementAttrPrefix + '-start-style'
    const endStyleAttrName = this.options.elementAttrPrefix + '-end-style'
    elements.forEach((el) => {
      const startProgress = Number(el.getAttribute(startProgressAttrName) || 0)
      const endProgress = Number(el.getAttribute(endProgressAttrName) || 1)
      const startStyle = el.getAttribute(startStyleAttrName)
      const endStyle = el.getAttribute(endStyleAttrName)
      if (!startStyle || !endStyle) {
        return
      }
      this._dispatcher.addSub(new Watcher({
        el,
        startProgress,
        endProgress,
        startStyle,
        endStyle,
      }))
    })
  }

  private _initScroll(scrollElement?: ParallaxSelector) {
    const scrollEl = scrollElement ? getElements(scrollElement)[0] : document
    scrollEl.addEventListener('scroll', () => {
      this.update(null, true)
    })
  }

  private _initEvents() {
    EVENT_NAMES.forEach((eventName) => {
      if (Object.prototype.hasOwnProperty.call(this.options.on, eventName)) {
        this._eventEmitter.on(eventName, this.options.on[eventName])
      }
    })
  }

  private _updateProgress() {
    const containerTop = getElementTop(this.container)
    return this.progress = getProgress(containerTop, this.options.startTop, this.options.endTop, 0, 1)
  }

  update(progress?: number, triggerProgressEvent = false) {
    const oldProgress = this.progress
    if (typeof progress === 'number') {
      progress = Math.max(Math.min(progress, 1), 0)
      this.progress = progress
    } else {
      if (this.options.customProgress) {
        console.warn('[parallax warn]: In customProgress mode, the "progress" argument is required and must be of type number')
        return
      }
      this._updateProgress()
    }
    if (oldProgress === this.progress) {
      return
    }
    this._dispatcher.notify(this.progress)
    if (triggerProgressEvent) {
      this._eventEmitter.emit('progress', this, this.progress)
    }
  }

  on(eventName: string, listener: (parallax: Parallax, progress: number) => void) {
    checkEventName(eventName)
    this._eventEmitter.on(eventName, listener)
    return this
  }
}

export default Parallax
