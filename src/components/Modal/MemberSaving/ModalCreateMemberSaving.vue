<template >
  <div>
    <ModalContainer v-if="isModalAddMemberSavingOpen" @close="closeAddMemberSavingModal">
      <template #title>Buat Simpanan </template>
      <template #body>
        <form class="p-2" @submit.prevent="addMemberSaving">
          <div class="my-2 grid" style="grid-gap: 8px;;">
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Anggota </label>
              <v-select :options="options.MemberUsers" :reduce="(option) => option.value" v-model="form.user_id"
                label="name"
                @search="searchUser"></v-select>
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tipe Simpanan </label>
              <v-select :options="options.SavingTypes" :reduce="(option) => option.value" v-model="form.saving_type_id"
                label="name"></v-select>
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Jumlah </label>
              <input required v-model.number="form.amount"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="name" name="name" placeholder="Masukan jumlah simpanan" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tipe Transaksi </label>
              <v-select :options="options.TransactionTypes" :reduce="(option) => option.value"
                v-model="form.transaction_type_id" label="name"></v-select>
            </div>
            <!-- <h1>{{ opts[0] }}</h1> -->
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Tanggal transaksi </label>
              <input required v-model="form.transaction_date"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="date" id="name" name="name" placeholder="masukan tanggal transaksi" />
            </div>
            <div class="my-2  text-base text-blueGray-600 ">
              <label>Catatan </label>
              <input required v-model="form.notes"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                type="text" id="name" name="name" placeholder="masukan catatan" />
            </div>
          </div>

          <div class="my-2  text-base text-blueGray-600 ">
            <button type="submit"
              class="bg-emerald-800 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
              <span v-if="!isLoading"> Tambahkan Simpanan </span>
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
import { computed, ref, onMounted } from 'vue';
import { useMemberSavingStore } from '@/stores/memberSaving';
import { useDebounceFn } from "@vueuse/core";

export default {
  props: {
    isModalAddMemberSavingOpen: { type: Boolean, default: false }
  },
  setup(_, { emit }) {
    const memberSaving = useMemberSavingStore()
    // const savingTypeStore = useSavingTypeStore()
    onMounted(async () => {
      if (memberSaving.options.SavingTypes.length == 0) {
        memberSaving.getSavingTypeOptions()
      }
    })

  
    const form = computed(() => memberSaving.selectedMemberSaving)
    const options = computed(() => memberSaving.options)
    // const value = reactive('')
    // const opts = ref(['Select option', 'options', 'selected', 'multiple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'])
    function closeAddMemberSavingModal() {
      emit("closeAddMemberSavingModal", false)
    }

    async function addMemberSaving() {
      try {
        await memberSaving.createMemberSaving()
      } catch (err) {
        console.log(err);
        emit("closeAddMemberSavingModal", false)
        alert("gagal menambahkan simpanan")
      }
      emit("closeAddMemberSavingModal", true)
      memberSaving.clearSelectedMemberSaving()
    }

    async function searchUser(search, loading){
      if(search.length > 2){
        loading(true);
        await fetchUerOptions(search, loading)
      }
    }

    async function fetchUerOptions(search, loading){
      useDebounceFn(async (search, loading) => {
        await memberSaving.setMemberUserOptions(search)
        loading(false)
      }, 1700)(search, loading)
    }

    async function dropdownUserList(VueSelect) {
      
      if (VueSelect.search.length >= 3 && memberSaving.options.MemberUsers.length == 0 ){
        memberSaving.setMemberUserOptions()
      }
      if (memberSaving.options.MemberUsers.length > 0 ) {
        return VueSelect.open
      }
      
      return VueSelect.search.length !== 0 && VueSelect.open
    }

    const isLoading = ref(false)
    return { form, closeAddMemberSavingModal, addMemberSaving, isLoading, options, dropdownUserList, searchUser }
  },
  data() {
    return {
      value: null,
    }
  },
  components: { ModalContainer, }
}
</script>
