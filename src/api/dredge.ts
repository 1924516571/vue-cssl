import http from "axios";

// 获取计划列表
export const getPlanPage = (params: any) => {
    const url = "jnsw/dredge/planPage";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}
// 获取状态下拉框
export const getStatusList = () => {
    const url = "jnsw/dredge/status";
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取片区下拉框
export const getPq = () => {
    const url = "jnsw/dredge/pqs";
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取计划详情页数据
export const getPlanDetail = (id: string) => {
    const url = "jnsw/dredge/planDetail?planid=" + id;
    return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取问题列表
export const getProblemList = (params: any) => {
    const url = "jnsw/dredge/taskList";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}
// 清疏巡查轨迹查询
export const getTrack = (id: string) => {
    const url = "jnxc/rest/app/inspectNew/findInspectGpsData2/" + id;
    return http.post(url).then((res: any) => res.data).catch(() => console.log)
}