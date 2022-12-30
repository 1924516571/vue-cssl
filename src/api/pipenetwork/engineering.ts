import http from 'axios'
import { SucMessage } from "@suc/ui"
/**
 * 管网管理-工程管理
 */

//  创建工程
export const oncreate = (params: any, url: string): Promise<any> => {
    // const url = 'jnsw/gwgc/create'
    return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 删除工程
export const ondelete = (url: string): Promise<any> => {
    return http.delete(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 更新工程
export const onupdate = (params: any, url: string): Promise<any> => {
    // const url = 'jnsw/gwgc/update'
    return http.put(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 工程详情
export const getDetail = (url: string): Promise<any> => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 工程列表分页
export const getPage = (params: any, url: string): Promise<any> => {
    // const url = 'jnsw/gwgc/page'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 工程状态
export const getStatus = (): Promise<any> => {
    const url = 'jnsw/gwgc/status'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
