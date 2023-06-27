<template>
  <div>
    <TypeNav />
    <List />
    <Recommed />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
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
import { reqFloorList } from "@/api/home";
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
  data() {
    return {
      floorList: [],
    };
  },
  mounted() {
    this.getFloorList();
  },
  methods: {
    async getFloorList() {
      const result = await reqFloorList();
      this.floorList = result;
    },
  },
};
</script>

<style lang="less" scoped></style>
