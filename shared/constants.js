import {
	envNameMap
} from './env'

export const APP_NAME = 'DOLA BOX'
export const ENV_NAME = envNameMap[process.env.NODE_ENV] // 当前环境
export const DIALOG_DURATION = 3000 // dialog 持续时间

// export const SERVICE_URL_DEV = 'https://api.front.duolachaowan.com/dlcw-front-api' // H5开发环境接口
// export const SERVICE_URL = 'https://api.front.duolachaowan.com/dlcw-front-api' // 正式环境接口

//不是h5
// #ifndef  H5
export const SERVICE_URL_DEV = 'https://dev.api.front.duolachaowan.com/dlcw-front-api' // 开发环境接口
export const SERVICE_URL = 'https://api.front.duolachaowan.com/dlcw-front-api' // 正式环境接口
// #endif

//h5环境
// #ifdef H5
export const SERVICE_URL_DEV = 'http://localhost:8083/dlcw-front-api' // H5开发环境接口
export const SERVICE_URL = 'http://localhost:8083/dlcw-front-api' // 正式环境接口
// #endif

export const STATIC_URL = 'https://static.duolachaowan.com'
