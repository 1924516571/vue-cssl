import http from 'axios'
import qs from 'qs';
import { SucMessage } from "@suc/ui"
/**
 * 一张图-河湖
 */

/**
 * 河湖左侧
 */
// 水质监测自动站
export const getQulityData = (params: any): Promise<any> => {
    const url = 'hjzl/site/allSitesData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getCurQulityData = (params: any): Promise<any> => {
    const url = 'hjzl/site/realall';
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
// 水质监测手动站
export const getManualQulityData = (params: any): Promise<any> => {
    const url = 'hjzl/site/allArtificialSitesData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//水质监测污水处理
export const getWsclData = (params: any): Promise<any> => {
    const url = 'jnsw/wsclc/sztbHisPage';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//水质监测应急装置
export const getYjzzData = (params: any): Promise<any> => {
    const url = 'jnsw/yjclzz/sztbHisPage';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 站点数
export const getAmount = (): Promise<any> => {
    const url = 'hjzl/site/newSiteTotal'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 水质监测地图
export const getQulityGis = (): any => {
    const url = 'hjzl/site/allSites';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 获取排水口地图接口(包含经纬度)
export const getDrainGis = (): any => {
    const url = "jnsw/drain/gis";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 截流井地图接口(包含经纬度)
export const getClosureGis = (): any => {
    const url = "jnsw/catchBasin/gis";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 提升井地图接口(包含经纬度)
export const getAscensionGis = (): any => {
    const url = "jnsw/hoistingShaf/gis"
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 任务事件
export const getTaskData = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listWaterEnvironment';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 任务事件地图
export const getTaskGis = (): Promise<any> => {
    const url = 'jnsw/newtask/gisWaterEnvironment';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}



/**
 * 河湖右侧
 */
// 水质监测概况
export const getStatus = (): any => {
    const url = 'hjzl/siteTotal/waterMonitorStatus';
    return http.get(url).then((res: any) => res.data);
}
// 水质状况-达标率
export const getRate = (): any => {
    const url = 'hjzl/siteTotal/waterStandardStatus';
    return http.get(url).then((res: any) => res.data);
}
// 超标因子统计
export const getFactors = (): any => {
    const url = 'hjzl/siteTotal/monitorFactorsTotal';
    return http.get(url).then((res: any) => res.data);
}
// 水质类别统计
export const getType = (): any => {
    const url = 'hjzl/siteTotal/waterClassTotal';
    return http.get(url).then((res: any) => res.data);
}

/**
 * 河湖详情
 */
export const getWaterQulity = (params: any, url: string): Promise<any> => {
    // return http.get(url,{params}).then((res:any) => res.data)
    return http({
        url: url,
        method: 'get',
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        }
    }).then((res: any) => res.data)
}
/* 
 * 截流井和排口详情
*/
export const getEffDetail = (url: string): Promise<any> => {
    return http.get(url).then((res: any) => res.data)
}

/**
 * 调水模型
 */
export const getPath = (params: any): Promise<any> => {
    const url = 'jnsw/water/model/getPath';
    return http.get(url, { params }).then((res: any) => res.data)
}
export const getRiverQulity = (params: any): Promise<any> => {
    const url = 'hjzl/siteTotal/getPath';
    return http.get(url, {
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        }
    }).then((res: any) => res.data)
}
export const getSource = (params: any): Promise<any> => {
    const url = 'hjzl/siteTotal/sourceQuality/v1';
    return http.get(url, {
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false })
        }
    }).then((res: any) => res.data)
}