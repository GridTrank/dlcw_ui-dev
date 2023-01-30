/**
 * 页面间事件通信通道
 * 参考文档：https://uniapp.dcloud.io/collocation/frame/communication
 */

import { logInfo } from './log'

// 监听一个事件
export function onEvent(eventName, eventCallback) {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@event-channel', `onEvent [${eventName}]`)
  }
  uni.$on(eventName, eventCallback)
}
// 监听一个事件一次
export function onceEvent(eventName, eventCallback) {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@event-channel', `onceEvent [${eventName}]`)
  }
  uni.$once(eventName, eventCallback)
}
// 取消监听一个事件
export function offEvent(eventName, eventCallback) {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@event-channel', `offEvent [${eventName}]`)
  }
  uni.$off(eventName, eventCallback)
}
// 触发一个事件
export function emitEvent(eventName, args) {
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@event-channel', `emitEvent [${eventName}]`, args)
  }
  uni.$emit(eventName, args)
}
