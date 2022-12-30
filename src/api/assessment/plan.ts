/**
 * 计划
 */
 import { SucMessage } from '@suc/ui'
import http from 'axios'
 import qs from 'qs'
 
 //获取上报简易记录
 export const getReportSimpleList = (params: any) => {
     const url = "xckh/plan/report/getReportSimpleList"
     return http({
         url: url,
         params: params,
         paramsSerializer: function (params) {
             return qs.stringify(params, { arrayFormat: 'repeat' })
         }
     }).then((res: any) => res.data).catch((err: any) => {
     })
 }
  //根据 区划/片区/周期/养护对象/计划名称/审批状态/上报人角色/上报人编码 查询简单上报记录
  export const selectDetailList = (params: any) => {
    const url = "xckh/plan/checklist/selectDetailList"
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
    })
}
 // 根据选择的区划/片区/ 获取对应的管网列表
 export const getGwList = (params: any) => {
     const url = "xckh/plan/report/selectGwList";
     return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
 }

  // 根据选择的对象获取对应的对象内容
  export const selectObjectById = (params: any) => {
    const url = "xckh/plan/report/selectObjectById";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

 // 根据上报人获取上报人信息和养护单位
 export const getSelectYhdwByUserId = (params: any) => {
    const url = "xckh/plan/report/selectUserInfoByUserId";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

// 根据选择的养护对象获取对应的养护内容
export const getSelectYhnrByType = (params: any) => {
    const url = "xckh/plan/report/selectYhnrByType";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

//添加计划上报
export const addReportPlan = (params: any): any => {
    return http({
        method:'post',
        url: 'xckh/plan/report/addReportPlan',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
  }
  // 编辑计划上报
export const editReportPlan = (params: any): Promise<any> => {
    return http({
        method:'put',
        url: 'xckh/plan/report/editReportPlan',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
}

 // 审批 通过
 export const approvalSuccess = (params: any): Promise<any> => {
    return http({
        method:'put',
        url: 'xckh/plan/checklist/approvalSuccess',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
}

// 审批不通过
export const approvalFail = (params: any): Promise<any> => {
    return http({
        method:'put',
        url: 'xckh/plan/checklist/approvalFail',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
}

  // 删除上报计划
export const deleteGWData = (params: any): Promise<any> => {
    const url = "xckh/plan/report/deleteReportPlan";
    return http.delete(url,{params}).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 展示编辑上报计划详情
export const getSelectBusiPlanDetails = (params: any) => {
    const url = "xckh/plan/report/selectBusiPlanDetails";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

// 展示编辑上报计划详情
export const getPlanDetail = (params: any) => {
    const url = "xckh/plan/checklist/getPlanDetail";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

// 根据选择的养护对象获得对应的内容名称
export const selectMcByType = (params: any) => {
    const url = "xckh/plan/report/selectMcByType";
    return http.get(url, {params}).then((res: any) => res.data).catch()
}

// 获取点位
export const getPoint = (lat: any,lon:any) => {
     var map = {
        lat:lat,
        lon:lon 
     }
     return map
}

 