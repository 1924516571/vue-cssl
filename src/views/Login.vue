<template>
  <div class="login_body">
    <div class="login-top">
      <div>
        <img src="@/assets/cs/防汛应急2.png" alt="" />
        常熟市防汛决策支持系统
      </div>
    </div>
    <div class="login_main">
      <!-- <div class="login_main_item">
        <img src="../assets/login/picNoWord.png" alt="图片"/>
        <p>武进区</p>
        <p>水务一体化平台</p>
      </div> -->
      <div class="login_main_item">
        <div class="login_main_title"><span>欢迎登录!</span></div>
        <div class="login_main_list">
          <Form ref="loginForm" :model="loginForm" :rules="ruleForm" :label-width="0">
            <FormItem prop="userName">
              <Input type="text" v-model="loginForm.userName" placeholder="用户名" size="large" @keyup.enter.native="loginSubmit('loginForm')">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="loginForm.password" placeholder="密码" size="large" @keyup.enter.native="loginSubmit('loginForm')" style="margin: 20px 0">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="codeValue">
              <Input class="yanzhengma" type="text" v-model="loginForm.codeValue" placeholder="验证码" size="large" @keyup.enter.native="loginSubmit('loginForm')"> </Input>
              <span style="display:inline-block;cursor: pointer;" @click="refreshCode">
                <identify :identifyCode="identifyCode"></identify>
              </span>
            </FormItem>
            <!-- <FormItem prop="codeValue">
						<Row>
							<Col span="14">
							<Input class="code_input" type="text" v-model="loginForm.codeValue" placeholder="验证码" size="large"
							 @keyup.enter.native="loginSubmit('loginForm')">
							</Input>
							</Col>
							<Col span="8" offset="2" style="height:36px;">
							<img class="code_img" type="image" id="checkImg" :src="codeImg" />
							</Col>
						</Row>
					</FormItem> -->
            <FormItem>
              <Button type="primary" @click.prevent="loginSubmit('loginForm')" size="large" long>登 录 </Button>
            </FormItem>
          </Form>
          <!-- <div>
            <span>还未注册? 请先</span>
            <router-link to="/register">注册</router-link>
          </div> -->
          <div class="qrcode" ref="qrCodeUrl" v-cloak>
            <!-- <img src="../assets/app.png" style="width: 100px;height:100px;opacity: 0.7;" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import qs from "qs";
import { Vue, Component } from "vue-property-decorator";
import { FormItem, Icon, Form, Input, Button } from "iview";
import Axios from "axios";
import store from "@/stores";
import QRCode from "qrcodejs2";
import { Identify } from "@/components";
import { publicApi } from "@/api";

const validateName = (rule: any, value: string, callback: Function) => {
  if (value === "") {
    callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
};
const validatePass = (rule: any, value: string, callback: Function) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};
const validateCode = (rule: any, value: string, callback: Function) => {
  if (value === "") {
    callback(new Error("验证码不能为空"));
  } else {
    callback();
  }
};
// const validateCode = (rule, value, callback) => {
// 	if (value === '') {
// 		callback(new Error('验证码不能为空'));
// 	}
// 	setTimeout(() => {
// 		if (value.length == 4) {
// 			this.$http.get("/rest/authox/checkCodeValidate?value=" + this.loginForm.codeValue).then(res => {
// 				if (res.data === 'false') {
// 					callback(new Error('验证码错误'));
// 				} else {
// 					callback();
// 				}
// 			}).catch(err => {
// 				console.log(err);
// 			});

