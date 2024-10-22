<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in product" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center;"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
              >
              </div>
            </td>
            <td><a href="#" class="text-dark">{{item.title}}</a></td>
            <td>
              <del class="h6">原價 {{item.origin_price}}元</del>
              <div class="h5">現在只要 {{item.price}} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                 @click="getProduct(item.id)"
                >
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                   @click="addCart(item.id)"
                   :disabled="status.loadingItem === item.id"
                >
                <div v-if="status.loadingItem === item.id" class="d-flex align-items-center spinner-border-sm">
                  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
                  <div v-else>加到購物車</div>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-5">
      <div class="sticky-top">
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 110px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cart.carts">
               <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(item.id)">
                    <i class="bi bi-x"></i>刪除
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" >
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                          v-model.number="item.qty" min="1"
                           @change="updateCart(item)"
                           :disabled="this.status.loadingItem === item.id"
                          >
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
               </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end"></td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success"></td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" >
                套用優惠碼
              </button>
            </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: [],
      pagination: {},
      status: {
        loadingItem: ''
      },
      cart: {},
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(api)
        .then(res => {
          this.product = res.data.products
          this.pagination = res.data.pagination
          console.log('this', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = { product_id: id, qty: 1 }
      this.status.loadingItem = id
      this.isLoading = true
      this.$http.post(api, { data: cart })
        .then(res => {
          console.log(res)
          this.getCart()
          this.isLoading = false
          this.status.loadingItem = ''
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.status.loadingItem = ''
        })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api)
        .then(res => {
          this.cart = res.data.data
          console.log('cart', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(api)
        .then(res => {
          this.getCart()
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    updateCart (item) {
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.put(api, { data: cart })
        .then(res => {
          this.isLoading = false
          this.status.loadingItem = ''
          console.log(res)
          this.getCart()
        })
        .catch(err => {
          this.isLoading = false
          this.status.loadingItem = ''
          console.log(err)
        })
    }

  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
