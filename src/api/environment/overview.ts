import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"
/**
 * 水环境-总览
 */

//  内河水质情况
export const getInsideRiver = (): Promise<any> => {
    const url = 'hjzl/overview/insideRiverSituation'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 外河水质情况
export const getOutsideRiver = (): Promise<any> => {
    const url = 'hjzl/overview/outsideRiverSituation'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 内河水质情况（新）
export const getOutsideRiver1 = (params: any): Promise<any> => {
    const url = 'hjzl/overview/outsideRiverSituation'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 一周水质变化趋势
export const getTrend = (params: any): Promise<any> => {
    const url = 'hjzl/real/waterQualityWeekTren'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 总览
export const getOverview = (url: string): Promise<any> => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 详情-监测因子-因子水质等级限值
export const getRateValue = (params: any): Promise<any> => {
    const url = 'hjzl/basedata/jcyzWaterLevelLimit';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 监测因子-因子月平均线
export const getMonthAvgLine = (params: any): Promise<any> => {
    const url = 'hjzl/real/monthAvgData';
    return http({
        url: url,
        method: 'get',
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//创建水环境任务事件
export const createTask = (params: any, data: any): Promise<any> => {
    const url = '/jnsw/sz/createTaskIncident';
    return http({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [
            function (data) {
                return data
            }
        ],
        params: params,
        data: data
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取自动站下拉列表 不分页
export const getZdSelect = (): any => {
    return http.get("hjzl/site/allSites").then((res: any) => res.data).catch((err: any) => console.log)
}
// 获取水质简报数据
export const getWaterQuality = (params: any): any => {
    return http.get("hjzl/basedata/waterReport", { params }).then((res: any) => res.data).catch((err: any) => console.log)
}