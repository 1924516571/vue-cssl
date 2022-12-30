import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"
/**
 * 预警信息
 */
export const getAlarmInfo = (params: any, url: string): Promise<any> => {
    // const url = 'jnsw/pipenetwork/alarm'
    // return http.get(url,{params}).then((res:any) => res.data)
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 片区
export const getPq = (): any => {
    const url = 'jnsw/base/pqList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}