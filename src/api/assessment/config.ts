import http from "axios";
import qs from "qs";
import { SucMessage } from "@suc/ui";
/**
 * 配置api
 */

// 养护内容查
export const onPage = (params: any) => {
  const url = "xckh/config/yhnr/selectYhnrList";
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

//   获取养护对象类型列表不含全部

// export const getYHDX = (params:any): Promise<any> => {
//   const url = "xckh/plan/report/getYhdxTypeWhenReport";
//   return http
//     .get(url)
//     .then((res: any) => res.data)
//     .catch((err: any) => {
//       SucMessage.error(err.data.message);
//     });
// };

// 养护对象(不包含全部)
export const getYHDX = (params: any): Promise<any> => {
  const url = "xckh/plan/report/getYhdxTypeWhenReport";
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

//  养护对象新增养护内容
export const addYhnr = (params: any): any => {
  return http({
    method: "post",
    url: "xckh/config/yhnr/addYhnr",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//  获取详情

export const selectYhnrDetail = (params: any) => {
  const url = "xckh/config/yhnr/selectYhnrDetail";
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

// 更新
export const editYhnr = (params: any): Promise<any> => {
  return http({
    method: "put",
    url: "xckh/config/yhnr/editYhnr",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 删除养护对象内容
export const deleteYhnr = (params: any): Promise<any> => {
  const url = "xckh/config/yhnr/deleteYhnr";
  return http
    .delete(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

// 抽样配置查
export const page = (params: any) => {
  const url = "wjServer/setting/u8/page";
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

// 评分配置
export const pageScore = (params: any) => {
  const url = "wjServer/setting/score/page";
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

//  抽样配置新增养护内容
export const addCYmc = (params: any): any => {
  return http({
    method: "post",
    url: "wjServer/setting/u8",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 评分配置新增
export const addPfpz = (params: any): any => {
  return http({
    method: "post",
    url: "wjServer/setting/score",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};



//  获取抽样配置详情
export const sampleDetail = (params: any) => {
  const url = "wjServer/setting/u8";
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





// 抽样配置更新
export const editCYpz = (params: any): Promise<any> => {
  return http({
    method: "put",
    url: "wjServer/setting/u8",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 评分配置更新
export const editPFpz = (params: any): Promise<any> => {
  return http({
    method: "put",
    url: "wjServer/setting/score/scoreType",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 删除抽样配置内容
export const deleteCYpz = (params: any): Promise<any> => {
  const url = "wjServer/setting/u8";
  return http
    .delete(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};


// 删除打分配置内容
export const deletePfpz = (params: any): Promise<any> => {
  const url = "wjServer/setting/score";
  return http
    .delete(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};


// 考核配置三大类

export const getTypeList = (): Promise<any> => {
  const url = "wjServer/setting/score/typeList";
  return http
    .get(url)
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};


//考核评分类别带参数
export const getPflx = (params:any): Promise<any> => {
  const url = "wjServer/setting/score/scoreType";
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


// 评分配置查
export const getonPage = (params: any) => {
  const url = "xckh/setting/score/page";
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

// 考核对象对应考核类别

export const getScoreType = (params: any) => {
  const url = "xckh/setting/score/scoreType";
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

//评分配置 新增

export const addScore = (params: any): any => {
  return http({
    method: "post",
    url: "xckh/setting/score",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//  评分配置详情获取详情

export const scoreDetail = (params: any) => {
  const url = "wjServer/setting/score";
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

// 评分配置更新
export const editScore = (params: any): Promise<any> => {
  return http({
    method: "put",
    url: "xckh/setting/score",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 删除评分配置
export const deleteScore = (params: any): Promise<any> => {
  const url = "xckh/setting/score";
  return http
    .delete(url, { params })
    .then((res: any) => res.data)
    .catch((err: any) => {
      SucMessage.error(err.data.message);
    });
};

//检查考核内容是否重复
export const checkContent = (params: any) => {
  const url = "xckh/setting/score/check";
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
