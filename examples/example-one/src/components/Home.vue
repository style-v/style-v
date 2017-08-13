<script>
import PageHeader from "./Header.vue";

export default {
  components: {
    PageHeader
  },
  styleV: {
    colour: {
      required: true,
      default: "yellow",
      validate: value => {
        return true;
      }
    }
  }
};
</script>

<template lang="pug">
  div.main
    page-header(v-style-v="'headerOne'")
    page-header(v-style-v="'headerTwo'")

    p Hello World
</template>

<style scoped>
  .main {
    height: 100vh;
    width: 100%;
    background: #000;
  }

  .main p {
    width: 100%;
    color: --colour;
  }
</style>
