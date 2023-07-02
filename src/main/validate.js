import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN"; // 引入中文message

export default function (Vue) {
  Vue.use(VeeValidate);

  VeeValidate.Validator.localize("zh_CN", {
    messages: {
      ...zh_CN.messages,
      is: (field) => `${field}必须与密码相同`, // 修改或新增内置规则的message
    },
    attributes: {
      // 给校验的field属性名映射中文名称
      phone: "手机号",
      code: "验证码",
      password: "密码",
      passwordAgain: "确认密码",
      isAgree: "协议",
    },
  });

  VeeValidate.Validator.extend("agree", {
    validate: (n) => n,
    getMessage: (field) => field + "必须同意",
  });
}
