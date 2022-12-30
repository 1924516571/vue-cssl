<template>
  <div class="header_bar">
    <div class="bar-item">
      <span class="tb"><img src="@/assets/cs/防汛应急.png" alt=""/></span>
      <span>常熟市防汛决策支持系统</span>
    </div>
    <!-- <iframe
      width="500"
      scrolling="no"
      height="80"
      frameborder="0"
      allowtransparency="true"
      src="https://i.tianqi.com?c=code&id=10&color=%23FFFFFF&bgc=%23002060&bdc=%23002060&icon=1&py=changshu&site=20"
    ></iframe> -->
    <Menu mode="horizontal" theme="primary" :active-name="activeNav">
      <!-- <MenuItem name="home" to="/main/home" v-authox="'home|access'">
        <span>首页</span>
      </MenuItem> -->
      <!-- <MenuItem name="dataCenter" to="/main/dataCenter" v-authox="'dataCenter|access'">
        <span>数据中心</span>
      </MenuItem> -->
      <!-- <MenuItem name="home" to="/main/home">
        <span>首页</span>
      </MenuItem> -->

      <!-- <MenuItem name="geologyInformation" to="/main/geologyInformation">
        <span>地理信息</span>
      </MenuItem> -->
      <!-- <MenuItem name="floodMessage" to="/main/floodMessage">
        <span>防汛决策</span>
      </MenuItem>
      <MenuItem name="dataCenter" to="/main/dataCenter">
        <span>数据中心</span>
      </MenuItem> -->

      <MenuItem name="4" v-authox="'sendMesssage|access'">
        <div class="aa duanxin" @click="sendMessage">
          <span>发送短信</span>
        </div>
      </MenuItem>
      <!--防汛等级 -->
      <MenuItem name="1" v-if="isdisPlay">
        <div class="aa" :class="isbgc">
          <span style="vertical-align: -webkit-baseline-middle;padding-right: 5px;"><img src="@/assets/cs/icontop/yun.png" alt=""/></span>
          <span>{{ level }}</span>
        </div>
      </MenuItem>
      <!-- 台风等级 -->
      <MenuItem name="3" v-if="tFdisPlay">
        <div class="aa" :class="tFbgc">
          <span style="vertical-align: -webkit-baseline-middle;padding-right: 5px;"><img src="@/assets/cs/icontop/tf.png" style="width:18px;height:18px" alt=""/></span>
          <span>{{ tFlevel }}</span>
        </div>
      </MenuItem>
      <MenuItem name="2">
        <div class="aa xunqi">
          <span style="vertical-align: -webkit-baseline-middle;padding-right: 5px;"><img :src="waterIcon" alt=""/></span>
          <span>{{ waterText }}</span>
        </div>
      </MenuItem>
      <Submenu name="7">
        <template slot="title">
          <span class="qtxt">
            <i class="el-icon-setting"></i>
            <span>其他系统</span>
          </span>
        </template>

        <!-- <MenuItem name="7-1">
          <span @click="toCj">长江处视频</span>
        </MenuItem>
        <MenuItem name="7-2">
          <span @click="toYld">易捞点视频</span>
        </MenuItem> -->
        <!-- <MenuItem name="7-3">
          <span @click="toPsxt">城市排水防涝综合管理平台</span>
        </MenuItem> -->
        <!-- <MenuItem name="7-7">
          <span @click="toSwSystem">城区支河水位监测系统</span>
        </MenuItem> -->
        <MenuItem name="7-4">
          <span @click="toSzjc">水质监测系统</span>
        </MenuItem>
        <!-- <MenuItem name="7-5">
          <span @click="toUser">后台管理系统</span>
        </MenuItem> -->
        <MenuItem name="7-6">
          <span @click="toOldsystem">常熟市水利信息化综合管理平台</span>
        </MenuItem>
      </Submenu>

      <Submenu name="8">
        <template slot="title">
          <Icon type="md-person" />
          <span>{{ this.username }}</span>
        </template>
        <MenuItem name="8-1">
          <span @click="toDp">综合决策</span>
        </MenuItem>
        <MenuItem name="8-2">
          <span @click="logout">注销登录</span>
        </MenuItem>
        <MenuItem name="8-3">
          <span @click="changePassword">密码修改</span>
        </MenuItem>
      </Submenu>
    </Menu>
    <Modal v-model="model" title="修改密码" @on-ok="saved('formCustom')" @on-cancel="model = false">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
        <FormItem prop="passwd" label="新密码：">
          <Input type="password" v-model="formCustom.passwd" placeholder="请输入新密码" />
        </FormItem>
        <FormItem prop="passwdCheck" label="密码确认：">
          <Input type="password" v-model="formCustom.passwdCheck" placeholder="请再次输入新密码" />
        </FormItem>
      </Form>
    </Modal>

    <Modal v-model="messageModal" title="发送短信" @on-ok="savedMessage('formMessage')" @on-cancel="messageModal = false">
      <Form ref="formMessage" :model="formMessage" :rules="ruleMessage" :label-width="80" style="width: 300px">
        <template v-for="(item, index) in formMessage.telephoneNumber">
          <FormItem v-if="item.status" :key="index" :label="'手机号' + item.index" :prop="'telephoneNumber.' + index + '.value'" :rules="{ required: true, validator: mobilepoe, trigger: 'blur' }">
            <Row>
              <Col span="18">
                <Input type="text" v-model="item.value" placeholder="请正确输入手机号"></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="handleRemove(index)">删除手机号</Button>
              </Col>
            </Row>
            <!-- <Input v-model="formMessage.telephoneNumber" placeholder="请输入接收人手机号" /> -->
          </FormItem>
        </template>
        <FormItem>
          <Row>
            <Col span="12">
              <Button type="dashed" @click="handleAdd" icon="md-add">添加手机号</Button>
            </Col>
          </Row>
        </FormItem>

        <FormItem prop="messageContent" label="短信内容:">
          <Input v-model="formMessage.messageContent" placeholder="请输入短信内容" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation, Action, namespace } from "vuex-class";
