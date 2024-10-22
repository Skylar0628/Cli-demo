<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" @click="openModal">建立優惠券</button>
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
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
       </tr>
    </tbody>
  </table>
  <couponmodal :coupon="tempCoupon" @update-coupon="updateCoupon" ref="couponModal"></couponmodal>
</template>

<script>
import couponmodal from '@/components/CouponModal.vue'
export default {
  props: {
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      }
    }
  },
  components: {
    couponmodal
  },
  methods: {
    openModal () {
      this.$refs.couponModal.showModal()
      this.tempCoupon = {
        due_date: new Date().getTime() / 1000
      }
    },
    updateCoupon (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      this.$http.post(api, { data: item })
        .then(res => {
          console.log('>>>', res)
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
