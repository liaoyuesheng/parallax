interface WatcherOptions {
  el: HTMLElement,
  startProgress: number,
  endProgress: number,
  startStyle: string,
  endStyle: string,
}

function getStyleNumbers(style: string): (string | number) [] {
  return style
    .match(/[$\d.]+/g)
    .filter(numStr => numStr)
    .map((numStr) => {
      return numStr[0] === '$' ? numStr.substring(1) : Number(numStr)
    })
}

function getStyleRenderer(options: WatcherOptions) {
  const {startProgress, endProgress, startStyle, endStyle,} = options
  const startStyleNumbers = getStyleNumbers(startStyle)
  const endStyleNumbers = getStyleNumbers(endStyle)

  return function (progress: number) {
    const resultStyleNumbers = startStyleNumbers
      .map((startNumber, index) => {
        let endNumber = endStyleNumbers[index]
        let round = false
        if (typeof startNumber === 'string') {
          startNumber = Number(startNumber)
          round = true
        }
        if (typeof endNumber === 'string') {
          endNumber = Number(endNumber)
          round = true
        }
        let resultNumber = (endNumber - startNumber) * ((progress - startProgress) / (endProgress - startProgress)) + startNumber
        const min =  startNumber < endNumber ? startNumber : endNumber
        const max = startNumber < endNumber ? endNumber : startNumber
        resultNumber = Math.max(Math.min(resultNumber, max), min)
        if (round) {
          resultNumber = Math.round(resultNumber)
          if (resultNumber < min) {
            resultNumber = Math.ceil(min)
          }
          if (resultNumber > max) {
            resultNumber = Math.floor(max)
          }
        }
        return resultNumber
      })
    let replaceIndex = 0
    return endStyle.replace(/[$\d.]+/g, () => {
      return String(resultStyleNumbers[replaceIndex++]).trim()
    })
  }
}

class Watcher {
  el: HTMLElement
  options: WatcherOptions
  styleRenderer: (progress: number) => string

  constructor(options: WatcherOptions) {
    this.options = options
    this.el = this.options.el
    this.styleRenderer = getStyleRenderer(options)
  }

  update(progress: number) {
    const style = this.styleRenderer(progress)
    style
      .split(';')
      .forEach((styleItem) => {
        if (!styleItem) {
          return
        }
        const cssKeyValue = styleItem
          .split(':')
          .map(s => s.trim())
        this.el.style[cssKeyValue[0]] = cssKeyValue[1]
      })
  }
}

export default Watcher
