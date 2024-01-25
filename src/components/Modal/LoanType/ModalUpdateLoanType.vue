<template >
  <div>
    <ModalContainer v-if="isModalUpdateLoanTypeOpen" @close="closeUpdateLoanTypeModal">
      <template #title>Update Tipe Pinjaman </template>
      <template #body>
        <form class="p-2" @submit.prevent="updateLoanType">
          <div class="my-2 grid grid-cols-2" style="grid-gap: 8px;;">

            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nama </label>
              <input required v-model="selectedLoanType.name"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text" id="name" name="name" placeholder="masukkan nama" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nama </label>
              <input required v-model="selectedLoanType.ratio_percentage"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text" id="name" name="name" placeholder="masukkan nama" />
            </div>
          </div>

          <div class="my-2  text-base text-blueGray-600 ">
            <button type="submit"
              class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Update </span>
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
import { useLoanTypeStore } from '@/stores/loanType';
// import axios from 'axios';

export default {
  props: {
    isModalUpdateLoanTypeOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const loanTypeStore = useLoanTypeStore()
    // const loanTypeStore = useLoanTypeStore()
    const selectedLoanType = computed(() => loanTypeStore.selectedLoanType)
    function closeUpdateLoanTypeModal() {
      emit("closeUpdateLoanTypeModal", true)
    }
    const showPassword = ref(false)

    async function updateLoanType() {
      try {
        await loanTypeStore.updateLoanType(loanTypeStore.state.selectedId)
      } catch (err) {
        console.log(err);
        emit("closeUpdateLoanTypeModal", false)
        alert("gagal update tipe simpanan")
      }
      emit("closeUpdateLoanTypeModal", true)

    }

    const isLoading = ref(false)

    return { selectedLoanType, closeUpdateLoanTypeModal, updateLoanType, showPassword, isLoading }
  },
  components: { ModalContainer }
}
</script>
<style></style>