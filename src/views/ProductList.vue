<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal(true, {})">新增產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200" >編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.cbtnategory }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ item.origin_price }}
        </td>
        <td class="text-right">
          {{ item.price }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="opendeleteModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagnation" @emit-pages="getProducts"></Pagination>
  <ProductModal
   :product="temProduct"
   @updata-product="updataProduct"
   ref="ProductModal"></ProductModal>
   <deleteModal
    :temp="temProduct"
    @deleteProduct="deleteProduct"
    ref="DeletModal"
   ></deleteModal>
</template>

<script>
import deleteModal from './DeleteModal.vue'
import Pagination from '@/components/Pagination.vue'
import ProductModal from './ProductModal.vue'
export default {
  data () {
    return {
      products: [],
      pagnation: {},
      temProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    Pagination,
    deleteModal
  },
  inject: ['emitter'],
  methods: {
    opendeleteModal (item) {
      this.$refs.DeletModal.showModal()
      this.temProduct = item
    },
    openModal (isNew, item) {
      if (isNew) {
        this.temProduct = {}
      } else {
        this.temProduct = { ...item }
      }
      this.isNew = isNew
      const productModal = this.$refs.ProductModal
      productModal.showModal()
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then(res => {
          console.log('res', res)
          this.isLoading = false
          this.products = res.data.products
          this.pagnation = res.data.pagination
        })
        .catch(err => {
          console.log(err)
        })
    },
    updataProduct (temp) {
      this.temProduct = temp
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethods = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/:${temp.id}`
        httpMethods = 'put'
      }
      this.isLoading = true
      this.$http[httpMethods](api, { data: temp })
        .then(res => {
          this.isLoading = false
          this.$refs.ProductModal.hideModal()
          if (res.data.success) {
            this.getProducts()
            this.emitter.emit('updata-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('updata-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、')
            })
          }
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    deleteProduct (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item}`
      this.isLoading = true
      this.$http.delete(api)
        .then(res => {
          this.getProducts()
          this.$refs.DeletModal.hideModal()
          this.isLoading = false
          if (res.data.success) {
            this.emitter.emit('updata-message', {
              style: 'success',
              title: '刪除成功'
            })
          } else {
            this.emitter.emit('updata-message', {
              style: 'danger',
              title: '刪除失敗'
            })
          }
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
