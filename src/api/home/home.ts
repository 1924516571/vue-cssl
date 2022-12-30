import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 首页-总览
 */
// 查询
export const getInfo = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 查询片长部门待办数量
export const getNumber = (url: string): any => {
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

export const getResult = (): Promise<any> => {
    const url = 'jnsw/stat/index'
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 内外河
export const getRiver = (): Promise<any> => {
    const url = 'hjzl/overview/index'
    return http.post(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
//天气
export const getWeather = (): Promise<any> => {
    const url = 'weather'
    // const url = 'nmc/rest/weather?stationid=58333&_=1590028439125'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)    })
}
export const getSiteWeather = (params: any): Promise<any> => {
    const url = 'weather'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}


/**
 * 调度
 */

//  异常报警
export const getYcList1 = (): Promise<any> => {
    const url = 'jnsw/dd/list';
    return http.get(url)
}
export const getYcList2 = (): Promise<any> => {
    const url = 'hjzl/dd/list';
    return http.get(url)
}

// 管网报警
export const getPipeList = (): Promise<any> => {
    const url = 'jnsw/pipenetwork/alarmNow';
    return http.get(url).then((res: any) => res.data)
}


// 水质报警
export const getQulityList = (): Promise<any> => {
    const url = 'hjzl/alarm/warnPageListNewNow';
    return http.get(url).then((res: any) => res.data)
}


//内涝报警
export const getFloodList = (): Promise<any> => {
    const url = 'jnsw/manhole/alarmNlNow';
    return http.get(url).then((res: any) => res.data)
}


// 水位报警
export const getLevelList = (): Promise<any> => {
    const url = 'jnsw/manhole/alarmSwNow';
    return http.get(url).then((res: any) => res.data)
}


// 巡查任务
export const getInsList = (): Promise<any> => {
    const url = 'jnsw/newtask/listAllInspectNoPage?status=0';
    return http.get(url).then((res: any) => res.data)
}
export const getInsTask = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listAllInspect';
    return http.get(url, { params }).then((res: any) => res.data)
}

// 任务事件
export const getTaskList = (): Promise<any> => {
    const url = 'jnsw/newtask/listAllNoUserNoPage?status=0';
    return http.get(url).then((res: any) => res.data)
}
export const getTasks = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listAllNoUser';
    return http.get(url, { params }).then((res: any) => res.data)
}
