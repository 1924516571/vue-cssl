import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"
/**
 * 防汛管理 值班
 */

//值班列表
export const getDuty = (url: any): Promise<any> => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

//员工值班表
export const getDutyList = (params: any): Promise<any> => {
    const url = 'jnsw/onDuty/get'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 创建/上传文件
export const createFa = (data: any, url: string): Promise<any> => {
    return http({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (data) {
            return data;
        }],
        data: data,
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

//获取人员列表
export const getOptions = (): Promise<any> => {
    const url = 'jnsw/onDuty/options'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

//新增值班信息
export const addDuty = (data: any): Promise<any> => {
    const url = 'jnsw/onDuty/add'
    return http.post(url, qs.stringify(data, { indices: false }), {}).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

//编辑值班信息
export const editDuty = (data: any): Promise<any> => {
    const url = 'jnsw/onDuty/update'
    return http.put(url, qs.stringify(data, { indices: false }), {}).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

//删除值班信息
export const deleteDuty = (url: any): Promise<any> => {
    return http.delete(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