import { Menu, MenuItem, Icon, Modal, Form, FormItem, Input, Row, Col, Button } from "iview";
import axios from "axios";
import { values, divide } from "lodash";
import { hideData } from "../../api/public";
import { publicApi } from "@/api";
import { ModalConfig } from "@suc/ui/interfaces/index";
const mapStore = namespace("mapStore");

//@ts-ignore
const Submenu = Menu.Sub;

@Component({
  components: {
    Menu,
    MenuItem,
    Submenu,
    Icon,
    Modal,
    Form,
    FormItem,
    Input,
    Row,
    Col,
    Button,
  },
})
export default class topBar extends Vue {
  @State user: any;
  @mapStore.Mutation setMarkers: any;
  @mapStore.Mutation setMarkerFlag: any;
  @Watch("$route", { deep: true })
  changeRoute(val: any) {
    let reg = /home|aPicture|accessment|pieNetwork|environment|flood|film|statistic|dataCenter|management|system/g;
    if (val.path.match(reg)) {
      this.setMarkers([]);
      this.setMarkerFlag("");
    }
  }
  activeNav: string = "";
  model: boolean = false; //弹框默认的是关闭的
  messageModal: boolean = false; //短信弹框
  formCustom: any = {
    password: null,
    passwd: null,
    passwdCheck: null,
  };
  index: any = 1;
  formMessage: any = {
    telephoneNumber: [
      {
        value: "",
        index: 1,
        status: 1,
      },
    ],
    messageContent: "",
  };
  // 验证手机号
  mobilepoe: any = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error("手机号不能为空"));
    } else if (!/^1[2-9]\d{9}$/.test(value)) {
      callback("手机号格式不正确");
    } else {
      callback();
    }
  };

  ruleMessage: any = {
    telephoneNumber: [{ required: true, message: "请输入手机号", trigger: "blur" }],
    messageContent: [{ required: true, message: "请输入短信内容", trigger: "blur" }],
    // telephoneNumber: [{ required: true, validator: this.validateTel, trigger: "change" }],
    // messageContent: [{ required: true, validator: this.validateMessage, trigger: "change" }],
  };
  validatePass: any = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (this.formCustom.passwdCheck !== "") {
        // 对第二个密码框单独验证
        let form: any = this.$refs.formCustom;
        form.validateField("passwdCheck");
      }
      callback();
    }
  };
  validatePassCheck: any = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入新密码"));
    } else if (value !== this.formCustom.passwd) {
      callback(new Error("两次新密码输入不匹配!"));
    } else {
      callback();
    }
  };
  ruleCustom: any = {
    password: [{ required: true, message: "请输入密码" }],
    passwd: [{ required: true, validator: this.validatePass, trigger: "change" }],
    passwdCheck: [{ required: true, validator: this.validatePassCheck, trigger: "change" }],
  };

  username: any = "";
  mounted() {
    this.username = localStorage.getItem("reporter");
    this.activeNav = this.$route.matched[1].meta.name;
    // 获取防汛等级
    this.getFxleve();
    // 判断是否为汛期
    this.getIsxq();
  }
  isdisPlay: boolean = false;
  tFdisPlay: boolean = false;
  isbgc: any = "";
  tFbgc: any = "";
  level: any = "";
  tFlevel: any = "";
  waterText: any = "";
  waterIcon: any = "";

  getIsxq() {
    let month: number = new Date().getMonth() + 1;
    if (Number(month) > 4 && Number(month) < 10) {
      console.log("7777");
      this.waterText = "汛期";
      this.waterIcon = require("@/assets/cs/icontop/rain.png");
    } else {
      this.waterText = "非汛期";
      this.waterIcon = require("@/assets/cs/icontop/非汛期.png");
    }
  }

  handleAdd() {
    this.index++;
    this.formMessage.telephoneNumber.push({
      value: "",
      index: this.index,
      status: 1,
    });
  }
  handleRemove(index: any) {
    this.formMessage.telephoneNumber[index].status = 0;
  }

  // 发送短信
  sendMessage() {
    this.messageModal = true;
    this.formMessage = {
      telephoneNumber: [
        {
          value: "",
          index: 1,
          status: 1,
        },
      ],
      messageContent: "",
    };
  }

  async savedMessage(name: any) {
    (this.$refs[name] as any).validate((valid: any) => {
      if (valid) {
        let arr = [];
        let str = "";
        let url = "wjServer/sms/sendSms";
        if (this.formMessage.telephoneNumber.length > 0) {
          arr = this.formMessage.telephoneNumber.map((e: any) => {
            return e.value;
          });
          str = arr.join("/"); //用斜杠隔开
        }
        let params: any = {
          mes: this.formMessage.messageContent,
          receiver: str,
        };
        publicApi.postWithParamJson(url, params).then((data: any) => {
          if (data.result) {
            this.$Message.success("短信发送成功");
            this.messageModal = false;
          } else {
            this.$Message.error("短信发送失败");
            this.messageModal = false;
          }
        });
      } else {
        this.messageModal = true;
      }
    });
  }

  // 退出登录
  logout() {
    let that = this;
    that.$http
      .get("wjAuthServer/authentication/logout")
      .then((res) => {
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roleName");
        localStorage.removeItem("departmentId");
        localStorage.removeItem("departmentName");
        localStorage.removeItem("reporter");
        localStorage.removeItem("areaCode");
        localStorage.removeItem("userInfo");
        that.$http.defaults.headers["refresh-token"] = undefined;
        axios.defaults.headers["Authorization"] = undefined;
        that.$router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //跳转大屏
  toDp() {
    this.$router.push({ path: "/dp" });
  }
  // 跳转到长江处视频
  toCj() {
    window.open("http://222.92.8.77:13000/", "_blank");
  }
  // 跳转到易捞点视频
  toYld() {
    window.open("http://www.189eyes.com:8000/", "_blank");
  }
  // 跳转到排水系统
  toPsxt() {
    window.open("http://58.211.255.58:170/", "_blank");
  }

  toSwSystem() {
    window.open("http://www.mxonline.net/app/login.jsp", "_blank");
  }
  // 跳转到水质监测系统
  toSzjc() {
    window.open("http://222.92.166.238:9000/EQMSPortalCS/dist/index.html", "_blank");
  }
  // 跳转都back系统
  toUser() {
    window.open("http://112.25.132.104:8089/back/", "_blank");
  }
  // 常熟老系统
  toOldsystem() {
    window.open("http://58.210.181.114:8087/xinzsl/", "_blank");
  }

  // 修改密码
  changePassword() {
    this.model = true;
  }
  saved(name: string) {
    let ref: any = this.$refs[name];
    ref.validate((valid: any) => {
      if (valid) {
        let url = "wjBaseServer/system/user/updateUserPassword";
        let params: any = {
          // old: this.formCustom.password,
          password: this.formCustom.passwd,
        };
        axios.put(url, null, { params }).then((res: any) => {
          if (res.data.result) {
            this.$Message.success("密码修改成功!");
            this.$router.push("/login");
          }
        });
      } else {
        this.$Message.error("修改失败!");
      }
    });
  }
  // 防汛和台风等级接口
  async getFxleve() {
    let url = "wjServer/fangxunjc/ermanager/getOnlinePlan";
    let data = await publicApi.getNoParam(url);
    if (data.result) {
      if (data.data.fxLevel == 4) {
        this.isbgc = "blue";
        this.level = "Ⅳ级";
        this.isdisPlay = true;
      } else if (data.data.fxLevel == 3) {
        this.isbgc = "yellow";
        this.level = "Ⅲ级";
        this.isdisPlay = true;
      } else if (data.data.fxLevel == 2) {
        this.isbgc = "orange";
        this.level = "Ⅱ级";
        this.isdisPlay = true;
      } else if (data.data.fxLevel == 1) {
        this.isbgc = "red";
        this.level = "Ⅰ级";
        this.$nextTick(() => {
          this.isdisPlay = true;
        });
      } else {
        this.isdisPlay = false;
      }
      if (data.data.tfLevel == 4) {
        this.tFbgc = "blue";
        this.tFlevel = "Ⅳ级";
        this.tFdisPlay = true;
      } else if (data.data.tfLevel == 3) {
        this.tFbgc = "yellow";
        this.tFlevel = "Ⅲ级";
        this.tFdisPlay = true;
      } else if (data.data.tfLevel == 2) {
        this.tFbgc = "orange";
        this.tFlevel = "Ⅱ级";
        this.tFdisPlay = true;
      } else if (data.data.tfLevel == 1) {
        this.tFbgc = "red";
        this.tFlevel = "Ⅰ级";
        this.tFdisPlay = true;
      } else {
        this.tFdisPlay = false;
      }
    } else {
      this.isdisPlay = false;
    }
  }
}
</script>
<style lang="scss" scoped>
$deep: "::v-deep";
#{$deep}.header_bar {
  min-width: 900px;
  .ivu-menu-item-active {
    background: none;
  }
  .ivu-menu-item {
    cursor: auto;
  }
  .aa {
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .blue {
    background-image: url("../../assets/cs/icontop/bluebackground.png");
  }
  .yellow {
    background-image: url("../../assets/cs/icontop/yellowbackground.png");
  }
  .orange {
    background-image: url("../../assets/cs/icontop/orangebackground.png");
  }
  .red {
    background-image: url("../../assets/cs/icontop/redbackground.png");
  }
  .xunqi {
    background-image: url("../../assets/cs/icontop/rainbackground.png");
  }
  .qtxt {
    background: linear-gradient(302deg, #006cff 0%, #009eff 100%);
    border-radius: 2px;
    height: 40px;
    display: inline-block;
    width: 120px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
  }
  .duanxin {
    background: url("../../assets/cs/icontop/bluebackground.png") no-repeat;
  }
}
.bar-item {
  float: left;
  padding-left: 15px;
  // line-height: 50px;
  line-height: 80px;
  // width: 350px;
  height: 100%;
  font-size: 30px;
  color: #ffffff;
  .tb {
    position: relative;
    top: -3px;
    right: 3px;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 6px;
    }
  }

  // #{$deep}.v-transfer-dom .ivu-modal-mask .ivu-modal-wrap.ivu-modal.ivu-modal-content {
  //   .ivu-modal-body {
  //     height: 300px;
  //     overflow: auto;
  //   }
  // }
}
#{$deep}.ivu-menu-item:nth-of-type(1) {
  cursor: pointer;
}
</style>
