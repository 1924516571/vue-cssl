import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"

/**
 * 管网管理
 */


/**
 * 任务事件
 */
export const getTaskList = (params: any): Promise<any> => {
    const url = 'jnsw/newtask/listPipeNetWork';
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取当前片区
export const getPqInfo = (params: any, url: string): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

/**
 * 新建事件
 */

export const createTask = (params: any, data: any, url: string): any => {
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
        paramsSerializer: function (params: any) {
            return qs.stringify(params, { indices: false })
        },
        params: params,
        data: data
    }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}

// 获取抄送人详情
export const getCcDetail = (id: string): any => {
    return http.get("jnsw/newtask/ccDetail/" + id).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 片长，片区，部门，排涝片区，负责人，防汛分组
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
export const getPlpq = (): any => {
    const url = 'jnsw/base/plpqList';
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getFzr = (params: any): any => {
    const url = 'jnsw/manhole/charge';
    return http.post(url, null, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    });
}
export const getFxfz = (): any => {
    const url = 'jnsw/base/fxfzList';
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

// 任务类型
export const getType = (): Promise<any> => {
    const url = 'jnsw/newtask/type';
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
// 任务审核
export const getTaskAudit = (url: string, params: any): Promise<any> => {
    return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 任务类型下拉框
export const getTaskLxList = (): any => {
    const url = "jnsw/newtask/type"
    return http.get(url).then((res: any) => res.data).catch((err: any) => {
        SucMessage.error(err.data.message)
    })
}
// 获取巡查记录详情页信息
export const getXcRecordInfo = (params: any): any => {
    const url = "jnxc/rest/app/inspect/findInspectRecordInfo"
    return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => console.log(err))
}