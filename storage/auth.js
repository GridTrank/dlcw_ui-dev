import { setGlobalData, getGlobalData } from '@/shared'

const AUTH_CALLBACK = 'AUTH_CALLBACK'

export function setAuthCallback(callback) {
  setGlobalData(AUTH_CALLBACK, callback)
}

export function consumeAuthCallback() {
  const callback = getGlobalData(AUTH_CALLBACK)
  callback && callback()
  setGlobalData(AUTH_CALLBACK, null)
}

export function removeAuthCallback() {
  setGlobalData(AUTH_CALLBACK, null)
}
