<!-- eslint-disable vue/multi-word-component-names -->
<template>
   dashboard
</template>

<script>
export default {
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
