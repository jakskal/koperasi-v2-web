<template >
  <div>
    <ModalContainer v-if="isModalAddLoanTypeOpen" @close="closeAddLoanTypeModal">
      <template #title>Buat Tipe Pinjaman </template>
      <template #body>
        <form class="p-2" @submit.prevent="addLoanType">
          <div class="my-2 grid" style="grid-gap: 8px;;">
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nama </label>
              <input required v-model="form.name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" id="name" name="name"
                placeholder="masukkan nama" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Persentase Nisbah </label>
              <input required v-model="form.ratio_percentage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" id="name" name="name"
                placeholder="masukkan nama" />
            </div>
          </div>

          <div class="my-2  text-base text-blueGray-600 ">
            <button type="submit" class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Tambahkan Tipe Pinjaman </span>
              <span v-else disabled> ...LOADING.. </span>
            </button>
          </div>
        </form>
      </template>
    </ModalContainer>
  </div>
</template>
<script>
import { useLoanTypeStore } from '@/stores/loanType';
import ModalContainer from '../ModalContainer.vue';
import { computed, ref } from 'vue';

export default {
  props: {
    isModalAddLoanTypeOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const loanTypeStore = useLoanTypeStore()
    const form = computed(() => loanTypeStore.selectedLoanType)
    function closeAddLoanTypeModal() {
      emit("closeAddLoanTypeModal", true)
    }

    async function addLoanType() {
      try {
        await loanTypeStore.createLoanType()
      } catch (err) {
        console.log(err);
        emit("closeAddLoanTypeModal", false)
        alert("gagal menambahkan tipe simpanan")
      }
      emit("closeAddLoanTypeModal", true)
    }

    const isLoading = ref(false)
    return { form, closeAddLoanTypeModal, addLoanType, isLoading }
  },
  components: { ModalContainer }
}
</script>
<style></style>