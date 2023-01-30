import { logInfo } from './log'

export function setGlobalData(key, value, context) {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@globalData', 'setGlobalData', key, value)
  }
  const app = context || getApp()
  app.globalData[key] = value
}

export function getGlobalData(key, context) {
  const app = context || getApp()
  const value = app.globalData[key]
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@globalData', 'getGlobalData', key, value)
  }
  return value
}
