/**
 * 一张图---总览接口
 */
import http from 'axios';
import qs from 'qs';
import { SucMessage } from "@suc/ui"
/**
 *  排污企业
 * */
// tab表格 
export const getSewage = (params: any): Promise<any> => {
    const url = 'jnsw/gyqy/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 排污企业按片区统计
export const getSewageBar = (): any => {
    const url = 'jnsw/gyqy/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 排污企业数量
export const getSewageCount = (): any => {
    const url = 'jnsw/gyqy/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getSewageGis = (): any => {
    const url = 'jnsw/gyqy/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 雨水管网
 */
// tab表格 
export const getRainwaterTable = (params: any): Promise<any> => {
    const url = 'jnsw/pipenetwork/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//右侧柱状图
export const getRainwaterBar = (): any => {
    const url = 'jnsw/pipenetwork/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getRainwaterGis = (): any => {
    const url = 'jnsw/map/gridsite';
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 右侧详情
export const getRainwaterDetail = (params: any): Promise<any> => {
    const url = 'jnsw/pipenetwork/get/' + params.id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 窨井
 */
// tab表格 
export const getManiTable = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 右侧柱状图-窨井
export const getManiBar = (): any => {
    const url = 'jnsw/manhole/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 窨井数量
export const getManiCount = (): any => {
    const url = "jnsw/manhole/count";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getManiGis = (): any => {
    const url = 'jnsw/map/manholesite';
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 点位详情
export const getGisDetail = (params: any): Promise<any> => {
    const url = 'jnsw/map/siteDetail';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 右侧详情
export const getManiDetail = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/get/' + params.id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getManiHisLine = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/trenDataList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getManiPicID = (params: any): any => {
    const url = 'jnsw/manhole/relYjPicList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
/**
 * 泵站
 */
// tab表格 
export const getStationTable = (params: any): Promise<any> => {
    const url = 'jnsw/bz/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getStationTable2 = (params: any): Promise<any> => {
    const url = 'jnsw/bz/page2';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 右侧柱状图 - 泵站
export const getStationBar = (): any => {
    const url = 'jnsw/bz/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationCount = (): any => {
    const url = 'jnsw/bz/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//右侧详情
export const getStationMax = (params: any): any => {
    const url = 'jnsw/bz/pumpRealMaxAndMin';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationDetail = (params: any): any => {
    const url = 'wjServer/hs/runStatistics/bzDetail';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationHisLine = (params: any): any => {
    const url = 'jnsw/bz/pumpHisData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationHisTable = (params: any): any => {
    const url = 'jnsw/bz/pumpHisPageData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationPicID = (params: any): any => {
    const url = 'jnsw/bz/relBzPicList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getStationGis = (): any => {
    const url = 'jnsw/bz/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getStationWsGis = (): any => {
    const url = 'jnsw/bz/gis2';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
/**
 * 闸站
 */
//tab表格
export const getGateTable = (params: any): Promise<any> => {
    const url = 'jnsw/zz/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getGateTable2 = (params: any): Promise<any> => {
    const url = 'jnsw/zz/page2';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//  右侧柱状图-闸站
export const getGateBar = (): any => {
    const url = 'jnsw/zz/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getGateCount = (): any => {
    const url = 'jnsw/zz/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 右侧详情
export const getGateDetail = (params: any): any => {
    const url = 'jnsw/zz/zzInfoById';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getGateHisLine = (params: any): any => {
    const url = 'jnsw/zz/zzHisData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getGateHisTable = (params: any): any => {
    const url = 'jnsw/zz/zzHisPageData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//涵闸水情-实时开度
export const getGateOpening = (params: any): any => {
    const url = 'jnsw/floodsituation/sluicegate/realOpening/' + params.id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//涵闸水情-时长统计
export const getGateStatistical = (params: any): any => {
    const url = 'jnsw/floodsituation/sluicegate/statistical';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getGateGis = (): any => {
    const url = 'jnsw/zz/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 右侧柱状图 - 河道
export const getRiverBar = (): any => {
    const url = 'jnsw/floodsituation/riverway/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getRiverCount = (): any => {
    const url = 'jnsw/floodsituation/riverway/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 污水处理厂
 */
// tab表格 
export const getPlantTable = (params: any): Promise<any> => {
    const url = 'jnsw/wsclc/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 右侧柱状图-污水处理厂
export const getPlantBar = (): any => {
    const url = 'jnsw/wsclc/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getPlantCount = (): any => {
    const url = 'jnsw/wsclc/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 地图
export const getPlantGis = (): any => {
    const url = 'jnsw/wsclc/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 右侧详情
export const getPlantDetail = (params: any) => {
    const url = 'jnsw/wsclc/get/' + params.id
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 应急处理装置
 */
// tab表格
export const getEmergencyTable = (params: any): Promise<any> => {
    const url = 'jnsw/yjclzz/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 右侧柱状图 - 应急处理装置
export const getEmergencyBar = (): any => {
    const url = 'jnsw/yjclzz/countByPq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getEmergencyCount = (): any => {
    const url = 'jnsw/yjclzz/count';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
// 地图
export const getEmergencyGis = (): any => {
    const url = 'jnsw/yjclzz/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 水质监测点位
 */
// tab表格
export const getWaterMonitTable = (params: any): Promise<any> => {
    const url = 'hjzl/site/pageSites';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//地图
export const getWaterMonitGis = (): any => {
    const url = 'hjzl/site/allSites';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
/**
 * 水务视频
 */
// tab表格
export const getWaterVideoTable = (params: any): Promise<any> => {
    const url = 'jnsw/spsb/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//地图
export const getWaterVideoGis = (params?: any): any => {
    const url = 'jnsw/spsb/gis';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
//视频url
export const getVideoUrl = (url: any): any => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
/**
 * 积水监测
 */
// tab表格
export const getWaterMonTable = (params: any): Promise<any> => {
    const url = 'jnsw/sjd/page';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//地图
export const getWaterMonGis = (): any => {
    const url = 'jnsw/sjd/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
/**
 * 雨站
 */
//地图
export const getRainGis = (): any => {
    const url = 'jnsw/map/rainfallSite';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

export const getBjList = (): any => {
    const url = 'jnsw/bz/bjsbList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 河道
 */
// tab表格
export const getRiverTable = (params: any): Promise<any> => {
    const url = 'jnsw/hd/page'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
/**
 * 河道水情
 */
export const getRiverId = (params: any): Promise<any> => {
    const url = 'jnsw//floodsituation/riverway/riverWayInfoById'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
/**
 * 河道
 */
//地图
export const getRiverGis = (): any => {
    const url = 'jnsw/hd/gis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 山塘
 */
//地图
export const getStatusStGis = (): any => {
    const url = 'jnsw/floodsituation/reservoir/stGis';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//详情
export const getStatusStId = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/reservoir/reservoirInfoById';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}