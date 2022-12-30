import http from 'axios'
import qs from "qs"
import { SucMessage } from "@suc/ui"

/**
 * 水环境管理
 */


/**
 * 任务事件
 */
export const getTaskList = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listWaterEnvironment';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
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
            function (data: any) {
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
    const url = 'jnsw/newtask/detail/' + `${id}`;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 任务处理
// export const getTaskCl = (params:any):Promise<any> => {
//     const url = 'jnsw/task/cl';
//     return http.post(url,null,{params}).then((res:any) => res.data);
// }

// 任务交办
export const getTaskJb = (params: any): any => {
    const url = 'jnsw/newtask/assign';
    // return http.post(url, null, { params }).then((res: any) => res.data);
    return http({
        url: url,
        method: 'post',
        paramsSerializer: function (params: any) {
            return qs.stringify(params, { indices: false })
        },
        params: params,
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
export const getTaskJbYw = (params: any): any => {
    const url = 'jnsw/newtask/assignByDevOps';
    // return http.post(url, null, { params }).then((res: any) => res.data);
    return http({
        url: url,
        method: 'post',
        paramsSerializer: function (params: any) {
            return qs.stringify(params, { indices: false })
        },
        params: params,
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 退回任务事件
export const getTaskReturn = (params: any): any => {
    const url = "jnsw/newtask/returnTask"
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 处理记录列表
export const getRecordList = (id: string): Promise<any> => {
    const url = 'jnsw/newtask/dealRecord/' + `${id}`;
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}

// 进入详情改变指令状态
export const changeDispatchStatus = (id: string): Promise<any> => {
    const url = "jnsw/task/signRead/" + id
    return http.put(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}