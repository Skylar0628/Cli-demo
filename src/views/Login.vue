<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="singIn">
      <div class="col-md-6 border p-3">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="email" class="sr-only">信箱</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="請輸入信箱..."
            required
            autofocus
            v-model="this.user.username"
          />
        </div>
        <div class="mb-2">
          <label for="pass" class="sr-only">密碼</label>
          <input
            type="password"
            id="pass"
            class="form-control"
            placeholder="請輸入密碼..."
            required
            v-model="this.user.password"
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登入
    singIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user)
        .then(res => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `MyToken=${token}; expires:${new Date(expired)}`
            this.$router.push('/dashboard')
          }
        })
    }
  }
}
</script>
