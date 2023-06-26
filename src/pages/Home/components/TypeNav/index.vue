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
        <div class="all-sort-list2">
          <div
            class="item"
            v-for="(category1, index) in category1List"
            :key="category1.id"
            :class="{ active: mouseEnterIndex === index }"
            @mouseenter="category1MouseEnter(index, category1)"
            @mouseleave="mouseEnterIndex = -1"
          >
            <h3>
              <a>{{ category1.name }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl
                  class="fore"
                  v-for="category2 in category1.children"
                  :key="category2.id"
                >
                  <dt>
                    <a>{{ category2.name }}</a>
                  </dt>
                  <dd>
                    <em v-for="category3 in category2.children" :key="category3.id">
                      <a >{{category3.name}}</a>
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
export default {
  name: "TypeNav",
  data() {
    return {
      //1级分类列表
      category1List: [],
      // 鼠标移入列表下标
      mouseEnterIndex: -1,
    };
  },
  mounted() {
    //1. 初始化1级分类列表
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      const result = await reqCategory1List();
      this.category1List = result;
    },
    async category1MouseEnter(index, category1) {
      //  保存鼠标移入下标
      this.mouseEnterIndex = index;
      // 判断：如果已经存在children属性就不再发送二级列表请求
      if(category1.children) return;
      // 获取二级列表数据
      const result = await reqCategory2List(category1.id);
      // 获取三级列表数据
      result.forEach(async (item) => {
        const result = await reqCategory3List(item.id);
        this.$set(item,'children',result)
      });
      //  设置响应式数据
      this.$set(this.category1List[index], "children", result);
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
