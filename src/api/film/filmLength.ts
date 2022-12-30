import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 片长管理
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
  return http.post(url, params, {
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }).then((res: any) => res.data).catch((err: any) => {
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

// 删
export const onDelete = (url: string): Promise<any> => {
  return http.delete(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 获取巡查简报信息
export const getInspectInfo = (params: any): any => {
  return http.post("hjzl/basedata/inspectReport?time=" + params.time + "&type=" + params.type).then((res: any) => res.data).catch((err: any) => console.log)
}

// 根据id获取巡查照片
export const getInspectPhoto = (inspectId: string): any => {
  return http.get("jnxc/rest/app/inspect/getInspectPhoto?inspectId=" + inspectId).then((res: any) => res.data).catch((err: any) => console.log)
}