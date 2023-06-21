<template>
  <div >
    <Header/>
    <router-view></router-view>
    <Footer v-if="FooterIsShow"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed:{
    FooterIsShow(){
      return this.$route.name !== 'Login'&&this.$route.name!=='Register'
    }
  }
}
</script>

<style>

</style>
