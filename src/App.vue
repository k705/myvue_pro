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
      FooterShowList: ["Register", "Login"],
    };
  },
  computed: {
    FooterIsShow() {
      return !this.FooterShowList.includes(this.$route.name);
    },
  },
};
</script>

<style></style>
