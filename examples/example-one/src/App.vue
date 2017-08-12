<template>
  <div id="app">
    <tool></tool>
  </div>
</template>

<script>
import Tool from "./components/Tool";

export default {
  name: "app",
  components: {
    Tool
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
