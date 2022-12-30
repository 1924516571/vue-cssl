import http from 'axios'
import { SucMessage } from "@suc/ui"

/**
 * 内涝管理
 */
/**
 * 任务事件
 */
export const getTaskList = (params: any): Promise<any> => {
  const url = 'jnsw/newtask/listResponse';
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
/**
 * 险灾情
 */
export const getDisaster = (params: any): Promise<any> => {
  const url = 'jnsw/response/disasterPage'
  return http.get(url, { params }).then(res => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
/**
 * 新增险灾情
 */
export const addDisaster = (params: any, data: any): Promise<any> => {
  const url = 'jnsw/response/disasterAdd'
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

/**
 * 新建事件
 */

export const createTask = (params: any, data: any, url: string): Promise<any> => {
  // const url = 'jnsw/pipenetwork/createTaskIncident'
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
// 片长，片区，部门
export const getPz = (): any => {
  const url = 'jnsw/base/pzList';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
export const getPq = (): any => {
  const url = 'jnsw/base/pqList';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
export const getBm = (): any => {
  const url = 'jnsw/base/bmList';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}

// 任务编号
export const getNum = (): Promise<any> => {
  const url = 'jnsw/task/serialNum';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}

// 任务状态
export const getStatus = (): Promise<any> => {
  const url = 'jnsw/newtask/status';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
// 任务事件图片下载
export const getTaskImg = (params: any): Promise<any> => {
  const url = 'jnsw/task/downloadTaskPic';
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
/* 任务详情：处理流程*/

// 任务详情
export const getTaskDetail = (id: string): Promise<any> => {
  const url = 'jnsw/task/detail/' + `${id}`;
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}

// 任务处理
export const getTaskCl = (params: any): Promise<any> => {
  const url = 'jnsw/task/cl';
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}

// 任务交办
export const getTaskJb = (params: any): Promise<any> => {
  const url = 'jnsw/task/jb';
  return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}

// 处理记录列表
export const getRecordList = (id: string): Promise<any> => {
  const url = 'jnsw/task/cljl/' + `${id}`;
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  });
}
