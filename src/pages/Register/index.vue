<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="userInfo.phone"
          name="phone"
          v-validate="{ required: true, regex: /^1[0-9]{10}$/ }"
          :class="{ error: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="userInfo.code"
          name="code"
          v-validate="{ required: true, regex: /^[0-9]{6}$/ }"
          :class="{ error: errors.has('code') }"
        />
        <button @click="getCode" :disabled="isDisabled">
          获取验证码 <span v-show="isDisabled">{{ time }}s</span>
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="userInfo.password"
          name="password"
          v-validate="{ required: true, regex: /^[a-zA-Z0-9]{3,6}$/ }"
          :class="{ error: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="userInfo.passwordAgain"
          name="passwordAgain"
          v-validate="{ is: userInfo.password, required: true }"
          :class="{ error: errors.has('passwordAgain') }"
        />
        <span class="error-msg">{{ errors.first("passwordAgain") }}</span>
      </div>
      <div class="controls">
        <input
          name="isAgree"
          type="checkbox"
          v-model="userInfo.isAgree"
          v-validate="{ agree: '' }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("isAgree") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { reqCode, reqRegister } from "@/api/user";
export default {
  name: "Register",
  mounted() {
    console.log(this, "register");
  },
  data() {
    return {
      userInfo: {
        phone: "15701665566",
        password: "",
        code: "",
        passwordAgain: "",
        isAgree: false,
      },
      isDisabled: false,
      time: 5,
    };
  },
  methods: {
    //1.获取验证码
    async getCode() {
      //简单的表单校验
      if (this.userInfo.phone.length != 11) return alert("手机号格式不对");

      //先把当前是否禁用按钮设置为true
      this.isDisabled = true;

      //设置一个定时器 用来倒计时
      const timer = setInterval(() => {
        //倒计时时间的改变
        this.time--;
        //判断临界值
        if (this.time <= 0) {
          //清除定时器
          clearInterval(timer);
          //解除禁用
          this.isDisabled = false;
          //恢复倒计时时间
          this.time = 5;
        }
      }, 1000);

      const result = await reqCode(this.userInfo.phone);
      // console.log(result);
      //我们目前把获取到的验证码 直接填充到输入框即可
      this.userInfo.code = result;
    },

    //2. 注册
    async register() {
      // const { phone, password, code, passwordAgain, isAgree } = this.userInfo;
      const result = await this.$validator.validateAll();
      // console.log(result);
      if (!result) return;

      try {
        await reqRegister(this.userInfo);
        alert("注册成功");

        this.$router.push("/login");
      } catch (e) {
        alert("注册失败" + e.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.error {
  border: 1px solid red !important;
}
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
