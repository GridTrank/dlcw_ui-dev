import { SERVICE_URL, SERVICE_URL_DEV } from './constants'

let serviceUrl = SERVICE_URL
if (process.env.NODE_ENV !== 'production') {
  serviceUrl = SERVICE_URL_DEV
}

export { serviceUrl }
