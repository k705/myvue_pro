<template>
  <div id="app">
    <Header />
    <router-view></router-view>

    <!-- //第一种方法:差值表达式，用v-if控制是否渲染
      <Footer v-if="$route.name !== 'Login' && $route.name !== 'Register'" /> -->
    <!-- //第二种方法:计算属性，当插值语法中处理数据的逻辑复杂时，写到计算属性中，用v-if控制是否渲染-->
    <!-- //第三种方法:白名单，数据多的时候用数组或对象-->
    <Footer v-if="FooterIsShow" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      FooterShowList: ["Login", "Register"],
    };
  },
  computed: {
    FooterIsShow() {
      // return this.$route.name!=='Login'&&this.$route.name!=='Register';
      // return !this.FooterShowList.includes(this.$route.name)
      return !this.$route.meta.FooterIsHidden;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
