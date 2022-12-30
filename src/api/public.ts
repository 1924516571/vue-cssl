import http from 'axios'
import qs from 'qs'
import { SucMessage } from "@suc/ui"
export const proxyurl = "http://192.168.6.98:8088";

// 当前用户信息
export const getCurUser = (): Promise<any> => {
  const url = '/rest/authox/curUser'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 片区
export const getPq = (): Promise<any> => {
  const url = 'jnsw/base/pqList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 区划ZKZY
export const getQhByZKZY = (): Promise<any> => {
  const url = 'xckh/plan/report/getZoneType'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//惠山行政区域
export const getHsqy = (): Promise<any> => {
  const url = 'wjBaseServer/system/organization/wxList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 周期列表
export const getZhouqi = (): Promise<any> => {
  const url = 'xckh/plan/report/getCycleType'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 养护对象
export const getYHDX = (params: any) => {
  const url = "xckh/plan/report/getYhdxType"
  return http({
      url: url,
      params: params,
      paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
      }
  }).then((res: any) => res.data).catch((err: any) => {
  })
}

// 养护对象(不包含全部)
export const getYhdxTypeWhenReport = (params: any): Promise<any> => {
  const url = 'xckh/plan/report/getYhdxTypeWhenReport'
  return http({
    url: url,
    params: params,
    paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
    }
}).then((res: any) => res.data).catch((err: any) => {
})

}

// 排涝片区
export const getPlpq = (): Promise<any> => {
  const url = 'jnsw/base/plpqList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

//  行政区域1级
export const getXzqy1 = (): Promise<any> => {
  const url = 'jnsw/base/xzqyH1'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 行政区域2级
export const getXzqy2 = (params: any): Promise<any> => {
  const url = 'jnsw/base/xzqyH2'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 部门
export const getBm = (): Promise<any> => {
  const url = 'jnsw/base/bmList';
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
// 创建/新增（包含附件）
export const createWithFile = (params: any, data: any, url: string): any => {
  return http({
    method: 'post',
    url: url,
    data: data,
    params: params,
    transformRequest: [
      function (data) {
        return data
      }
    ],
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
export const onImageLoad = (url: string): any => {
  return http.get(url, { responseType: 'arraybuffer' }).then(res => {
    return window.URL.createObjectURL(new Blob([res.data], { type: 'application/octet-stream' }))
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
export const ondownload = (url: string): any => {
  return http.get(url, { responseType: 'blob' }).then((res: any) => {
    if (res.status == 200 && res.data) {
      let disposition = res.headers['content-disposition']
      let fileName = decodeURI(
        disposition.substring(
          disposition.indexOf('filename=') + 9,
          disposition.length
        )
      )
      let blob = new Blob([res.data], { type: 'application/octet-stream' })
      let link = URL.createObjectURL(blob)
      let alink = document.createElement('a')
      alink.href = link
      alink.download = fileName
      alink.click()
      alink.remove()
    }
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}
//乘法计算-避免精度损失
export const numMulti = (num1: any, num2: any): any => {
  let baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {
  }
  return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}
//除法计算-避免精度损失
export const numDiv = (num1: any, num2: any): any => {
  let baseNum1 = 0, baseNum2 = 0;
  let baseNum3, baseNum4;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum3 = Number(num1.toString().replace(".", ""));
  baseNum4 = Number(num2.toString().replace(".", ""));
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}
//加法计算-避免精度损失
export const numAdd = (num1: any, num2: any): any => {
  let baseNum, baseNum1, baseNum2;
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
//减法计算-避免精度损失
export const numSub = (num1: any, num2: any): any => {
  let baseNum, baseNum1, baseNum2;
  let precision;// 精度
  try {
    baseNum1 = num1.toString().split(".")[1].length;
  } catch (e) {
    baseNum1 = 0;
  }
  try {
    baseNum2 = num2.toString().split(".")[1].length;
  } catch (e) {
    baseNum2 = 0;
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}
// 运维单位
export const getYwdw = (): Promise<any> => {
  const url = 'jnsw/base/ywdwList'
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 运维人员
export const getYwRy = (id: string): Promise<any> => {
  const url = 'jnsw/base/ywryList';
  let params = {
    ywryId: id
  }
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 派单
export const onDispatch = (params: any): Promise<any> => {
  const url = 'jnsw/task/gzcl';
  return http({
    method: 'post',
    url: url,
    params: params,
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false })
    },
  }).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}

// 隐藏所有未达标数据
export const hideData = (): Promise<any> => {
  const url = "hjzl/rest/manage/hide";
  return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 隐藏所有未达标数据
export const hideData1 = (): Promise<any> => {
  const url = "jnsw/rest/manage/hide";
  return http.get(url).then((res: any) => res.data).catch(() => console.log)
}
// 获取单位下拉框
export const getGyList = () => {
  const url = "jnsw/base/ywdwList";
  return http.get(url).then((res: any) => res.data)
}

// 获取单位类型下拉框
export const getDwlxList = () => {
  const url = "jnsw/ywdw/option";
  return http.get(url).then((res: any) => res.data)
}

// 获取管养单位下拉框
export const getGyOptions = () => {
  const url = "jnsw/ywdw/gyList";
  return http.get(url).then((res: any) => res.data).catch(() => console.log)
}

//定位/获取计划对应管网路径
export const getSelectGwljByPlanId = (params: any): Promise<any> => {
  const url = 'xckh/plan/report/selectGwljByPlanId'
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
    SucMessage.error(err.data.message)
  })
}


/**
 * 
 * **********************************************************************************************
 */

// 行政区域
export const getAreaCode = (): any => {
  const url = 'wjBaseServer/system/organization/queryWjD3Tree';
  return http.get(url).then((res: any) => res.data);
}


// get请求不带参数
export const getNoParam = ( url: string): Promise<any> => {
  return http.get(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.desc)
  })
}

// get请求带参数
export const getWithParam = (url: string,params: any): Promise<any> => {
  return http.get(url, { params }).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.desc)
  })
} 
// post请求带参数 form
export const postWithParam = (url: string, params: any): Promise<any> => {
  return http.post(url, qs.stringify(params, { indices: false })).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// post请求带参数 Json
export const postWithParamJson = (url: string, params: any): Promise<any> => {
  return http({
      url: url,
      method: "post",
      data: params,
      headers: {
          "Content-Type": 'application/json',
      }
  }).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// post请求不带参数
export const postNoParam = (url: string): Promise<any> => {
  return http.post(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}
// put带参数
export const putWithParam = (url: string,params: any): Promise<any> => {
  return http.put(url,params).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// put请求带参数 Json
export const putWithParamJson = (url: string, params: any): Promise<any> => {
  return http({
      url: url,
      method: "PUT",
      data: params,
      headers: {
          "Content-Type": 'application/json',
      }
  }).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// put不带参数
export const putNoParam = (url: string): Promise<any> => {
  return http.put(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// delete删带参数
export const deleteWithParam = (url: string,params: any): Promise<any> => {
  return http.delete(url,{params}).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

// delete不带参数
export const deleteNoParam = (url: string): Promise<any> => {
  return http.delete(url).then((res: any) => res.data).catch((err: any) => {
      SucMessage.error(err.data.message)
  })
}

