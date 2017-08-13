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
      const { directives } = data;
      const styleVNamedComponent = getStyleVDirective(directives);

      data.style = computeStyle(styleV, styleTree, hash, styleVNamedComponent);

      console.log("hocChild hash", hash);
      console.log("hocChild styleTree", styleTree);
      console.log("hocChild component", component);
      console.log("hocChild context", context);
      console.log("hocChild data", data);
      console.log("");

      return createElement(component, context.data, context.children);
    }
  };

  return functionalComponent;
}

function computeStyle(styleV, styleTree, hash, styleVNamedComponent) {
  const mergeredObject = {};

  if (styleTree) {
    Object.keys(styleV).forEach(varName => {
      // TODO: This needs to be recuersive incause you want to provide a bigger
      // nested tree of components maybe?
      if (styleTree[hash] && styleTree[hash][styleVNamedComponent]) {
        return (mergeredObject[`--${varName}`] =
          styleTree[hash][styleVNamedComponent][varName]);
      }

      if (styleTree[varName]) {
        return (mergeredObject[`--${varName}`] = styleTree[varName]);
      }

      mergeredObject[`--${varName}`] = styleV[varName].default;
    });
  }

  return mergeredObject;
}

function getStyleVDirective(directives) {
  let styleVnamedDirectives = null;

  Object.keys(directives).forEach(directive => {
    if (directives[directive].name === "style-v") {
      styleVnamedDirectives = directives[directive].value;
    }
  });

  return styleVnamedDirectives;
}
