import { Button, Message, Dialog } from "element-ui";
export default function (Vue) {
  Vue.use(Button);
  Vue.use(Dialog);
  Vue.prototype.$message = Message;
}
