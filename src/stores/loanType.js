import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useIndexStore } from '.'

export const useLoanTypeStore = defineStore('loanType', () => {
  const indexStore = useIndexStore()
  const loanTypeList = ref([])
  const componentKey = ref(0)
  const state = reactive({
    isModalUpdateLoanTypeOpen: false,
    isModalAddLoanTypeOpen: false,
    selectedId: null
  })

  const selectedLoanType = reactive({
    name: "pokok",
    ratio_percentage: 2.5
  })

  async function createLoanType(){
    await axios.post("/admin/loan-type", selectedLoanType).catch((err)=>{
      console.log(err);
      throw(err)
    })
  }

  async function deleteLoanType(id) {
    await axios.delete(`/admin/loan-type/${id}`).catch((err) => {
      alert('failed delete loan-type')
      console.log(err)
    })
    indexStore.componentKey++
  }

  async function getLoanTypes() {
    const { data } = await axios
      .get('/admin/loan-type')
      .then()
      .catch((err) => {
        console.log('error', err)
      })

    return data.data
  }

  async function getLoanType(id) {
    const { data } = await axios
      .get(`/admin/loan-type/${id}`)
      .then()
      .catch((err) => {
        console.log(err)
      })

    return data.data
  }

  async function openUpdateLoanTypeModal(id) {
    state.isModalUpdateLoanTypeOpen = true
    state.selectedId = id
    if (loanTypeList.value.length > 0) {
      const loanType = loanTypeList.value.find((loanType) => loanType.id == id)
      if (loanType) {
        selectedLoanType.name = loanType.name
        selectedLoanType.ratio_percentage = loanType.ratio_percentage
      }
    } else {
      const loanType = await getLoanType(id)
      selectedLoanType.name = loanType.name
      selectedLoanType.ratio_percentage = loanType.ratio_percentage
    }
  }

  async function updateLoanType(id) {
    await axios.put(`/admin/loan-type/${id}`, selectedLoanType).then(async () => {
      const data = await getLoanTypes()
      loanTypeList.value = data
    })
  }

  return {
    deleteLoanType,
    componentKey,
    loanTypeList,
    getLoanTypes,
    state,
    openUpdateLoanTypeModal,
    selectedLoanType,
    getLoanType,
    updateLoanType,
    createLoanType
  }
})
