// module.exports = function getServerTime() {
//   return new Promise((resolve) => {
//     const request = new XMLHttpRequest();
//     request.open("GET", "/", true);
//     request.send();
//     request.onreadystatechange = function() {
//       const serverTime = request.getResponseHeader("Date");
//       if (serverTime) {
//         resolve(Date.parse(serverTime));
//       } else {
//         resolve(new Date().valueOf()); //没网情况获取本地时间
//       }
//     };
//   });
// };

 export const getServerTime = () => {
  return new Promise((resolve: any, reject: any) => {
    const request = new XMLHttpRequest(); //创建http请求对象
    request.open("GET", "http://localhost:8080", true); // 感觉是建立连接参数(method,url,isAsync)，请求方式、请求地址、是否异步操作
    request.send();
    request.onreadystatechange = function() {
      const serverTime = request.getResponseHeader("Date");
      if (serverTime) {
        resolve(Date.parse(serverTime));
        console.log(serverTime,"我是服务器时间");
      } else {
        resolve(new Date().valueOf()); //没网情况获取本地时间
      }
    };
  });
};

