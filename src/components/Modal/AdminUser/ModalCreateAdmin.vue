<template >
  <div>
    <ModalContainer v-if="isModalAddOpen" @close="closeAddModal">
      <template #title>Tambah Admin Baru </template>
      <template #body>
        <form class="p-2" @submit.prevent="createAdmin">
          <div class="my-2 grid grid-cols-1 col-gap-8">
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Email </label>
              <input required v-model="form.email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="email"
                placeholder="masukan email" ref="newLoginRef" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Password </label>
              <input required v-model="form.password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="password"
                placeholder="masukan kata sandi/password" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Nama </label>
              <input required v-model="form.name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" id="name" name="name"
                placeholder="masukkan nama" />
            </div>
            <div class="my-2 text-base text-blueGray-600  mb-2">
              <label>Telepon </label>
              <input required v-model="form.phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="tel" id="phone" name="phone"
                maxlength="14" minlength="11" placeholder="masukkan nomor telepon" />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Tambahkan Admin </span>
              <span v-else disabled> ...LOADING.. </span>
            </button>
          </div>
        </form>
      </template>
    </ModalContainer>
  </div>
</template>
<script>
import axios from 'axios';
import ModalContainer from '../ModalContainer.vue';
import { reactive, computed, ref } from 'vue'
// import router from '@/router';

export default {
  props: {
    isModalAddAdminOpen : {
      type: Boolean, default:false
    }
  },

  setup(props, {emit}) {
    let isModalAddOpen = computed(() => props.isModalAddAdminOpen);
    const form = reactive({
      name: "member2",
      email: "member2@gmail.com",
      password: "password",
      phone: 628992981508,
      role_id: 2,
      status_id: 1,
      attribute: null,
    })
    const isLoading = ref(false)

    function closeAddModal() {
      emit("closeAddModal", true)
    }

    async function createAdmin(){
      await axios.post("/admin/user", form).catch(()=>{
        alert("gagal menambahkan admin")
        emit("closeAddModal", false)
        return
      })
      emit("closeAddModal", true)

    }

    return {  isModalAddOpen,form, closeAddModal, isLoading, createAdmin}
  },
  components: { ModalContainer }
}
</script>
<style></style>