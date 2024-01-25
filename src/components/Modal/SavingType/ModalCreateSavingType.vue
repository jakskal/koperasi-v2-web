<template >
  <div>
    <ModalContainer v-if="isModalAddSavingTypeOpen" @close="closeAddSavingTypeModal">
      <template #title>Buat Tipe Simpanan Baru </template>
      <template #body>
        <form class="p-2" @submit.prevent="addSavingType">
          <div class="my-2 grid" style="grid-gap: 8px;;">
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Nama </label>
              <input required v-model="form.name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" type="text" id="name" name="name"
                placeholder="masukkan nama" />
            </div>
          </div>

          <div class="my-2  text-base text-blueGray-600 ">
            <button type="submit" class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Tambahkan Tipe Simpanan </span>
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
import { useSavingTypeStore } from '@/stores/savingType';

export default {
  props: {
    isModalAddSavingTypeOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const savingTypeStore = useSavingTypeStore()
    const form = computed(() => savingTypeStore.selectedSavingType)
    function closeAddSavingTypeModal() {
      emit("closeAddSavingTypeModal", true)
    }

    async function addSavingType() {
      try {
        await savingTypeStore.createSavingType()
      } catch (err) {
        console.log(err);
        emit("closeAddSavingTypeModal", false)
        alert("gagal menambahkan tipe simpanan")
      }
      emit("closeAddSavingTypeModal", true)
    }

    const isLoading = ref(false)
    return { form, closeAddSavingTypeModal, addSavingType, isLoading }
  },
  components: { ModalContainer }
}
</script>
<style></style>