import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 资料库
 */
// 片区
export const getPq = (params: any): any => {
    const url = 'jnsw/database/dic';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 列表接口
export const getFaList = (params: any): Promise<any> => {
    const url = 'jnsw/database/page'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 创建/上传文件
export const createFa = (params: any, data: any, url: string): Promise<any> => {
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
//片区片长关联
export const getPqPz = (): Promise<any> => {
    const url = 'jnsw/base/pqpz'
    return http.get(url).then(res => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 惠山污水


// 片区树
export const getPqTree = (params: any): any => {
    const url = 'wjServer/task/field/getInfoListNoPage ';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}