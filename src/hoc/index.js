import Vue from "vue";

var styleTree = {};

export function hoc(hash, component) {
  Object.keys(component._Ctor).forEach(key => {
    if (component._Ctor[key].options.components) {
      component._Ctor[key].options.components = hocAllChildren(
        component._Ctor[key].options.components
      );
    }
  });

  const functionalComponent = {
    functional: true,
    render: function(createElement, context) {
      const { styleV } = component;
      const { data } = context;

      data.attrs["style-tree"]
        ? (styleTree = data.attrs["style-tree"])
        : (styleTree = {});

      data.style = computeStyle(styleV, styleTree);

      console.log("hoc component", component);
      console.log("hoc context", context);
      console.log("hoc data", data);
      console.log("hoc styleV", styleV);
      console.log("");

      return createElement(component, context.data, context.children);
    }
  };

  return Vue.extend({ mixins: [functionalComponent] });
}

export function hocAll(allCompontents) {
  const hocdComponents = {};

  Object.keys(allCompontents).forEach(key => {
    hocdComponents[key] = hoc(key, allCompontents[key]);
  });

  return hocdComponents;
}

export function hocAllChildren(allCompontents) {
  const hocdComponents = {};

  Object.keys(allCompontents).forEach(key => {
    hocdComponents[key] = hocChild(key, allCompontents[key]);
  });

  return hocdComponents;
}

function hocChild(hash, component) {
  Object.keys(component._Ctor).forEach(key => {
    if (component._Ctor[key].options.components) {
      component._Ctor[key].options.components = hocAllChildren(
        component._Ctor[key].options.components
      );
    }
  });

  const functionalComponent = {
    functional: true,
    render: function(createElement, context) {
      const { styleV } = component;
      const { data } = context;

      data.style = computeStyle(styleV, styleTree, hash);

      console.log("hocChild hash", hash);
      console.log("hocChild component", component);
      console.log("hocChild context", context);
      console.log("hocChild data", data);
      console.log("");

      return createElement(component, context.data, context.children);
    }
  };

  return functionalComponent;
}

function computeStyle(styleV, styleTree, hash) {
  const mergeredObject = {};

  if (styleTree) {
    Object.keys(styleV).forEach(varName => {
      if (styleTree[varName]) {
        return (mergeredObject[`--${varName}`] = styleTree[varName]);
      }

      mergeredObject[`--${varName}`] = styleV[varName].default;
    });
  }

  return mergeredObject;
}
