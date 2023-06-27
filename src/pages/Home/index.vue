<template>
  <div>
    <TypeNav /> 
    <List /> 
    <Recommed /> 
    <Rank /> 
    <Like /> 
    <Floor />
    <Brand />
  </div>
</template>

<script>

import List from "./components/List";
import Recommed from "./components/Recommed";
import Rank from "./components/Rank";
import Like from "./components/Like";
import Floor from "./components/Floor";
import Brand from "./components/Brand";
export default {
  name: "Home",
  components: {
  
    List,
    Recommed,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style lang="less" scoped></style>
