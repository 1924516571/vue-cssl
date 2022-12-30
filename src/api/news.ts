import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"
/**
 * 新闻动态，简报，媒体（首页，数据中心-水务动态）
 */

//  增加新闻动态
export const oncreate = (params: any): Promise<any> => {
  const url = 'jnsw/news/add'
  return http.post(url, params).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 删除新闻数据
export const ondelete = (id: string): Promise<any> => {
  const url = 'jnsw/news/delete?id=' + id
  return http.delete(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 下载新闻附件
export const ondownload = (url: string): any => {
  return http.get(url, { responseType: 'blob' }).then((res: any) => {
    if (res.status == 200 && res.data) {
      let disposition = res.headers['content-disposition']
      let fileName = decodeURI(
        disposition.substring(
          disposition.indexOf('filename=') + 9,
          disposition.length
        )
      )
      let blob = new Blob([res.data], { type: 'application/octet-stream' })
      let link = URL.createObjectURL(blob)
      let alink = document.createElement('a')
      alink.href = link
      alink.download = fileName
      alink.click()
      alink.remove()
    }
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 新增所需的uuid
export const getId = (): any => {
  const url = 'jnsw/news/getUuid'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 新闻信息分页
export const getPage = (params: any): Promise<any> => {
  const url = 'jnsw/news/page'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 更新新闻数据
export const onupdate = (params: any): Promise<any> => {
  const url = 'jnsw/news/update'
  return http.put(url, params).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 上传相关附件
export const onupload = (params: any, data: any): any => {
  const url = 'jnsw/news/upload'
  return http({
    url: url,
    method: 'post',
    params: params,
    data: data,
    transformRequest: [function (data) {
      return data;
    }],
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false })
    },
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 上传封面
export const onupload1 = (params: any, data: any): any => {
  const url = 'jnsw/news/uploadImg'
  return http({
    url: url,
    method: 'post',
    params: params,
    data: data,
    transformRequest: [function (data) {
      return data;
    }],
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false })
    },
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
