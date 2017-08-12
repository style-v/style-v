<script>
import Vue from "vue";
import { hocAll } from "../../../../src/hoc";
import { vStyleDirective } from "../../../../src/directive";

import Home from "./../components/Home";

Vue.directive("vstyle", vStyleDirective);

export default {
  components: hocAll({ Home }),
  data: function() {
    return {
      currentComponent: "Home",
      currentComponentStyleTree: {
        header: {
          headerOne: {
            colour: "red"
          },
          headerTwo: {
            colour: "green"
          }
        }
      }
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.currentComponentStyleTree.colour = "pink";
    }, 2000);
  }
};
</script>

<template lang="pug">
  div.app
    div.active-component
      Home(:style-tree="currentComponentStyleTree")
    div.toolbar
</template>
