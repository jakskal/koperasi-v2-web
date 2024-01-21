import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useIndexStore } from '.'

export const useAdminUserStore = defineStore('adminUser', () => {
  const indexStore = useIndexStore()
  const userAdminList = ref([])
  const componentKey = ref(0)
  const state = reactive({
    isModalUpdateAdminOpen: false,
    isModalAddAdminOpen: false,
    selectedUserId: null
  })

  const selectedUser = reactive({
    name: '',
    email: '',
    password: '',
    phone: 0,
    role_id: 2,
    status_id: 1,
    attribute: null
  })

  async function deleteAdminUser(id) {
    await axios.delete(`/admin/user/${id}`).then(
      ).catch((err) => {
        alert('failed delete user')
        console.log(err)
      })
      indexStore.componentKey++
  }

  async function getUserAdmins() {
    const { data } = await axios
      .get('/admin/users?role_id=2')
      .then()
      .catch((err) => {
        console.log('error', err)
      })

    return data.data
  }

  async function getAdminUser(id) {
    const { data } = await axios
      .get(`/admin/user/${id}`)
      .then()
      .catch((err) => {
        console.log(err)
      })

    return data.data
  }

  async function openUpdateAdminModal(id) {
    state.isModalUpdateAdminOpen = true
    state.selectedUserId = id
    if (userAdminList.value.length > 0) {
      const user = userAdminList.value.find((user) => user.id == id)
      if (user) {
        selectedUser.name = user.name
        selectedUser.email = user.email
        selectedUser.ord = user.password
        selectedUser.phone = user.phone
      }
    } else {
      const user = await getAdminUser(id)
      selectedUser.name = user.name
      selectedUser.email = user.email
      selectedUser.ord = user.password
      selectedUser.phone = user.phone
    }
  }

  async function updateAdminUser(id) {
    await axios.put(`/admin/user/${id}`, selectedUser).then(async () => {
      componentKey.value++
    })
  }

  return {
    deleteAdminUser,
    componentKey,
    userAdminList,
    getUserAdmins,
    state,
    openUpdateAdminModal,
    selectedUser,
    getAdminUser,
    updateAdminUser
  }
})
