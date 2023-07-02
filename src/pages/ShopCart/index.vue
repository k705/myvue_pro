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
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(good.skuId,-1,good.skuNum)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus" @click="changeNum(good.skuId,1,good.skuNum)">+</a>
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
        <div class="chosed">已选择 <span>{{goodsNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ goodsPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqShopCartList,
  reqCheckCart,
  reqDeleteCart,
  reqBatchCheckCart,
  reqBatchDelete
} from "@/api/shopCart";
import {reqAddCartOrChangeNum} from "@/api/detail";
export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
    };
  },
  mounted() {
    this.getShopCartList();
  },
  methods: {
    // 1.请求购物车列表
    async getShopCartList() {
      const result = await reqShopCartList();
      console.log(result);
      this.cartInfoList = result[0] ? result[0].cartInfoList : [];
    },
    // 2.切换商品选择转状态
    async checkCart(skuId, isChecked) {
      try {
        await reqCheckCart(skuId, isChecked === 0 ? 1 : 0);
        //  alert("切换商品选中状态成功")
        this.getShopCartList();
      } catch (e) {
        alert("切换商品选中状态失败");
      }
    },
    // 3.删除购物车商品
    async deleteCart(skuId) {
      try {
        await reqDeleteCart(skuId);
        alert("删除购物车商品成功");
        this.getShopCartList();
        console.log(11111);
      } catch (e) {
        alert("删除购物车商品失败");
      }
    },
     // 4.删除选中商品
    async batchDelete() {
      const skuIdList = this.cartInfoList.reduce( (p, c) => {return c.isChecked === 1?[...p,c.skuId]:p},[])
      try {
        await reqBatchDelete(skuIdList);
        alert("删除选中商品成功");
        this.getShopCartList();
        
      } catch (e) {
        alert("删除选中商品失败");
      }
    },
    // 5.改变数量
    async changeNum(skuId,num,skuNum) {
     if(skuNum <=1 && num === -1)return
      try {
        await reqAddCartOrChangeNum(skuId,num,skuNum);
     
        this.getShopCartList();
        
      } catch (e) {
        alert("改变数量失败");
      }
    },
    
  },
  computed: {
    bacthCheck: {
      get() {
        return this.cartInfoList.every((item) => {
          return item.isChecked === 1;
        });
      },
      async set(newValue) {
        const skuIdList = this.cartInfoList.reduce( (p, c) => [...p, c.skuId],
          []);
        try {
          await reqBatchCheckCart(newValue ? 1 : 0, skuIdList);
        this.getShopCartList();

          // alert("成功")
        } catch (e) {alert("失败")}
      },
    },

    goodsNum(){
      return this.cartInfoList.reduce((p,c)=>{
        return c.isChecked === 1? p+c.skuNum:p
      },0)
    },
     goodsPrice(){
      return this.cartInfoList.reduce((p,c)=>{
        return c.isChecked === 1? p+c.skuNum*c.skuPrice:p
      },0)
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

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
