<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/dashboard/products" class="nav-link">產品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/order" class="nav-link">訂單</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/coupon" class="nav-link">優惠券</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api)
        .then(res => {
          if (res.data.success) {
            this.$router.push('/login')
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
