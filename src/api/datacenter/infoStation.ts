import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 泵站
 */
// 查
export const onPage = (params: any, url: string): Promise<any> => {
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 创建/新增（之前是可以附件的。）
export const onCreate2 = (params: any, data: any, url: string): any => {
  return http({
    method: 'post',
    url: url,
    data: data,
    params: params,
    transformRequest: [
      function (data) {
        return data
      }
    ],
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 增(params为body)
export const onCreate = (params: any, url: string): Promise<any> => {
  return http.post(url, params).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 片区
export const getDepartment = (): Promise<any> => {
  const url = 'jnsw/base/bmList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 片长
export const getTitleex = (): Promise<any> => {
  const url = 'jnsw/director/pzList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 河道
export const getRvnm = (): Promise<any> => {
  const url = 'jnsw/bz/riverList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 是否信息化建设
export const getSfxxh = (): Promise<any> => {
  const url = 'jnsw/bz/informatizationList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 是否双电源
export const getSfsdy = (): Promise<any> => {
  const url = 'jnsw/bz/dualPowerSupplyList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 二级站类
export const getEjzl = (): Promise<any> => {
  const url = 'jnsw/bz/pumpingStationType'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 泵站列表(下拉专用 只有stcd和stnm)
export const getStcd = (): Promise<any> => {
  const url = 'jnsw/bj/pumpingStationList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// get信息列表
export const getInfo = (params: any, url: string): Promise<any> => {
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 改(params为body)
export const onUpdate = (params: any, url: string): Promise<any> => {
  return http.put(url, params).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//改(params body)
export const update = (params: any, url: string): Promise<any> => {
  return http.put(url, null, { data: params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 改'application/json'.
export const update2 = (params: any, url: string): Promise<any> => {
  return http({
    url: url,
    method: "put",
    data: params,
    headers: {
      "Content-Type": 'application/json',
    }
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 删
export const onDelete = (url: string): Promise<any> => {
  return http.delete(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}