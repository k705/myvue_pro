<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div
          class="all-sort-list2"
          @mouseenter="mouseIsInCategory = true"
          @mouseleave="mouseIsInCategory = false"
          @click="toSearch"
        >
          <div
            class="item"
            v-for="(category1, index) in category1List"
            :key="category1.id"
            :class="{ active: mouseEnterIndex === index }"
            @mouseenter="category1MouseEnterThrottle(index, category1)"
            @mouseleave="mouseEnterIndex = -1"
          >
            <h3>
              <a
                :data-category1Id="category1.id"
                :data-categoryName="category1.name"
                >{{ category1.name }}</a
              >
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl
                  class="fore"
                  v-for="category2 in category1.children"
                  :key="category2.id"
                >
                  <dt>
                    <a
                      :data-category2Id="category2.id"
                      :data-categoryName="category2.name"
                      >{{ category2.name }}</a
                    >
                  </dt>
                  <dd>
                    <em
                      v-for="category3 in category2.children"
                      :key="category3.id"
                    >
                      <a
                        :data-category3Id="category3.id"
                        :data-categoryName="category3.name"
                        >{{ category3.name }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
} from "@/api/home";
import { throttle } from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 1.一级列表请求数据
      category1List: [],
      // 2.保存鼠标移入的列表下标
      mouseEnterIndex: -1,
      // 3.保存鼠标是否在三级分类区域
      mouseIsInCategory: false,
    };
  },
  mounted() {
    this.getCategory1List();
    //2. 把一级分类鼠标移入事件函数 交给 throttle函数 得到一个新的节流函数
    this.category1MouseEnterThrottle = throttle(this.category1MouseEnter, 0, {
      //leading:让事件函数在节流开始前执行
      leading: true,
      //trailing配置项让函数在节流结束后执行最后一次
      trailing: true,
    });
  },
  methods: {
    async getCategory1List() {
      const result = await reqCategory1List();
      // 响应式数据方式2：添加一个children属性
      /*  result.forEach(item => {
        item.children = []
      }); */
      this.category1List = result;
    },
    async category1MouseEnter(index, category1) {
      //看门狗??解决节流之后 鼠标移出整个区域 还会再执行一次函数的问题
      if (!this.mouseIsInCategory) return;

      // 1.保存鼠标移入的下标
      this.mouseEnterIndex = index;
      // 如果children属性存在则不再发送对应的二级请求
      if (category1.children) return;

      // 2.根据一级分类的id发送二级分类请求数据
      const result = await reqCategory2List(category1.id);
      //【插播】:因为二级和三级应该是一起的！！！但是后台数据没有给我们一起返回，需要再次请求三级
      //我们把一个二级的中所有的三级全部请求到，并添加在对应的二级的children属性上
      //遍历二级列表,拿到每一个id请求对应的三级,并添加在children上
      result.forEach(async (item) => {
        // item.children = [];
        const result = await reqCategory3List(item.id);
        // item.children = result
        this.$set(item, "children", result);
      });

      // 3.把一级分类请求到的二级分类数据，响应式地添加到一级分类对象的children属性上
      // this.category1List[index].children = result;
      //  响应式添加方式1：this.$set添加对象的属性
      this.$set(this.category1List[index], "children", result);
      // 响应式添加方式2：this.$set添加对象的属性
      // this.category1List[index].children = result
    },
    //3.定义一个函数占位,将来赋值为 处理过的节流函数(一级分类鼠标移入的节流函数)
    category1MouseEnterThrottle() {},

    // 4.编程式路由导航三级列表到搜索页
    toSearch(e) {
      // 如果当前点击的target元素上没有categoryname，则不跳转
      if (!e.target.dataset.categoryname) return;

      // 获取当前点击元素上的categoryid和categoryname
      let { category1id, category2id, category3id, categoryname } =
        e.target.dataset;
      // 获取当前可能存在的params参数
      const params = this.$route.params;
      // 编程式路由导航
      this.$router.push({
        name: "Search",
        query: {
          category1id: category1id,
          category2Id: category2id,
          category3Id: category3id,
          categoryName: categoryname,
        },
        params,
      });
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          &.active {
            h3 {
              background: yellowgreen;
            }
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
