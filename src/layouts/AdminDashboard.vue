
<template>
  <div class="h-full">
    <div class="flex  w-full flex-row  h-full flex-shrink ">
      <div class=" w-3/10  flex-shrink">
        <SidebarDashboard />
      </div>
      <div class=" w-7/10 bg-blueGray-100 w-full h-full overflow-auto">
        <RouterView :key="indexStore.componentKey"/>
      </div>
      <div>
        <h1>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarDashboard from '@/components/SideBar/SidebarDashboard.vue';
import {  useIndexStore } from '@/stores';
import { ref } from 'vue';
export default {

  setup() {
    const indexStore = useIndexStore()
    const componentKey = ref(indexStore.componentKey)
    return{componentKey, indexStore}
  },
  data() {
    return {

    }
  },
  components: { SidebarDashboard }
}
</script>

<style></style>ref