<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </article>
      <div class="col-4">
        <del class="h6">原價{{ product.origin_price }}元</del>
        <div class="h5">現在只要 {{ product.price }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger">
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      product: {}
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
