import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

//气象雷达图
export const getPicQxld = (): any => {
    const url = '/weather/qxld_json/pic_json.json';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};


//卫星云图
export const getPicWxyt = (): any => {
    // const url = '/weather/wxyt/wxyt.json'
    const url = '/spider/MobileService/Analysis/getCloudPicByNum.action?num=15';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
export const getPicWxyt1 = (): any => {
    // const url = '/weather/wxyt/wxyt.json'
    const url = '/weather/wxyt_json/wxyt.json';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//视频点位
export const getVideoList = (params: any): any => {
    const url = 'wjServer/hs/runStatistics/getVideoList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//物资
export const getWzList = (): any => {
    const url = '/jnsw/waterlogging/wzqk';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//排涝物资
export const getPlwzList = (): any => {
    const url = '/jnsw/waterlogging/wzqkPlpq';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//人员
export const getRyList = (): any => {
    const url = '/jnsw/waterlogging/ryqk';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//预警分析
export const getRjfxList = (): any => {
    const url = '/jnsw/waterlogging/yjfx';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计站点数
export const getStatisticZds = (): any => {
    const url = '/jnsw/floodPrevention/waterlevel/statisticZds';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计泵站
export const getStatisticBz = (): any => {
    const url = '/jnsw/floodPrevention/waterlevel/statisticBz';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计站涵闸
export const getStatisticZz = (): any => {
    const url = '/jnsw/floodPrevention/waterlevel/statisticZz';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计站雨量站
export const getStatisticYlz = (): any => {
    const url = '/jnsw/floodPrevention/waterlevel/statisticYlz';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计站河道列表
export const getStatisticHd = (params: any): any => {
    const url = '/jnsw/floodPrevention/waterlevel/hdlist';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//水位监测统计泵站设备数
export const getStatisticBzsbs = (): any => {
    const url = '/jnsw/floodPrevention/waterlevel/statisticBzsbs';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
// 涵闸运行数
export const getValidGate = (): any => {
    const url = '/jnsw/floodsituation/sluicegate/validGate';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
// 雨量监测河道雨量统计
export const getRiverSta = (params: any): any => {
    const url = '/jnsw/floodPrevention/ljylOfRainfallRiverStatistic';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//雨量监测累积雨量列表
export const getRainMon = (params: any): any => {
    const url = '/jnsw/floodPrevention/ljylOfRainfallMonitor';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//雨量监测累积雨量列表
export const getWzNums = (params: any): any => {
    const url = '/jnsw/wz/wznumsOfWzInfo';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//运行报表
export const getBzReport = (params: any): any => {
    const url = '/jnsw/bz/bzReport';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//运行记录
export const getBzyxjl = (params: any): any => {
    const url = 'wjServer/hs/runStatistics/runningLog';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//雨量棒图
export const getRainFall = (params: any): any => {
    const url = '/jnsw/floodPrevention/rainfallBarChart';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 当前应急响应
export const getEmergency = (): any => {
    const url = '/jnsw/newtask/currentResponse';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//响应总览
export const getEmergencyInfo = (): any => {
    const url = '/jnsw/floodPrevention/yjxyOverView\n';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//响应等级列表
export const getEmergencyList = (): any => {
    const url = '/jnsw/emergency/list';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 接受人列表
export const getListReceiver = (): any => {
    const url = '/jnsw/emergency/listReceiver';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
export const getListReceiver1 = (): any => {
    const url = '/jnsw/newtask/listReceiver';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
// 巡查接收人列表
export const getXcListReceiver = (params: any): any => {
    const url = "jnsw/newtask/listInspectAssign"
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => console.log(err))
}
//启动应急响应
export const getEmergencyAdd = (params: any): any => {
    const url = '/jnsw/emergency/add';
    return http.post(url, params).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//解除应急响应
export const getEmergencyDel = (params: any): any => {
    const url = '/jnsw/emergency/update';
    return http.put(url, params).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//发送响应指令
export const getIncident = (params: any, data: any): Promise<any> => {
    const url = '/jnsw/newtask/responseTask';
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
        paramsSerializer: function (params: any) {
            return qs.stringify(params, { indices: false })
        },
        params: params,
        data: data
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//推送指令
export const getSendByUserIDs = (params: any, ids: any): any => {
    const url = '/jnsw/emergency/sendByUserIDs?userIds=' + ids;
    return http({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: params,
    }).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 下载应急响应附件
export const getEmergencyDown = (id: any): any => {
    const url = '/jnsw/emergency/download/' + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//考情管理
export const getSign = (params: any): any => {
    const url = '/jnsw/sign/page2';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 泵站养护
// 泵站养护详情
export const getYhDetail = (id: string): Promise<any> => {
    const url = 'jnsw/bz/getYh/' + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
// 养护信息分页
export const getYhPage = (params: any): Promise<any> => {
    const url = 'jnsw/bz/pageYh';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 气象预警
export const getWeatherAlarm = (params: any): Promise<any> => {
    const url = 'jnsw/floodPrevention/warm';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

// 防汛调度
export const getDispatchZz = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/sluicegate/realFloodforce';
    return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
export const getDispatchBz = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/pump/realFloodforce';
    return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//雨量监测站点列表
export const getYlzList = (params: any): Promise<any> => {
    const url = 'jnsw/base/ylzList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//雨量监测河道雨量统计（按时间段查询）
export const getYlSjdChart = (params: any): Promise<any> => {
    const url = 'jnsw/floodPrevention/ljylOfRainfallRiverStatistic2';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//雨量监测河道时段雨量列表接口
export const getYlDyTable = (params: any): Promise<any> => {
    const url = 'jnsw/floodPrevention/queryTimeFall';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//雨量监测河道时段雨量echart接口
export const getYlDyChart = (params: any): Promise<any> => {
    const url = 'jnsw/floodPrevention/queryTimeFallList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//窨井预警分析接口
export const getYlHisList = (params: any): Promise<any> => {
    const url = 'jnsw/manhole/hisList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//获取窨井列表
export const getYjList = (params: any): Promise<any> => {
    const url = 'jnsw/base/yjList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//过程线分页接口
export const getGcxList = (params: any, sbids: any): Promise<any> => {
    const url = 'jnsw/manhole/gcxList?sbids=' + sbids;
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//过程线图表接口
export const getGcxChart = (params: any, sbids: any): Promise<any> => {
    const url = 'jnsw/manhole/gcxChart?sbids=' + sbids;
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

//获取雨水泵站
export const getbzList = (params: any): Promise<any> => {
    const url = 'jnsw/base/bzList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//雨水泵机（位）列表
export const getbwList = (params: any): Promise<any> => {
    const url = 'jnsw/base/bwList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//泵站监测泵位实时分页
export const getrealBw = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/pump/realBw';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//泵站（雨水）运行时长统计
export const gettimeHis = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/pump/timeHis';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//泵站（雨水）运行时长统计分页
export const gettimeHisPage = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/pump/timeHisPage';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//涵闸列表
export const getzzList = (params: any): Promise<any> => {
    const url = 'jnsw/base/zzList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//闸门列表
export const getzmList = (params: any): Promise<any> => {
    const url = 'jnsw/base/zmList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//闸门列表实时分页
export const getzmReal = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/sluicegate/zmReal';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//闸门列表历史曲线
export const getgcxList = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/sluicegate/gcxList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};
//闸门列表历史表格
export const getgcxPage = (params: any): Promise<any> => {
    const url = 'jnsw/floodsituation/sluicegate/gcxPage';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
};

/* 
 特征极值
*/
// 泵站特征极值
export const getBzFeature = (params: any) => {
    return http.get("jnsw/floodsituation/pump/getFeatureExtremum", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 河道水情特征极值
export const getRiverFeature = (params: any) => {
    return http.get("jnsw/floodsituation/riverway/getFeatureExtremum", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 山塘水情特征极值
export const getStFeature = (params: any) => {
    return http.get("jnsw/floodsituation/reservoir/getFeatureExtremum", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 涵闸水情特征极值
export const getHzFeature = (params: any) => {
    return http.get("jnsw/floodsituation/sluicegate/getFeatureExtremum", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取小时雨量特征极值
export const getHourRainFeature = (params: any) => {
    return http.get("jnsw/floodPrevention/getFeatureRainByHour", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取小时雨量特征极值
export const getSdRainFeature = (params: any) => {
    return http.get("jnsw/floodPrevention/getFeatureRainByDay", { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
/* 
    水情报表
*/
export const getSqReport = (url: string) => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}