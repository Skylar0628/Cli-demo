<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" @click="openModal(true)">建立優惠券</button>
  </div>
  <table class="table nmt-4">
    <thead>
       <tr>
         <th>名稱</th>
         <th>折扣百分比</th>
         <th>到期日</th>
         <th>是否啟用</th>
         <th>編輯</th>
       </tr>
    </thead>
    <tbody>
       <tr v-for="(item, index) in coupons" :key="index">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ date(item.due_date) }}</td>
        <td>
           <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
           <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openModal( false, item )">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="opendeleteModal(item)">刪除</button>
          </div>
        </td>
       </tr>
    </tbody>
  </table>
  <couponmodal :coupon="tempCoupon" @update-coupon="updateCoupon" ref="couponModal"></couponmodal>
  <deleteModal ref="delModal" :temp="tempCoupon" @deleteProduct="deleteCoupon"></deleteModal>
</template>

<script>
import deleteModal from '@/views/DeleteModal.vue'
import couponmodal from '@/components/CouponModal.vue'
export default {
  props: {
  },
  data () {
    return {
      coupons: {},
      isNew: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      }
    }
  },
  components: {
    couponmodal,
    deleteModal
  },
  methods: {
    deleteCoupon (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
      this.$http.delete(api)
        .then(res => {
          console.log(res)
          this.getCoupon()
          this.closeDeleteModal()
        })
        .catch(err => {
          console.log(err)
        })
    },
    opendeleteModal (item) {
      this.$refs.delModal.showModal()
      this.tempCoupon = item
    },
    closeDeleteModal () {
      this.$refs.delModal.hideModal()
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    updateCoupon (item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethods = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethods = 'put'
      }
      this.$http[httpMethods](api, { data: item })
        .then(res => {
          this.getCoupon()
          this.$refs.couponModal.hideModal()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCoupon () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(api)
        .then(res => {
          this.coupons = res.data.coupons
          console.log('>>>', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    date (timestamp) {
      const localDate = new Date(timestamp * 1000)
      return localDate.toLocaleDateString()
    }
  },
  created () {
    this.getCoupon()
  }
}
</script>
