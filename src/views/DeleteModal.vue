<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">刪除品項</h5>
        <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p> 是否刪除 "{{temp.title}}" (刪除後將無法恢復) </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="$emit('deleteProduct', temp.id)">刪除</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Modalmixin from '@/mixins/Modalmixin'
export default {
  props: ['temp'],
  data () {
    return {
      modal: {}
    }
  },
  mixins: [Modalmixin]
}
</script>
