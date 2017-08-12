export const vStyleDirective = {
  bind: function(el, binding, vnode) {
    console.log(vnode);
    // vnode.attrs.vstyleValue = binding.value;
  }
};
