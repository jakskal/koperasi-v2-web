
<template>
    <div class="h-full" >
      <RouterView  />
      <Teleport to="body">
        <!-- <ModalUpdateAdmin :isModalUpdateAdminOpen="state.isModalUpdateAdminOpen"></ModalUpdateAdmin> -->
      </Teleport>
  </div>
</template> 

<script >
// import ModalUpdateAdmin from './components/Modal/AdminUser/ModalUpdateAdmin.vue';
// import useIndexStore from '@/stores/index.js'
// import { storeToRefs } from 'pinia';

export default {
  setup() {
    // const indexStore = useIndexStore()
    // const {state} = storeToRefs(indexStore)
    // return {state}
  },
  // components:{ModalUpdateAdmin}
}
</script>


<style scoped>

</style>
