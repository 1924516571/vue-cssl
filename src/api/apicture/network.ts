/**
 * 一张图---管网接口
 */
import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

//  监测点tab内表格
export const getTableData = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/real'
  return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
//  监测点tab内表格
export const getCurTableData = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/realall'
  // return http.get(url,{params}).then((res: any) => res.data)
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

//  监测点-站点数
export const getAmount = (): any => {
  const url = 'jnsw/pipenetwork/devices'
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 监测点-地图部分
export const getMonitorGis = (): any => {
  const url = 'jnsw/map/gridpos'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
// 热力图
export const getMonitorHeat = (): any => {
  const url = 'jnsw/map/getGwHeadGis'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
// export const getAllSite = (): any => {
//   const url = 'map/gridsite'
//   return http.post(url).then((res: any) => res.data)
// }
// 任务事件-地图
export const getTaskGis = (): Promise<any> => {
  const url = 'jnsw/newtask/gisPipeNetWork'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
/**
 *
 * 管网右侧模块
 */
// 设备情况
export const getDeviceAmount = (): any => {
  const url = 'jnsw/statistic/devicesituation'
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 预警情况和分布
export const getDistribution = (): any => {
  const url = 'jnsw/statistic/warningsituation'
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

/**
 * 管网详情（点击表格行跳转/地图点位跳转）
 */
// 地图部分
export const getCurrentSite = (params: any): Promise<any> => {
  const url = 'jnsw/map/currentgridsite'
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 地图上数字
export const getSiteAmount = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/simple'
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//水位趋势
export const getTrendData = (_params: any): Promise<any> => {
  let params = qs.stringify(_params)
  return http.post('jnsw/pipenetwork/his?' + `${params}`).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
  // const url = 'pipenetwork/his';
  // let params = qs.parse(_params);
  // return http.post(url,null,{params}).then((res:any) => res.data);
}
// 监控总览
export const getOverviewData = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/overview'
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 上游管网监测点
// export const getMonitor = (_params: any): Promise<any> => {
//   let params = qs.stringify(_params)
//   return http.post('jnsw/pipenetwork/upstreamTrenReal?' + `${params}`)
// }
export const getMonitor = (params: any): Promise<any> => {
  return http({
    url: 'jnsw/pipenetwork/upstreamTrenReal',
    method: 'post',
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false })
    }
  }).catch(err => { console.log(err) }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 周边企业
export const getConpany = (params: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/aroundenterprise'
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 周边企业照片
export const getImg = (id: string): Promise<any> => {
  return http
    .get('jnsw/pipenetwork/enterprisepicture?qyId=' + `${id}`, {
      responseType: 'blob'
    })
    .then((res: any) => res).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
}

//任务事件列表
export const getTaskList = (params: any): Promise<any> => {
  // let params = qs.stringify(_params)
  const url = 'jnsw/newtask/listPipeNetWork'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
//任务事件列表
export const getJcdTaskList = (params: any): Promise<any> => {
  // let params = qs.stringify(_params)
  const url = 'jnsw/newtask/listMonitorStation'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
/**
 *
 * 创建任务事件弹窗
 */
// 新增任务事件
export const setTask = (params: any, data: any): Promise<any> => {
  const url = 'jnsw/pipenetwork/createTaskIncident'
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
    params: params,
    data: data
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 接收人列表
export const getMember = (): any => {
  const url = 'jnsw/pipenetwork/staff'
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 当前人员
export const getCurrentMember = (): any => {
  const url = 'jnsw/pipenetwork/currentperson'
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 任务编号
export const getNumber = (id: string): Promise<any> => {
  return http
    .post('jnsw/pipenetwork/taskserialNum?sbId=' + `${id}`)
    .then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
}
// 经纬度
export const getTaskMarker = (id: string): Promise<any> => {
  return http
    .post('jnsw/pipenetwork/devicesite?sbId=' + `${id}`)
    .then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
    })
}
/* 
溯源分析
*/
// 获取历史信息
export const getHisall = (params: any) => {
  return http({
    url: 'jnsw/pipenetwork/hisall',
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
  // return http.get("jnsw/pipenetwork/hisall", { params }).then((res: any) => res.data)
}
