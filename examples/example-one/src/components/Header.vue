<script>
export default {
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
  header
    h1 My Nice Website
</template>

<style scoped>
  header {
    width: 100%;
    background: blue;
  }

  h1 {
    width: 100%;
    color: var(--colour);
  }
</style>
