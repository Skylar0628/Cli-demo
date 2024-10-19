<!-- eslint-disable vue/multi-word-component-names -->
<template>
   <Navbar></Navbar>
   <div class="container-fluid">
    <router-view/>
    <ToasrMessage></ToasrMessage>
   </div>
</template>

<script>
import ToasrMessage from '@/components/ToastMessage.vue'
import emitter from '@/methods/emitter'
import Navbar from '../components/NavBar.vue'
export default {
  components: {
    Navbar,
    ToasrMessage
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)MyToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api)
      .then(res => {
        if (!res.data.success) {
          this.$router.push('login')
        }
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
