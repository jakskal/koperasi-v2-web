import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useIndexStore } from '.'

export const useMemberUserStore = defineStore('memberUser', () => {
  const indexStore = useIndexStore()
  const userMemberList = ref([])
  const componentKey = ref(0)
  const state = reactive({
    isModalUpdateMemberOpen: false,
    isModalAddMemberOpen: false,
    selectedUserId: null
  })

  const selectedUser = reactive({
    name: "member2",
    email: "member2@gmail.com",
    password: "password",
    phone: 628992981508,
    role_id: 3,
    status_id: 1,
    attribute: {
      member_id: "MEM-2",
      is_active_member: true,
      join_date: "2023-12-16T13:02:37+07:00",
      birth: "2023-12-16T13:02:37+07:00",
      birth_place: "Bandung",
      profession: "manager BUMN",
      address: "jl deme no8"
    }
  })

  async function createMember(){
    let payload = selectedUser
    let join_date = new Date(selectedUser.attribute.join_date)
    let birth_date = new Date(selectedUser.attribute.birth)
    payload.attribute.join_date = join_date
    payload.attribute.birth = birth_date
    await axios.post("/admin/user", payload).catch((err)=>{
      console.log(err);
      throw(err)
    })
  }

  async function deleteMemberUser(id) {
    await axios.delete(`/admin/user/${id}`).catch((err) => {
      alert('failed delete user')
      console.log(err)
    })
    indexStore.componentKey++
  }

  async function getUserMembers(keyword) {
    let query = {
      params: {
        role_id: 3
      }
    }
    if (keyword != ""){
      query.params.keyword = keyword
      query.params.page_size = 5
    }
    const { data } = await axios
      .get('/admin/users?', query )
      .then()
      .catch((err) => {
        console.log('error', err)
      })

    return data.data
  }

  async function getMemberUser(id) {
    const { data } = await axios
      .get(`/admin/user/${id}`)
      .then()
      .catch((err) => {
        console.log(err)
      })

    return data.data
  }

  async function openUpdateMemberModal(id) {
    state.isModalUpdateMemberOpen = true
    state.selectedUserId = id
    if (userMemberList.value.length > 0) {
      const user = userMemberList.value.find((user) => user.id == id)
      if (user) {
        selectedUser.name = user.name
        selectedUser.email = user.email
        selectedUser.ord = user.password
        selectedUser.phone = user.phone
      }
    } else {
      const user = await getMemberUser(id)
      selectedUser.name = user.name
      selectedUser.email = user.email
      selectedUser.ord = user.password
      selectedUser.phone = user.phone
    }
  }

  async function updateMemberUser(id) {
    let payload = selectedUser
    let join_date = new Date(selectedUser.attribute.join_date)
    let birth_date = new Date(selectedUser.attribute.birth)
    payload.attribute.join_date = join_date
    payload.attribute.birth = birth_date
    await axios.put(`/admin/user/${id}`, payload).then(async () => {
      const data = await getUserMembers()
      userMemberList.value = data
    })
  }

  return {
    deleteMemberUser,
    componentKey,
    userMemberList,
    getUserMembers,
    state,
    openUpdateMemberModal,
    selectedUser,
    getMemberUser,
    updateMemberUser,
    createMember
  }
})
