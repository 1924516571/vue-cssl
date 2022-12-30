/**
 * 一张图---人员
 */
import http from 'axios'
import qs from 'qs'

//获取人员表格数据
export const getPersonnelPage = (params: any) => {
    const url = "jnsw/base/pgrrquery"
    return http({
        url: url,
        params: params,
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }).then((res: any) => res.data).catch((err: any) => {
        console.log
    })
}
// 获取人员签到详情信息
export const getPersonnelDetail = (params: any) => {
    const url = "jnsw/sign/signDetail";
    return http.get(url, {params}).then((res: any) => res.data).catch(() => console.log)
}

