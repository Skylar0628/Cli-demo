<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg,index) in message" :key="index" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast },
  inject: ['emitter'],
  data () {
    return {
      message: []
    }
  },
  mounted () {
    this.emitter.on('updata-message', (message) => {
      const { style = 'success', title } = message
      this.message.push({ style, title })
    })
  }

}
</script>
