<template >
  <div>
    <ModalContainer v-if="isModalUpdateOpen" @close="closeUpdateModal">
      <template #title>Update Data Admin </template>
      <template #body>
        <form class="p-2" @submit.prevent="">
          <div class="my-2 grid grid-cols-1 col-gap-8">
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Email </label>
              <input required v-model="selectedUser.email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="email" placeholder="masukan email" ref="newLoginRef" autocomplete="nope" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Password </label>
              <input required v-model="selectedUser.password"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="password" placeholder="masukan kata sandi/password" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Nama </label>
              <input required v-model="selectedUser.name"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text" id="name" name="name" placeholder="masukkan nama" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Telepon </label>
              <input required v-model="selectedUser.phone"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="tel" id="phone" name="phone" maxlength="14" minlength="11" placeholder="masukkan nomor telepon" />
            </div>
          </div>

          <div class="text-center">
            <button type="submit"
              class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              @click="updateAdmin(selectedUserId)">
              <span v-if="!isLoading"> Update Admin </span>
              <span v-else disabled> ...LOADING.. </span>
            </button>
          </div>
        </form>
      </template>
    </ModalContainer>
  </div>
</template>
<script>
// import axios from 'axios';
import ModalContainer from '../ModalContainer.vue';
import { computed, ref,  reactive } from 'vue'
import { useAdminUserStore } from '@/stores/adminUser';
import { storeToRefs } from 'pinia';
// import router from '@/router';

export default {
  props: {
    isModalUpdateAdminOpen: {
      type: Boolean, default: false
    }
  },
  
  setup(props, { emit }) {
    
    const adminUserStore = useAdminUserStore()
    const {state ,selectedUser } = storeToRefs(adminUserStore)

    let isModalUpdateOpen = computed(() => props.isModalUpdateAdminOpen);
    const form = reactive({
      name: selectedUser.name,
      email: selectedUser.email,
      password: selectedUser.password,
      phone: selectedUser.phone,
      role_id: 2,
      status_id: 1,
      attribute: null,
    })
    const selectedUserId = computed(()=> state.value.selectedUserId)
    const isLoading = ref(false)

    function closeUpdateModal() {
      emit("closeUpdateModal", true)
    }

    async function updateAdmin(id) {
      try{
        await adminUserStore.updateAdminUser(id)
      }catch (err){
        alert("gagal update admin")
        emit("closeUpdateModal", false)
      }
      emit("closeUpdateModal", true)

    }

    return { isModalUpdateOpen, form, closeUpdateModal, isLoading, updateAdmin, selectedUser, selectedUserId}
  },
  components: { ModalContainer }
}
</script>
<style></style>