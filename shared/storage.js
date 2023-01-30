/**
 * 路由与页面跳转
 * 简化传参或增强实现，参数基本与标准 API 一致。若存在差异，会在当前方法中说明。
 * 参考文档：https://uniapp.dcloud.io/api/storage/storage?id=setstorage
 */

import { logInfo } from './log'
import { ENV_NAME } from './constants'

// 通过添加后缀来隔离不通环境的本地缓存
const addEnvSuffix = function(value) {
  return ENV_NAME ? `${value}--${ENV_NAME}` : value
}

/**
 *
 * @param {String} key 本地缓存中指定的 key
 * @param {Any} value 需要存储的内容
 */
export function setStorage(key, value) {
  key = addEnvSuffix(key)
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@storage', 'setStorageSync', key)
  }
  uni.setStorageSync(key, value)
}

/**
 * 获取本地缓存
 * @param {String} key 本地缓存中指定的 key
 * @param {Boolean} [remove=false] 是否立即移除指定 key 的本地缓存内容 默认为 false
 */
export function getStorage(key, remove = false) {
  key = addEnvSuffix(key)
  const value = uni.getStorageSync(key)
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@storage', 'getStorageSync', key)
  }
  if (remove) {
    uni.removeStorageSync(key)
  }
  return value
}

/**
 * 从本地缓存中移除指定 key
 * @param {String} key 本地缓存中指定的 key
 */
export function removeStorage(key) {
  key = addEnvSuffix(key)
  if (process.env.NODE_ENV !== 'production') {
    logInfo('@storage', 'removeStorageSync', key)
  }
  uni.removeStorageSync(key)
}
