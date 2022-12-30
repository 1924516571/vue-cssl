/**
 * 一张图---内涝接口
 */
import http from 'axios';
import qs from 'qs';
import { SucMessage } from "@suc/ui"
// 窨井监测站点数预警数
export const getAmount = (): any => {
    const url = 'jnsw/manhole/devices';
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//  窨井监测tab内表格
export const getTableData = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/real';
    return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getCurTableData = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/realall';
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}


// 窨井地图点位
export const getMap = (): any => {
    const url = 'jnsw/map/manholesite';
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

//  水位历史记录
export const getHistoryData = (_params: any): Promise<any> => {
    let params = qs.stringify(_params);
    return http.post('jnsw/manhole/his?' + `${params}`).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 任务事件
export const getTaskTable = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listFloodPrevention';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getTaskGis = (): Promise<any> => {
    const url = 'jnsw/newtask/gisFloodPrevention';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}