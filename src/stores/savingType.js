import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useIndexStore } from '.'

export const useSavingTypeStore = defineStore('savingType', () => {
  const indexStore = useIndexStore()
  const savingTypeList = ref([])
  const componentKey = ref(0)
  const state = reactive({
    isModalUpdateSavingTypeOpen: false,
    isModalAddSavingTypeOpen: false,
    selectedId: null
  })

  const selectedSavingType = reactive({
    name: "pokok",
  })

  async function createSavingType(){
    await axios.post("/admin/saving-type", selectedSavingType).catch((err)=>{
      console.log(err);
      throw(err)
    })
  }

  async function deleteSavingType(id) {
    await axios.delete(`/admin/saving-type/${id}`).catch((err) => {
      alert('failed delete saving-type')
      console.log(err)
    })
    indexStore.componentKey++
  }

  async function getSavingTypes() {
    const { data } = await axios
      .get('/admin/saving-type')
      .then()
      .catch((err) => {
        console.log('error', err)
      })

    return data.data
  }

  async function getSavingType(id) {
    const { data } = await axios
      .get(`/admin/saving-type/${id}`)
      .then()
      .catch((err) => {
        console.log(err)
      })

    return data.data
  }

  async function openUpdateSavingTypeModal(id) {
    state.isModalUpdateSavingTypeOpen = true
    state.selectedId = id
    if (savingTypeList.value.length > 0) {
      const savingType = savingTypeList.value.find((savingType) => savingType.id == id)
      if (savingType) {
        selectedSavingType.name = savingType.name
      }
    } else {
      const savingType = await getSavingType(id)
      selectedSavingType.name = savingType.name
    }
  }

  async function updateSavingType(id) {
    await axios.put(`/admin/saving-type/${id}`, selectedSavingType).then(async () => {
      const data = await getSavingTypes()
      savingTypeList.value = data
    })
  }

  return {
    deleteSavingType,
    componentKey,
    savingTypeList,
    getSavingTypes,
    state,
    openUpdateSavingTypeModal,
    selectedSavingType,
    getSavingType,
    updateSavingType,
    createSavingType
  }
})
