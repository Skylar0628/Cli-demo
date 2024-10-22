<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button">新增訂單</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th>email</th>
        <th width="120">購買款項</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" (order,index) in orderList" :key="index">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      orderList: [],
      pagnation: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api)
        .then(res => {
          this.orderList = res.data.orders
          this.pagnation = res.data.pagination
          console.log('order', res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getOrders()
  }

}
</script>
