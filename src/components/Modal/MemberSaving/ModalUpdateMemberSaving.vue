<template >
  <div>
    <ModalContainer v-if="isModalUpdateMemberSavingOpen" @close="closeUpdateMemberSavingModal">
      <template #title>Update Pinjaman </template>
      <template #body>
        <form class="p-2" @submit.prevent="updateMemberSaving">
          <div class="my-2 grid grid-cols-1" style="grid-gap: 8px;;">

            <div class="my-2  text-base text-blueGray-600 ">
              <label>Anggota </label>
              <v-select :options="options.MemberUsers" :reduce="(option) => option.value" v-model="selectedMemberSaving.user_id"
                label="name"
                disabled></v-select>
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tipe Simpanan </label>
              <v-select :options="options.SavingTypes" :reduce="(option) => option.value"
                v-model="selectedMemberSaving.saving_type_id" label="name"></v-select>
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Jumlah </label>
              <input required v-model.number="selectedMemberSaving.amount"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="name" name="name" placeholder="Masukan jumlah simpanan" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tipe Transaksi </label>
              <v-select :options="options.TransactionTypes" :reduce="(option) => option.value"
                v-model="selectedMemberSaving.transaction_type_id" label="name"></v-select>
            </div>

            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tanggal transaksi </label>
              <input required v-model="selectedMemberSaving.transaction_date"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="date" id="name" name="name" placeholder="masukan tanggal transaksi" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Catatan </label>
              <input required v-model="selectedMemberSaving.notes"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text" id="name" name="name" placeholder="masukan catatan" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <button type="submit"
                class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                <span v-if="!isLoading"> Update </span>
                <span v-else disabled> ...LOADING.. </span>
              </button>
            </div>
          </div>

        </form>
      </template>
    </ModalContainer>
  </div>
</template>
<script>
import ModalContainer from '../ModalContainer.vue';
import { computed, ref } from 'vue';
import { useMemberSavingStore } from '@/stores/memberSaving';
import {format_date_input} from '@/plugins/formatter.js';

export default {
  props: {
    isModalUpdateMemberSavingOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const memberSavingStore = useMemberSavingStore()
    const selectedMemberSaving = computed(() => memberSavingStore.selectedMemberSaving)
    const options = computed(() => memberSavingStore.options)

    function closeUpdateMemberSavingModal() {
      emit("closeUpdateMemberSavingModal", false)
      memberSavingStore.clearSelectedMemberSaving()

    }
    const showPassword = ref(false)

    async function updateMemberSaving() {
      try {
        await memberSavingStore.updateMemberSaving(memberSavingStore.state.selectedId)
        memberSavingStore.clearSelectedMemberSaving()
      } catch (err) {
        console.log(err);
        emit("closeUpdateMemberSavingModal", false)
        alert("gagal update simpanan")
      }
      emit("closeUpdateMemberSavingModal", true)
      
    }

    const isLoading = ref(false)

    return { selectedMemberSaving, closeUpdateMemberSavingModal, updateMemberSaving, showPassword, isLoading, options, format_date_input }
  },
  components: { ModalContainer }
}
</script>
<style></style>