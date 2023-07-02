import Mock from "mockjs";
import banner from "./data/banner.json";
import floor from "./data/floor.json";
import address from "./data/address.json";

//使用Mock开始拦截ajax请求
Mock.mock("/banner/list", "get", {
  code: 200,
  data: banner,
  message: "成功",
  ok: true,
});

Mock.mock("/floor/list", "get", {
  code: 200,
  data: floor,
  message: "成功",
  ok: true,
});
