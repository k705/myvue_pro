<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartInfoList" :key="good.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked"
              @change="checkCart(good.skuId, good.isChecked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeNum(good, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="good.skuNum"
              @change="skuNumChange(good, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeNum(good, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(good.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="bacthCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="batchDelete">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ goodsNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ goodsPrice }}</i>
        </div>
       <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
      <div class="mask" v-show="maskIsShow"></div>

  </div>
</template>

<script>
import {
  reqShopCartList,
  reqCheckCart,
  reqDeleteCart,
  reqBatchCheckCart,
  reqBatchDelete,
} from "@/api/shopCart";

import { reqAddCartOrChangeNum } from "@/api/detail";
export default {
  name: "ShopCart",
  data() {
    return { cartInfoList: [], maskIsShow: false };
  },
  mounted() {
    this.getShopCartList();
  },
  methods: {
    //1.请求购物车列表
    async getShopCartList() {
      this.maskIsShow = true;

      const result = await reqShopCartList();
      // console.log(result, "result");
      this.cartInfoList = result[0] ? result[0].cartInfoList : [];
      this.maskIsShow = false;

    },

    //2. 切换商品选中状态
    async checkCart(skuId, isChecked) {
      try {
        this.maskIsShow = true;

        await reqCheckCart(skuId, isChecked === 0 ? 1 : 0);
        // alert("切换商品选中状态成功");`

        //重新请求购物车数据
        this.getShopCartList();
      } catch (e) {
        alert("切换商品选中状态失败");
      }
    },
    //3. 删除购物车商品
    async deleteCart(skuId) {
      try {
        this.maskIsShow = true;

        await reqDeleteCart(skuId);
        // alert("删除购物车商品Okk");

        //重新请求购物车数据
        this.getShopCartList();
      } catch (e) {
        alert("删除购物车商品 no  Okk");
      }
    },

    //4. 删除选中商品
    async batchDelete() {
      const skuIdList = this.cartInfoList.reduce((p, c) => {
        /* if (c.isChecked === 1) {
          return [...p, c.skuId];
        } else {
          return p;
        } */

        return c.isChecked === 1 ? [...p, c.skuId] : p;
      }, []);

      try {
        this.maskIsShow = true;

        await reqBatchDelete(skuIdList);
        // alert("删除成功");
        //重新请求购物车数据
        this.getShopCartList();
      } catch (e) {
        alert("删除失败");
      }
    },

    //5. 数量改动
    async changeNum(good, num) {
      const { skuId, skuNum, isReq } = good;

      //判断当前是否在请求中
      if (isReq) return;

      //判断临界值
      if (skuNum <= 1 && num === -1) return;

      //一旦放行说明当前没有请求,马上要开始请求了,所以要把开关打开
      good.isReq = true;

      try {
        await reqAddCartOrChangeNum(skuId, num);
        //重新请求购物车数据
        await this.getShopCartList();

        good.isReq = false;
      } catch (e) {
        alert("失败");

        good.isReq = false;
      }
    },

    //6. 用户输入的改变
    async skuNumChange(good, e) {
      //判断用户输入的是否是非数字
      if (isNaN(e.target.value)) {
        return (e.target.value = good.skuNum);
      }

      //判断用户输入的内容是否小于0
      if (+e.target.value <= 0) {
        return (e.target.value = good.skuNum);
      }

      try {
        this.maskIsShow = true;

        await reqAddCartOrChangeNum(good.skuId, e.target.value - good.skuNum);

        //重新请求购物车数据
        await this.getShopCartList();
      } catch (e) {
        alert("失败");
      }
    },
  },
  computed: {
    bacthCheck: {
      get() {
        //判断购物车列表中的所有商品是否全选
        return this.cartInfoList.every((item) => item.isChecked === 1);
      },
      async set(newVal) {
        const skuIdList = this.cartInfoList.reduce(
          (p, c) => [...p, c.skuId],
          []
        );
        try {
        this.maskIsShow = true;

          await reqBatchCheckCart(newVal ? 1 : 0, skuIdList);
          // alert("全选设置成功");

          //重新请求购物车数据
          this.getShopCartList();
        } catch (e) {
          alert("全选设置失败");
        }
      },
    },

    goodsNum() {
      return this.cartInfoList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum : p;
      }, 0);
    },

    goodsPrice() {
      return this.cartInfoList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum * c.skuPrice : p;
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  position: relative;
 .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("https://img.zcool.cn/community/0177aa60ac8ffe11013f47208b2584.gif")
      0 0 no-repeat;
    background-size: 100% 100%;
    opacity: 0.5;
  }


  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
