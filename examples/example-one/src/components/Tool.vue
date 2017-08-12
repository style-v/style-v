<script>
import Vue from "vue";
import { hocAll } from "../../../../src/hoc";
import { getAllCompotents } from "../lib/get-all-compotents";
import { vStyleDirective } from "../../../../src/directive";

Vue.directive("vstyle", vStyleDirective);

const components = hocAll(getAllCompotents());

export default {
  components,
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
      component(:is="currentComponent", :style-tree="currentComponentStyleTree")
    div.toolbar
</template>
