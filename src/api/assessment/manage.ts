/**
 *监理
 */
 import { SucMessage } from '@suc/ui'
import http from 'axios'
 import qs from 'qs'
 
// 根据时间/片区/养护对象 获取计划列表
 export const selectRepordList = (params: any) => {
    const url = "xckh/supervision/record/selectRepordList"
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
    })
}

// 根据 计划编码 获取问题列表
export const selectProblemList = (params: any) => {
    const url = "xckh/supervision/record/selectProblemList"
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
    })
}

// 获得监理核查状态， 监理待核查，监理已核查
export const getCheckStatus = (params: any) => {
    const url = "xckh/supervision/record/getCheckStatus"
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
    })
}
 