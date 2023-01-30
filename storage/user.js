import { setStorage, getStorage, removeStorage } from '@/shared'

const USER = 'USER'

export function setUserStorage(value) {
  setStorage(USER, value)
  setStorage('isLogged', true)
}

export function getUserStorage(clear = false) {
  return getStorage(USER, clear)
}

export function removeUserStorage() {
  removeStorage(USER)
  setStorage('isLogged', false)
}
