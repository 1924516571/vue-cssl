/**
 * 养护考核-----养护记录
 *
 */

import http from "axios";
import qs from "qs";
import { SucMessage } from "@suc/ui";

// 获取养护记录列表

export const getRecordSimpleList = (params: any) => {
  const url = "xckh/maintain/record/infoList";
  return http({
    url: url,
    params: params,
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  })
    .then((res: any) => res.data)
    .catch(() => {
      console.log;
    });
};

//定位/获取计划对应管网路径

export const getSelectGwljByPlanId = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/getRecordGj";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

// 获取养护打卡记录列表信息
export const getMonthInfoList = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/monthInfoList";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

//获取养护记录详情详情
export const getProblemDetail = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/infoDetail";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

//根据选择的对象获取对应的对象内容
export const getSelectObjectById = (params: any): Promise<any> => {
  const url = "xckh/plan/report/selectObjectById";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

//获取问题详情的接口

export const getDetail = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/getProblemDetailV2";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

export const getClickWatch = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/getProblemDetailList";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

// 审核问题是否通过
// export const getCheckPass = (params:any):Promise<any> =>{
//   const url = 'xckh/maintain/record/approval'
//   return http.put(url,  {params} ).then((res: any) => res.data).catch((err: any) => {
//     SucMessage.error(err.data.message)
//   })
// }

// 审批 通过
export const getCheckPass = (params: any): Promise<any> => {
  return http({
    method: "put",
    url: "xckh/maintain/record/approval",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 获取实时养护记录列表

// export const maintainRealList = (params:any):Promise<any> =>{
//   const url = 'xckh/maintain/record/getRealList'
//   return http.get(url,  {params} ).then((res: any) => res.data).catch((err: any) => {
//     SucMessage.error(err.data.message)
//   })
// }

export const maintainRealList = (params: any) => {
  const url = "xckh/maintain/record/getRealList";
  return http({
    url: url,
    params: params,
    paramsSerializer: function(params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  })
    .then((res: any) => res.data)
    .catch((err: any) => {});
};

// 获取在线人员信息

export const getOnlinePerson = (): Promise<any> => {
  const url = "xckh/maintain/record/getOnlinePerson";
  return http
    .get(url)
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

// 获取实时监控养护记录详情
export const getRealRecordDetail = (params: any): Promise<any> => {
  const url = "xckh/maintain/record/getRealRecordDetail";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

//获取历史养护记录时间和完成量数据

export const getTimecomplete = (params: any): Promise<any> => {
  const url = "xckh/app/maintain/getHistoryList";
  return http
    .get(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};
