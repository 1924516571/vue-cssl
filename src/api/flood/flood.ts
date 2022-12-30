import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 内涝管理-监测,监控|防汛管理(导出为floodData)
 */
export const getHistoryLine = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/getCurrentTrenData'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
export const getAlarmNum = (): Promise<any> => {
  const url = 'jnsw/manhole/queryNumOfWarnForNl'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 查询
export const getFlood = (url: string, params: any): Promise<any> => {
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
//查询
export const getFloodInfo = (url: string, params: any): Promise<any> => {
  return http({
    url: url,
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//查询泵机
export const getPumpData = (params: any): Promise<any> => {
  const url = 'jnsw/floodsituation/pump/realall';
  return http({
    url: url,
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
//查询污水泵站
export const getWsPumpData = (url: any, params: any): Promise<any> => {
  return http({
    url: url,
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

/**
 * 故障报修
 */
export const getFaultList = (params: any): Promise<any> => {
  const url = 'jnsw/newtask/listAllFault';
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

