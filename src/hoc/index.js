var styleTree = {};

export function hoc(hash, component) {
  let components = {};

  if (component.components) {
    components = hocAllChildren(component.components);
  }

  return {
    functional: true,
    components,
    render: function(createElement, context) {
      const { styleV } = component;
      const { data } = context;

      styleTree = data.attrs["style-tree"];

      data.style = computeStyle(styleV, styleTree);

      console.log("data", data);
      console.log("styleV", styleV);

      return createElement(component, context.data, context.children);
    }
  };
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
  const components = (component.components = hocAllChildren(
    component.components
  ));

  return {
    components,
    functional: true,
    render: function(createElement, context) {
      const { styleV } = component;
      const { data } = context;

      data.style = computeStyle(styleV, styleTree, hash);

      console.log("hocChild hash", hash);
      console.log("hocChild data", data);

      return createElement(component, context.data, context.children);
    }
  };
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
