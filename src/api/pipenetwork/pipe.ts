import http from 'axios'
import { SucMessage } from "@suc/ui"

// 查询
export const getPipe = (url: any, params: any): Promise<any> => {
    return http.get(url, { params: params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

export const postPipe = (url: any, params: any): Promise<any> => {
    return http.post(url, null, { params: params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}