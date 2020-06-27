/* eslint-disable no-undef, no-unused-vars */

import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue, options = null) {
    Vue.prototype.$message = (html) => {
      M.toast({html})
    };

    Vue.prototype.$error = (html) => {
      M.toast({html: `[${localizeFilter('Error')}]: ${html}`})
    };

  }
}
