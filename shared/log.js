import { APP_NAME } from './constants'
import { isStr } from './util'

// 开发工具中使用 css 来区分不同日志的样式
function createLogStyle(theme) {
  let style = `padding: 5px 0;border-radius: 5px;color: ${theme.color};`
  if (theme.backgroundColor) {
    style += `background-color: ${theme.backgroundColor};`
  }
  return style
}

// 添加一段信息用于标记是应用输出的日志
function createLogPrefix(type, moduleName) {
  let message = `[${APP_NAME}][${type.name}]`
  if (moduleName) {
    message += `[${moduleName}]`
  }
  return message
}

const logTypes = {
  LOG: {
    name: 'LOG',
    theme: {}
  },
  DEBUG: {
    name: 'DEBUG',
    theme: {
      color: '#ff976a'
    }
  },
  INFO: {
    name: 'INFO',
    theme: {
      color: '#1989fa'
    }
  },
  WARN: {
    name: 'WARN',
    theme: {
      color: '#ff976a',
      backgroundColor: '#ffeae1'
    }
  },
  ERROR: {
    name: 'ERROR',
    theme: {
      color: '#ee0a24',
      backgroundColor: '#fcced3'
    }
  }
}

// 打印日志
function _printLog(type, messages) {
// 确保不会有问题，生产环境下不执行。
  if (process.env.NODE_ENV === 'production') {
    return
  }
  const title = isStr(messages[0]) ? messages[0] : ''
  let moduleName = ''
  if (title && title.match(/^@[a-z]+/i)) {
    moduleName = messages.shift().replace('@', '')
  }
  messages.unshift(createLogPrefix(type, moduleName))
  _printLogInDevTools(messages, type.theme)
}

// 在开发工具中输出日志
function _printLogInDevTools(messages, theme) {
  const title = messages[0]
  messages[0] = `%c${title}`
  messages.splice(1, 0, createLogStyle(theme))

  console.log(...messages)
}

// 输出调试信息；指出细粒度信息事件对调试应用程序是非常有帮助的。
export function logDebug(...rest) {
  _printLog(logTypes.DEBUG, rest)
}

// 输出提示信息；消息在粗粒度级别上突出强调应用程序的运行过程。
export function logInfo(...rest) {
  _printLog(logTypes.INFO, rest)
}

// 输出警告信息；表明会出现潜在错误的情形。
export function logWarn(...rest) {
  _printLog(logTypes.WARN, rest)
}

// 输出错误信息
export function logError(...rest) {
  _printLog(logTypes.ERROR, rest)
}
