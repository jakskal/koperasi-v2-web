import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useIndexStore } from '.'
import { useSavingTypeStore } from './savingType'
import { useMemberUserStore } from './memberUser'
import {format_date_input} from '@/plugins/formatter.js';

export const useMemberSavingStore = defineStore('memberSaving', () => {
  const memberUserStore = useMemberUserStore()
  const savingTypeStore = useSavingTypeStore()
  const indexStore = useIndexStore()
  const memberSavingList = ref([])
  const componentKey = ref(0)
  const state = reactive({
    isModalUpdateMemberSavingOpen: false,
    isModalAddMemberSavingOpen: false,
    selectedId: null,
    page: 1,
    pageSize: 5,
    keyword:null
  })

  const mapCodeToTransactionType = {
    1: "Penyimpanan",
    2: "Penarikan"
  }

  const options = reactive({
    TransactionTypes: [
      {name:"Penyimpanan", value:1},
      {name:"Penarikan", value:2}
    ],
    SavingTypes: [],
    MemberUsers: []
  })
  const selectedMemberSaving = reactive({
    user_id: 1,
    saving_type_id: 1,
    amount: 10000,
    transaction_type_id: 1,
    transaction_date: "",
    notes: "catatn",
  })

  async function createMemberSaving(){
    let payload = selectedMemberSaving
    let transaction_date = new Date(selectedMemberSaving.transaction_date)
    payload.transaction_date = transaction_date

    await axios.post("/admin/saving", payload).catch((err)=>{
      console.log(err);
      throw(err)
    })
  }

  async function deleteMemberSaving(id) {
    await axios.delete(`/admin/saving/${id}`).catch((err) => {
      alert('failed delete saving')
      console.log(err)
    })
    indexStore.componentKey++
  }

  async function getMemberSavings(page, page_size, keyword) {
    if (page_size == undefined){
      page_size = 10
    }
    if (page == undefined){
      page = 1
    }
    console.log("nothing keyword 2", keyword);
    console.log( keyword == undefined);

    let params = 'page='+page + '&page_size='+page_size 
    if (keyword != undefined){
      console.log("nothing keyword");
      params = params+"&keyword="+keyword
    }
    const { data } = await axios
      .get('/admin/saving?'+params)
      .then()
      .catch((err) => {
        console.log('error', err)
      })

    return data
  }

  async function getMemberSaving(id) {
    const { data } = await axios
      .get(`/admin/saving/${id}`)
      .then()
      .catch((err) => {
        console.log(err)
      })

    return data.data
  }

  async function openUpdateMemberSavingModal(id) {
    let data = {}
    if (memberSavingList.value.length > 0) {
      const savingType = memberSavingList.value.find((savingType) => savingType.id == id)
        data = savingType
      } else {
        const savingType = await getMemberSaving(id)

        data = savingType
      }
      setselectedMemberSavingByAPIData(data)
      state.isModalUpdateMemberSavingOpen = true
      state.selectedId = id
  }

  function setselectedMemberSavingByAPIData(data){
    if (options.MemberUsers.find((val)=>val.value == data.user_id) == undefined){
      options.MemberUsers.push({name:data.user.name, value:data.user_id})
    }
    let transaction_date = format_date_input(data.transaction_date)
    selectedMemberSaving.user_id = data.user_id
    selectedMemberSaving.saving_type_id= data.saving_type_id
    selectedMemberSaving.amount= data.amount
    selectedMemberSaving.transaction_type_id= data.transaction_type_id
    // selectedMemberSaving.transaction_date= data.transaction_date
    selectedMemberSaving.transaction_date= transaction_date
    selectedMemberSaving.notes= data.notes
  }

  async function updateMemberSaving(id) {
    let payload = selectedMemberSaving
    let transaction_date = new Date(selectedMemberSaving.transaction_date)
    payload.transaction_date = transaction_date
    await axios.put(`/admin/saving/${id}`, payload)
  }

  async function getSavingTypeOptions(){
    const savingType = await savingTypeStore.getSavingTypes()
    savingType.forEach(data => {
      const tmp = {name: data.name, value: data.id}
      options.SavingTypes.push(tmp)
    });
    return savingType
  }

  async function setMemberUserOptions(keyword){
    const memberUser = await memberUserStore.getUserMembers(keyword)
    if (memberUser.length == 0){
      return
    }
    let newListUser = []
    memberUser.forEach(data=> {
      const tmp = {name: data.name, value: data.id, member_id:data.attribute.member_id}
      newListUser.push(tmp)
    })
    options.MemberUsers = newListUser
    return memberUser
  }

  function getTransactionTypeNamme(id){
    return mapCodeToTransactionType[id]
  }
  
  function clearSelectedMemberSaving(){
    selectedMemberSaving.user_id = null
    selectedMemberSaving.saving_type_id= null
    selectedMemberSaving.amount= null
    selectedMemberSaving.transaction_type_id= null
    selectedMemberSaving.transaction_date= null
    selectedMemberSaving.notes= null
  }
  return {
    deleteMemberSaving,
    componentKey,
    memberSavingList,
    getMemberSavings,
    state,
    openUpdateMemberSavingModal,
    selectedMemberSaving,
    getMemberSaving,
    updateMemberSaving,
    createMemberSaving,
    options,
    getSavingTypeOptions,
    setMemberUserOptions,
    mapCodeToTransactionType,
    getTransactionTypeNamme,
    clearSelectedMemberSaving
  }
})
