/**
 * 抽样
 *
 */

 import http from "axios";
 import qs from "qs";
 import { SucMessage } from "@suc/ui"




 

//  根据条件抽样
  export const getSample = (params: any): Promise<any> => {
    const url = 'xckh/asmt/sample'
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
  }  

  // 获取派发人员
  export const getSendPerson = (): Promise<any> => {
    const url = 'xckh/common/jlUsers'
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
  }
  
  //点击确定抽样问题派发到相关人员
  
  export const addSampleProblem = (params: any): any => {
    return http({
        method:'post',
        url: 'xckh/asmt/sample/distribute',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
  }

  //监理/片长进行审核操作
  
  export const verify = (params: any): any => {
    return http({
        method:'post',
        url: 'xckh/asmt/exclusion/verify',
        data: params,
        headers:{
            "Content-Type":'application/json'
        }
    })
  }

 // 根据时间/片区/养护对象 获取计划列表
 export const selectRepordList = (params: any) => {
  const url = "xckh/supervision/record/selectRepordList"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 根据打分项的uuid获取打分的明细
export const editDetail = (params: any) => {
  const url = "wjServer/asmt/score/detail"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 根据条件获取计划列表
export const onPage = (params: any) => {
  const url = "wjServer/asmt/score/page"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 获取排除项的分页数据
export const onExclusionPage = (params: any) => {
  const url = "xckh/asmt/exclusion/page"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

 // 获取所有考核任务问题的可选项
 export const khProblems = (): Promise<any> => {
  const url = 'wjServer/setting/score/khProblems'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 获取管理任务的问题列表
export const mngProblems = (): Promise<any> => {
  const url = 'wjServer/setting/score/mngProblems'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 获取加分项列表
export const bonuses = (): Promise<any> => {
  const url = 'wjServer/setting/score/bonuses'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//保存打分的分数以及打分明细
  
export const saveDf = (params: any): any => {
  return http({
      method:'post',
      url: 'wjServer/asmt/score',
      data: params,
      headers:{
          "Content-Type":'application/json'
      }
  })
}

//根据传过来的违规次数自动算出扣分/加分分值
  
export const detailTotalScore = (params: any): any => {
  return http({
      method:'post',
      url: 'wjServer/asmt/score/detailTotalScore',
      data: params,
      headers:{
          "Content-Type":'application/json'
      }
  })
}

// 获取可选的三种审核状态
export const status = (): Promise<any> => {
  const url = 'wjServer/asmt/exclusion/status'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//新增一个排除对象
  
export const addExclusion = (params: any): any => {
  return http({
      method:'post',
      url: 'wjServer/asmt/exclusion',
      data: params,
      headers:{
          "Content-Type":'application/json'
      }
  })
}

// 获取所有可以排除的计划(审批流程走完的计划)
export const planList = (params: any): Promise<any> => {
  const url = 'xckh/asmt/exclusion/plan'
  return http.get(url,{params}).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}


// 排除模块根据计划id获取基本信息
export const planDetail = (params: any) => {
  const url = "xckh/asmt/exclusion/plan/detail"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 根据不同的登录角色展示不同的内容，超级管理员看到的内容待完善
export const exclusionDetail = (params: any) => {
  const url = "xckh/asmt/exclusion"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

//下载文件
export const downloadFile = (params: any) => {
  const url = "xckh/dataCenter/file/downloadFile"
  return http({
      url: url,
      params: params,
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 获取所有的考核打分状态
export const getStatus = (params: any) => {
  const url = "xckh/asmt/score/status"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

//三级片长进行签发操作
export const issue = (params: any): any => {
  return http({
      method:'post',
      url: 'wjServer/asmt/score/issue',
      data: params,
      headers:{
          "Content-Type":'application/json'
      }
  })
}






