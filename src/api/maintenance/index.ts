import http from "axios"
import qs from "qs"

// 获取片区下拉框
export const getPqList = () => {
    const url = "jnsw/maintain/plan/pqs";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 养护内容列表
export const getYhnrList = (params: any) => {
    const url = "jnsw/maintain/plan/maintainText";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 巡查轨迹查询get请求
export const getXcTravel = (params:any)=>{
    const url = "wjServer/hs/maintain/getRecordGj";
    return  http.get(url,{params}).then((res:any)=>
    res.data    
    ).catch((err:any)=>{
     console.log(err);
    })
}
// 巡查轨迹查询post 请求
export const getTrack = (id: string) => {
    const url = "jnxc/rest/app/inspectNew/findInspectGpsData3/" + id;
    return http.post(url).then((res: any) => res.data).catch(() => console.log)
}



// 获取管养下拉框
export const getGyList = () => {
    const url = "jnsw/maintain/plan/team";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取水体下拉框
export const getStList = (params: any) => {
    const url = "hjzl/baseManage/maintainTarget";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取排水措施下拉框
export const getPscsList = (params: any) => {
    const url = "jnsw/maintain/plan/maintainTarget";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取三级片长下拉框
export const getPzList = (params: any) => {
    const url = "jnsw/maintain/plan/director";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取监理下拉框
export const getJlList = (params: any) => {
    const url = "jnsw/maintain/plan/supervise";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 计划上报
export const reportPlan = (params: any) => {
    const url = "jnsw/maintain/plan/reportPlan";
    return http.post(url, qs.stringify(params, {indices: false})).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取抽样分页数据
export const getSamplePage = (params: any) => {
    const url = "jnsw/maintain/config/sample";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 新增抽样
export const addSample = (params: any) => {
    const url = "jnsw/maintain/config/sample";
    return http({
        method: "POST",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 修改抽样
export const updateSample = (params: any) => {
    const url = "jnsw/maintain/config/sample";
    return http({
        method: "PUT",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 删除抽样
export const deleteSample = (params: any) => {
    const url = "jnsw/maintain/config/sample";
    return http({
        method: "DELETE",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取打分配置分页数据
export const getScorePage = (params: any) => {
    const url = "jnsw/maintain/config/score";
    return http.get(url, {params}).then((res: any) => res.data).catch(((err: any) => {
        console.log(err)
    }))
}

// 新增打分配置
export const addScoreConfig = (params: any) => {
    const url = "jnsw/maintain/config/score";
    return http({
        method: "POST",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 修改打分配置
export const updateScoreConfig = (params: any) => {
    const url = "jnsw/maintain/config/score";
    return http({
        method: "PUT",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 删除打分配置
export const deleteScoreConfig = (params: any) => {
    const url = "jnsw/maintain/config/score";
    return http({
        method: "DELETE",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取养护内容分页数据
export const getMaintenanceConfigPage = (params: any) => {
    const url = "jnsw/maintain/config/maintainText";
    return http.get(url, {params}).then((res: any) => res.data).catch(((err: any) => {
        console.log(err)
    }))
}
// 新增养护内容
export const addMaintenanceContent = (params: any) => {
    const url = "jnsw/maintain/config/maintainText";
    return http({
        method: "POST",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 修改养护内容
export const updateMaintenanceContent = (params: any) => {
    const url = "jnsw/maintain/config/maintainText";
    return http({
        method: "PUT",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 删除养护内容
export const deleteMaintenanceContent = (params: any) => {
    const url = "jnsw/maintain/config/maintainText";
    return http({
        method: "DELETE",
        url,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取考核类别下拉框
export const getKhTypeList = (target: string) => {
    const url = "jnsw/maintain/config/examineType?target=" + target;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 修改抽样配置
export const updateSampleStatus = (params: any) => {
    const url = "jnsw/maintain/config/changeSampleStatus";
    return http({
        method: "PUT",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取任务状态下拉框
export const getTaskStatus = () => {
    const url = "jnsw/maintain/task/status";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取问题列表
export const getProblemList = (params: any) => {
    const url = "jnsw/maintain/task/taskList";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取问题详情页
export const getProblemDetail = (id: string) => {
    const url = "jnsw/maintain/task/taskDeail/" + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 计划清单获取状态下拉框
export const getPlanStatusList1 = () => {
    const url = "jnsw/maintain/plan/status/v2";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 计划核查获取状态下拉框
export const getPlanStatusList2 = () => {
    const url = "jnsw/maintain/plan/status/v3";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取计划养护分页列表
export const getPlanList = (params: any) => {
    const url = "wjServer/hs/maintain/infoList";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取状态下拉框
export const getPlanStatusList = () => {
    const url = "jnsw/maintain/plan/status";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取计划清单分页列表
export const getPlanList1 = (params: any) => {
    const url = "jnsw/maintain/plan/planPage";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取计划详情
export const getPlanDetail = (params: any) => {
    const url = "jnsw/maintain/plan/planDetail";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取养护记录详情
export const getMaintenanceDetail = (params: any) => {
    const url = "wjServer/hs/maintain/infoDetail";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取养护记录
export const getMaintenanceRecord = (params: any) => {
    const url = "jnsw/maintain/plan/maintainRecord/v2"
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取实时监控数据
export const getMonitorData = (params: any) => {
    const url = "jnsw/maintain/plan/planPage/v4"
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取河道基本信息
export const getHdBaseInfo = (id: string) => {
    const url = "hjzl/baseManage/riverInfo?id=" + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取管网基本信息
export const getGwBaseInfo = (id: string) => {
    const url = "jnsw/pipenetwork/get/" + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取在执行计划人员
export const getMonitorPersonal = (params: any) => {
    const url = "jnsw/maintain/plan/realPerson";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取抽样下拉框
export const getSampleList = () => {
    const url = "jnsw/maintain/config/sampleOption";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 执行抽样
export const runSample = (params: any) => {
    const url = "jnsw/maintain/plan/sampling";
    return http({
        method: "POST",
        url,
        params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { indices: false });
        },
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 抽样派单
export const SampleDispatch = (data: any) => {
    const url = "jnsw/maintain/plan/sendSample/v2";
    return http({
        method: "POST",
        url,
        data,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 计划排除状态下拉框
export const excludePlanStatus = () => {
    const url = "jnsw/maintain/plan/excludeStatus";
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 排除计划分页
export const excludePlanPage = (params: any) => {
    const url = "jnsw/maintain/plan/excludePlanPage";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 排除计划审批
export const excludePlanApproval = (params: any) => {
    const url = "jnsw/maintain/plan/excludeApprove";
    return http({
        method: "POST",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 打分状态下拉框
export const scoreStatus = () => {
    const url = "jnsw/maintain/plan/scoreStatus"
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
//打分计划列表
export const getScorePlanList = (params: any) => {
    const url = "jnsw/maintain/plan/scorePlanPage";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 打分结果签发或者驳回
export const scoreResult = (params: any) => {
    const url = "jnsw/maintain/plan/issued";
    return http({
        method: "POST",
        url,
        params
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 获取打分详情
export const getScoreDetail = (id: string) => {
    const url = "jnsw/maintain/plan/scoreDetail?planId=" + id;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 打分
export const score = (data: any, params: any) => {
    const url = "jnsw/maintain/plan/scoring";
    return http({
        method: "POST",
        url,
        data,
        params,
    }).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 获取养护简报
export const getMaintenanceReport = (params: any) => {
    const url = "jnsw/maintain/statistic/report"
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
// 管网累计养护量
export const getPipNetWork = (time: string) => {
    const url = "jnsw/maintain/statistic/pipeNetworkMaintain?time="+time;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 月度计划养护量
export const getPlanMaintenance = (params: any) => {
    const url = "jnsw/maintain/statistic/planMaintain";
    return http.get(url, {params}).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 各片区月度计划完成统计
export const getPlanFinishByArea = (time: any) => {
    const url = "jnsw/maintain/statistic/planFinishByArea?time="+time;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}
//各片区月度养护统计
export const getPlanMaintenanceByArea = (time: any) => {
    const url = "jnsw/maintain/statistic/planMaintainByArea?time="+time;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 各片区月度养护问题处理统计
export const getPlanMaintenanceTask = (time: any) => {
    const url = "jnsw/maintain/statistic/planMaintainTaskByArea?time="+time;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}

// 月度覆盖率统计
export const getCoverager = (time: any) => {
    const url = "hjzl/statistics/planCoverage?time="+time;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        console.log(err)
    })
}