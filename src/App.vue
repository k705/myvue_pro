<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer v-if="FooterIsShow" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      // 白名单方法
      // FooterShowList: ["Register", "Login"],
    };
  },
  computed: {
    
    FooterIsShow() {
      // 白名单方法
      // return !this.FooterShowList.includes(this.$route.name);

      // 元信息方法
      return !this.$route.meta.FooterHidden
    },
  },
};
</script>

<style></style>
