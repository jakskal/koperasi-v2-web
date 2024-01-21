<template >
  <div>
    <ModalContainer v-if="isModalAddMemberOpen" @close="closeAddMemberModal">
      <template #title>Buat Anggota Baru </template>
      <template #body>
        <form class="p-2" @submit.prevent="addMember">
          <div class="my-2 grid grid-cols-2" style="grid-gap: 8px;;">
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Email </label>
              <input required v-model="form.email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="email"
                placeholder="masukan email" ref="newLoginRef" />
            </div>
            <div class="my-2 text-base text-blueGray-600 ">
              <label>Password </label>
              <div v-if="showPassword" class="w-full flex">
                <input required v-model="form.password" class=" border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="input"
                  placeholder="masukan kata sandi/password" />
                <button class="button p-2 shadow" @click="toggleShow"><span class="icon is-small is-right">
                    <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span></button>
              </div>
              <div v-else class=" w-full flex ">
                <input  required v-model="form.password" class=" border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="password"
                placeholder="masukan kata sandi/password" />
                <button class="button p-2 shadow" @click="toggleShow"><span class="icon is-small is-right">
                    <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span></button>
              </div>
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nama </label>
              <input required v-model="form.name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" id="name" name="name"
                placeholder="masukkan nama" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Telepon </label>
              <input required v-model="form.phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="tel" id="phone" name="phone"
                maxlength="14" minlength="11" placeholder="masukkan nomor telepon" />
            </div>

            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nomor Anggota </label>
              <input required v-model="form.attribute.member_id" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text"
                placeholder="masukkan nomor anggota" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tanggal Bergabung </label>
              <input required v-model="form.attribute.join_date" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="date"
                placeholder="masukkan tanggal bergabung" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tanggal Lahir </label>
              <input required v-model="form.attribute.birth" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="date"
                placeholder="masukkan tanggal lahir" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Kota Lahir </label>
              <input required v-model="form.attribute.birth_place" type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="masukkan kota lahir" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Alamat </label>
              <input required v-model="form.attribute.address" type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="masukkan alamat" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Profesi </label>
              <input required type="text" v-model="form.attribute.profession" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="masukkan profesi" />
            </div>
          </div>

          <div class="my-2  text-base text-blueGray-600 ">
            <button type="submit" class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Tambahkan Anggota </span>
              <span v-else disabled> ...LOADING.. </span>
            </button>
          </div>
        </form>
      </template>
    </ModalContainer>
  </div>
</template>
<script>
import ModalContainer from '../ModalContainer.vue';
import { computed, ref } from 'vue';
import { useMemberUserStore } from "@/stores/memberUser"
// import axios from 'axios';

export default {
  props: {
    isModalAddMemberOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const memberUserStore = useMemberUserStore()
    const form = computed(() => memberUserStore.selectedUser)
    function closeAddMemberModal() {
      emit("closeAddMemberModal", true)
    }
    const showPassword = ref(false)

    async function addMember() {
      try {
        await memberUserStore.createMember()
      } catch (err) {
        console.log(err);
        emit("closeAddMemberModal", false)
        alert("gagal menambahkan anggota")
      }
      emit("closeAddMemberModal", true)
    }

    const isLoading = ref(false)
    function toggleShow() {
      this.showPassword = !this.showPassword;
    }
    return { form, closeAddMemberModal, addMember, isLoading, showPassword, toggleShow }
  },
  components: { ModalContainer }
}
</script>
<style></style>