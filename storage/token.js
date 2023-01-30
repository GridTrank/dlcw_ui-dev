import { setStorage, getStorage, removeStorage } from '@/shared'

const TOKEN = 'TOKEN'

export function setTokenStorage(value) {
  setStorage(TOKEN, value)
}

export function getTokenStorage(clear = false) {
  return getStorage(TOKEN, clear)
}

export function removeTokenStorage() {
  removeStorage(TOKEN)
}
