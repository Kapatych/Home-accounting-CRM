/* eslint-disable no-undef, no-unused-vars */

export default {
  install(Vue, options = null) {
    Vue.prototype.$message = (html) => {
      M.toast({html})
    };

    Vue.prototype.$error = (html) => {
      M.toast({html: `[Ошибка]: ${html}`})
    };

  }
}
