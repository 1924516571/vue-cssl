import http from 'axios'
import { SucMessage } from "@suc/ui"
/**
 * 系统管理
 */

export const getRecord = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//  操作类型
export const getType = (): Promise<any> => {
    const url = 'jnsw/log/operateType'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取操作数量
export const getControlNum = (): any => {
    const url = "jnsw/log/operateAnalysis";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}