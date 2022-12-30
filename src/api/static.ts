import http from "axios"
import qs from "qs";

/*
* 水质分析
* */
// 获取水质报警统计
export const getWaterBj = (params: any) => {
    const url = "hjzl/analysis";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}
// 获取水质变化趋势
export const getQuality = (params: any) => {
    const url = "hjzl/analysis/szdjbhqs";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

/*
* 管网分析
* */
//获取管网片区任务事件统计事件
export const getPipEventList = (type: string) => {
    const url = "jnsw/rest/task/taskTotal?rwlx=" + type;
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取污水泵站越限统计
export const getSewageData = () => {
    const url = "jnsw/gwgl/wsbzyxtj";
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取管网预警分析
export const getGwYj = () => {
    const url = "jnsw/gwgl/pqyjtjfx";
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}

/*
* 片长统计
* */
// 片区任务事件统计
export const getPqTask = (params: any) => {
    const url = "jnsw/director/pqrwsjtj";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}
// 获取巡查问题统计分析
export const getPartolProblem = (params: any) => {
    const url = "jnsw/director/xcwttjfx";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}
// 获取片区巡查统计分析
export const getPqInspect = (params: any) => {
    const url = "jnsw/director";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}