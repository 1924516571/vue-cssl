import http from 'axios'
import { SucMessage } from "@suc/ui"
/**
 * 防汛预案
 */
// 片区
export const getPq = (): any => {
    const url = 'jnsw/base/pqList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 列表接口
export const getFaList = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/ya'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 创建/上传文件
export const createFa = (params: any, data: any, url: string): Promise<any> => {
    return http({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (data) {
            return data;
        }],
        params: params,
        data: data
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 下载文件
export const downloadFa = (id: string, url: string): Promise<any> => {
    return http({
        method: 'get',
        url: url + '/' + id
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 删除文件
export const delFa = (id: string, url: string): Promise<any> => {
    return http({
        method: 'delete',
        url: url + '/' + id
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}