// 		} else {
// 			callback(new Error('验证码错误'));
// 		}
// 	}, 800);
// };
@Component({
  components: {
    FormItem,
    Icon,
    Form,
    Input,
    Button,
    Identify
  },
})
export default class login extends Vue {
  codeImg = "";
  codeCheck = {};
  loginForm = {
    userName: "",
    codeValue: "",
    password: "",
    appid: "EcoZtyGVp3xfwFe5",
    appsecret: "RWNvWnR5R1ZwM3hmd0ZlNTIwMjIwNzExMTUxMzA5",
    scope: "all",
  };
  ruleForm = {
    userName: [
      {
        validator: validateName,
        trigger: "blur",
      },
    ],
    password: [
      {
        validator: validatePass,
        trigger: "blur",
      },
    ],
    codeValue: [{
    	validator: validateCode,
    	trigger: 'blur'
    }]
  };
  // 图片验证码
  identifyCode = "";
  // 验证码规则
  identifyCodes = "3456789abcdefhijkmnprstuvwxyz";
  refreshCode() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
  makeCode(o: any, l: any) {
    for (let i = 0; i < l; i++) {
      this.identifyCode += this.identifyCodes[Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)];
    }
  }
  created() {
    //this.getCodeImg();
  }

  getCodeImg() {
    this.$http
      .get("/rest/authox/checkCode?size=120*36")
      .then((res) => {
        this.codeImg = "data:image/gif;base64," + res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  mounted() {
    // this.creatQrCode();
    this.getDownUrl();
    this.refreshCode();
  }
  // 获取下载地址
  getDownUrl() {
    let that = this;
    that.$base
      .get("wjServer/app/version/getLastVersion")
      .then((res: any) => {
        if (res.status === 200) {
          let downloadurl = res.data.data.downloadurl;
          this.creatQrCode(downloadurl);
        }
      })
      .catch((err) => {
        this.$SucMessage.error("获取二维码失败");
      });
  }
  //生成二维码
  creatQrCode(text: any) {
    var qrcode = new QRCode(this.$refs.qrCodeUrl, {
      // text: "http://112.25.132.104:8088/api/wjBaseServer/minio/file/downloadFromFile?fileId=cswater-release-1.1.4-202207041458&fileType=apk", // 需要转换为二维码的内容
      text,
      width: 100,
      height: 100,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  //  登录提交
  loginSubmit(name: string) {
    localStorage.removeItem("refresh-token"); //移出token
    let that = this;
    const form: any = that.$refs[name];
    form.validate((valid: any) => {
      if (valid) {
        that
          .$http({
            url: "wjAuthServer/authentication/pwd",
            // url: "wjAuthServer/authentication/admin-login",
            method: "post",
            data: qs.stringify({
              //关键方法  qs.stringify({}) 将对象序列化成字符串，以'&' 拼接username=admin&password=123456    qs.parse() 字符串转换成对象
              username: this.loginForm.userName,
              password: this.loginForm.password,
              appid: this.loginForm.appid,
              appsecret: this.loginForm.appsecret,
              scope: this.loginForm.scope,
              checkCode: this.loginForm.codeValue,
              withToken: true,
            }),
            // headers: {
            //   'Content-Type': 'application/x-www-form-urlencoded'
            // }
          })
          .then((res) => {
            let tk = res.data.data["access_token"];
            localStorage.setItem("refresh-token", tk);
            that.$http.defaults.headers["Authorization"] = "bearer " + tk;
            Axios.defaults.headers["Authorization"] = "bearer " + tk;
            // if (this.$route.query.redirect) {
            //   this.$router.push(<string>this.$route.query.redirect)
            // } else {
            //   this.$router.push('/')
            // }

            that.$http
              .get("/wjAuthServer/authentication/user/infoByToken")
              .then((res) => {
                //一般为获取用户信息，error则未登录
                if (res.status === 200) {
                  // this.getUserInfo(res.data);
                  // store.commit("getUserInfo", res.data);
                  store.commit("getUserInfo", res.data.data);
                  const uid = res.data.data.id;
                  const roleName = res.data.data.roleName;
                  const departmentId = res.data.data.departmentId; //部门id
                  const departmentName = res.data.data.departmentName; //部门 名字
                  const reporter = res.data.data.realname; //上报人
                  const areaCode = res.data.data.areaCode; //用户区域
                  window.localStorage.setItem("userInfo", JSON.stringify(res.data.data)); //用户信息存这种json字符串  JSON.parse() 存用户的信息
                  localStorage.setItem("userId", uid); //用户id
                  localStorage.setItem("roleName", roleName); //用户角色
                  localStorage.setItem("departmentId", departmentId); //部门id
                  localStorage.setItem("departmentName", departmentName); //部门名称
                  localStorage.setItem("reporter", reporter); //上报人
                  localStorage.setItem("areaCode", areaCode); //当前登录用户区域信息
                }
              })
              .catch((err) => {
                console.log(err);
              });

            // this.selectDefault();
            this.test();
          })
          .catch((err) => {
            this.$SucMessage.error("登录失败!");
            this.refreshCode(); //失败重置验证码
          });
      } else {
        this.$SucMessage.error("登录失败!");
        this.refreshCode(); //失败重置验证码
      }
    });
  }
  /**
   * 

  authox判斷
  selectDefault() {
    this.$http.get("/rest/authox/check?resource=" + "home" + "&op=" + "access").then((res) => {
      if (res.data.allowed) {
        this.$router
          .push({
            path: "/main/home/overview",
            // path: "/main/floodmanage/statusbz",
          })
          .catch((err) => err);
      } else {
        this.$http.get("/rest/authox/check?resource=" + "aPicture" + "&op=" + "access").then((res) => {
          if (res.data.allowed) {
            this.$router.push({
              path: "/main/aPicture",
            });
          } else {
            this.$http.get("/rest/authox/check?resource=" + "xckh" + "&op=" + "access").then((res) => {
              if (res.data.allowed) {
                this.$router.push({
                  path: "/main/assessment",
                });
              } else {
                this.$http.get("/rest/authox/check?resource=" + "pieNetwork" + "&op=" + "access").then((res) => {
                  if (res.data.allowed) {
                    this.$router.push({
                      path: "/main/pieNetwork",
                    });
                  } else {
                    this.$http.get("/rest/authox/check?resource=" + "environment" + "&op=" + "access").then((res) => {
                      if (res.data.allowed) {
                        this.$router.push({
                          path: "/main/environment",
                        });
                      } else {
                        this.$http.get("/rest/authox/check?resource=" + "flood" + "&op=" + "access").then((res) => {
                          if (res.data.allowed) {
                            this.$router.push({
                              path: "/main/flood",
                            });
                          } else {
                            this.$http.get("/rest/authox/check?resource=" + "film" + "&op=" + "access").then((res) => {
                              if (res.data.allowed) {
                                this.$router.push({
                                  path: "/main/film",
                                });
                              } else {
                                this.$http.get("/rest/authox/check?resource=" + "statistic" + "&op=" + "access").then((res) => {
                                  if (res.data.allowed) {
                                    this.$router.push({
                                      path: "/main/statistic",
                                    });
                                  } else {
                                    this.$http.get("/rest/authox/check?resource=" + "dataCenter" + "&op=" + "access").then((res) => {
                                      if (res.data.allowed) {
                                        this.$router.push({
                                          path: "/main/dataCenter",
                                        });
                                      } else {
                                        this.$http.get("/rest/authox/check?resource=" + "system" + "&op=" + "access").then((res) => {
                                          if (res.data.allowed) {
                                            this.$router.push({
                                              path: "/main/system",
                                            });
                                          } else {
                                          }
                                        });
                                      }
                                    });
                                  }
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  */

  selectDefault() {
    this.$http
      .get("/rest/authox/check?resource=" + "cssljcd" + "&op=" + "access")
      .then((res) => {
        if (res.data.allowed) {
          this.$router.push({ path: "/dp" }).catch((err) => err);
        } else {
          this.$http.get("/rest/authox/check?resource=" + "csslsy" + "&op=" + "access").then((res) => {
            if (res.data.allowed) {
              this.$router.push({ path: "/main/homePage/overview" });
            } 
            else {
              this.$http.get("/rest/authox/check?resource=" + "csslsqxx" + "&op=" + "access").then((res) => {
                if (res.data.allowed) {
                  this.$router.push({ path: "/main/homePage/sq" });
                } else {
                  this.$http.get("/rest/authox/check?resource=" + "csslyqxx" + "&op=" + "access").then((res) => {
                    if (res.data.allowed) {
                      this.$router.push({ path: "/main/homePage/yq" });
                    } else {
                      this.$http.get("/rest/authox/check?resource=" + "csslqxxx" + "&op=" + "access").then((res) => {
                        if (res.data.allowed) {
                          this.$router.push({ path: "/main/homePage/weatherInfo" });
                        } else {
                          this.$http.get("/rest/authox/check?resource=" + "cssltflj" + "&op=" + "access").then((res) => {
                            if (res.data.allowed) {
                              this.$router.push({ path: "/main/homePage/tfInfo" });
                            } else {
                              this.$http.get("/rest/authox/check?resource=" + "csslddzl" + "&op=" + "access").then((res) => {
                                if (res.data.allowed) {
                                  this.$router.push({ path: "/main/homePage/dispatchCom" });
                                } else {
                                  this.$http.get("/rest/authox/check?resource=" + "csslzzry" + "&op=" + "access").then((res) => {
                                    if (res.data.allowed) {
                                      this.$router.push({ path: "/main/homePage/zbPeople" });
                                    } else {
                                      this.$http.get("/rest/authox/check?resource=" + "csslwzcb" + "&op=" + "access").then((res) => {
                                        if (res.data.allowed) {
                                          this.$router.push({ path: "/main/homePage/wzcb" });
                                        } else {
                                          this.$http.get("/rest/authox/check?resource=" + "csslbjsj" + "&op=" + "access").then((res) => {
                                            if (res.data.allowed) {
                                              this.$router.push({ path: "/main/homePage/alarm" });
                                            } else {
                                              this.$http.get("/rest/authox/check?resource=" + "csslgghd" + "&op=" + "access").then((res) => {
                                                if (res.data.allowed) {
                                                  this.$router.push({ path: "/main/homePage/hdVideo" });
                                                } else {
                                                  this.$http.get("/rest/authox/check?resource=" + "csslwyh" + "&op=" + "access").then((res) => {
                                                    if (res.data.allowed) {
                                                      this.$router.push({ path: "/main/homePage/wyhVideo" });
                                                    } else {
                                                      this.$http.get("/rest/authox/check?resource=" + "csslcqdbw" + "&op=" + "access").then((res) => {
                                                        if (res.data.allowed) {
                                                          this.$router.push({ path: "/main/homePage/cqVideo" });
                                                        } else {
                                                          this.$http.get("/rest/authox/check?resource=" + "csslcjc" + "&op=" + "access").then((res) => {
                                                            if (res.data.allowed) {
                                                              this.$router.push({ path: "/main/homePage/cjcVideo" });
                                                            } else {
                                                              this.$http.get("/rest/authox/check?resource=" + "csslyld" + "&op=" + "access").then((res) => {
                                                                if (res.data.allowed) {
                                                                  this.$router.push({ path: "/main/homePage/newYldVideo" });
                                                                }
                                                              });
                                                            }
                                                          });
                                                        }
                                                      });
                                                    }
                                                  });
                                                }
                                              });
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err, ">>>");

        this.$SucMessage.error("无访问权限!");
      });
  }

  test() {
    this.$router.push({
      path: "/dp",
    });
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
.yanzhengma {
  width: 72%;
  margin-top: -6%;
}
.login_body {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  // align-items: center;
  // padding-right: 300px;
  background: url("../assets/login/cs1.jpg") no-repeat center;
  background-size: 100% auto;
  .login-top {
    position: absolute;
    top: calc(50% - 280px);
    font-size: 37px;
    color: #ffffff;
    font-weight: 900;
    width: 520px;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      // border-radius: 6px;
    }
  }
  .login_main {
    position: absolute;
    // left: calc(50% - 200px);
    top: calc(50% - 180px);
    // position: relative;
    display: flex;
    justify-content: space-between;
    text-align: center;
    // width: 1070px;
    height: 560px;
    border-radius: 8px;
    padding: 0 40px;
    background-color: rgb(255, 255, 255, 0.7);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);
    .login_main_item {
      height: 100%;
      .qrcode {
        position: relative;
        display: flex;
        justify-content: center;
        top: -15px;
      }
      &:first-of-type {
        width: 560px;
        img {
          position: absolute;
          top: -20px;
          left: 40px;
        }
        p {
          color: white;
          z-index: 999;
          font-size: 50px;
          font-weight: 900;
          flex-wrap: wrap;
          font-family: serif;
          position: absolute;
          text-align: left;
          &:nth-child(2) {
            width: 300px;
            top: 20px;
            left: 80px;
          }
          &:nth-child(3) {
            width: 600px;
            top: 85px;
            left: 80px;
          }
        }
      }
      &:nth-of-type(2) {
        width: calc(100% - 560px);
        // height: 100%;
      }
    }
    .login_main_title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 120px;
      font-size: 28px;
      color: #7498d1;
      //   background: url('../assets/login/title.png') no-repeat;
      //   background-position: center;
    }
    .login_main_list {
      // padding: 0 0 0 40px;
      // height: calc(100% - 90px);
      padding: 0 40px;
    }
    .code_img {
      width: 100%;
      height: 36px;
    }
  }

  #{$deep}.ivu-input-group-large .ivu-input,
  .ivu-input-group-large > .ivu-input-group-append,
  .ivu-input-group-large > .ivu-input-group-prepend {
    height: 45px !important;
    line-height: 45px !important;
  }

  #{$deep}.ivu-btn > span {
    font-size: 19px;
  }
  [v-cloak] {
    display: none !important;
  }
}
</style>
