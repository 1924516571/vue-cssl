import http from 'axios'
import { SucMessage } from "@suc/ui"

//测站类型
export const getCzType = (): Promise<any> => {
    const url = 'jnsw/flood/report/czType';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//测站简单列表
export const getCzSimple = (params: any): Promise<any> => {
    const url = 'jnsw/bz/czSimpleList';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//水位日报
export const getReportWaterDay = (params: any): Promise<any> => {
    const url = 'wjServer/fangxunjc/z/zDayReport';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//水位年报
export const getReportWaterYear = (params: any): Promise<any> => {
    const url = 'wjServer/hs/reportForm/runningFlowStatistics';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//水位历史-监测间隔时间
export const getReportSjjg = (): Promise<any> => {
    const url = 'jnsw/flood/report/timeType';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//水位历史
export const getReportWaterHis = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/waterLevelHis';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//泵机运行统计
export const getReportPumpRun = (url: any, params: any): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//雨量日报
export const getRainDayData = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/rainDayData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//雨量月报
export const getRainMonData = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/rainMonthData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//雨量月报预览
export const getRainYlData = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/rainMonthDataWithDay';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//雨量年报
export const getRainYearData = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/rainYearData';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//雨量历史
export const getRainHisData = (params: any): Promise<any> => {
    const url = 'jnsw//flood/report/rainDataHis';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//降雨量同期对比
export const getRainDataCompare = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/rainDataCompare';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//工情综合统计
export const getReportZhtj = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/pumpComp';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//工情排水统计
export const getReportPsjl = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/pumpDischarge';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//泵机运行时长统计
export const getReportYxsc = (params: any): Promise<any> => {
    const url = 'jnsw/flood/report/pumpTimeStatistics';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
