<template >
  <div>
    <ModalContainer v-if="isModalAddMemberOpen" @close="closeAddMemberModal">
      <template #title>Buat Anggota Baru </template>
      <template #body>
        <form class="p-2" @submit.prevent="addMember">
          <div class="my-2 grid grid-cols-2 col-gap-8">
              <div class="my-4">
                <label>Email </label>
                <input
                  required
                  v-model="form.email"
                  class="rounded shadow p-2 w-full"
                  type="email"
                  placeholder="masukan email"
                  ref="newLoginRef"
                />
              </div>
              <div class="my-4">
                <label>Password </label>
                <input
                  required
                  v-model="form.password"
                  class="rounded shadow p-2 w-full"
                  type="password"
                  placeholder="masukan kata sandi/password"
                />
              </div>
              <div class="my-4">
                <label>Nama </label>
                <input
                  required
                  v-model="form.attribute.name"
                  class="rounded shadow p-2 w-full"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="masukkan nama"
                />
              </div>
              <div class="my-4">
                <label>Telepon </label>
                <input
                  required
                  v-model="form.phone"
                  class="rounded shadow p-2 w-full"
                  type="tel"
                  id="phone"
                  name="phone"
                  maxlength="12"
                  minlength="11"
                  placeholder="masukkan nomor telepon"
                />
              </div>

              <div class="my-4">
                <label>Nomor Anggota </label>
                <input
                  required
                  v-model="form.attribute.member_number"
                  class="rounded shadow p-2 w-full"
                  type="number"
                  placeholder="masukkan nomor anggota"
                />
              </div>
              <div class="my-4">
                <label>Tanggal Bergabung </label>
                <input
                  required
                  v-model="form.attribute.join_date"
                  class="rounded shadow p-2 w-full"
                  type="date"
                  placeholder="masukkan tanggal bergabung"
                />
              </div>
              <div class="my-4">
                <label>Tanggal Lahir </label>
                <input
                  required
                  v-model="form.attribute.birth"
                  class="rounded shadow p-2 w-full"
                  type="date"
                  placeholder="masukkan tanggal lahir"
                />
              </div>
              <div class="my-4">
                <label>Kota Lahir </label>
                <input
                  required
                  v-model="form.attribute.birth_place"
                  type="text"
                  class="rounded shadow p-2 w-full"
                  placeholder="masukkan kota lahir"
                />
              </div>
              <div class="my-4">
                <label>Alamat </label>
                <input
                  required
                  v-model="form.attribute.address"
                  type="text"
                  class="rounded shadow p-2 w-full"
                  placeholder="masukkan alamat"
                />
              </div>
              <div class="my-4">
                <label>Profesi </label>
                <input
                  required
                  type="text"
                  v-model="form.attribute.profession"
                  class="rounded shadow p-2 w-full"
                  placeholder="masukkan profesi"
                />
              </div>
            </div>

          <div class="my-4">
            <button type="submit" class="w-full rounded shadow-md bg-gradient-to-r from-red-900 to-red-600 text-white">
              <span v-if="!isLoading"> Tambahkan Anggota </span>
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
import { reactive } from 'vue'

export default {
  props: {
    isModalAddMemberOpen: {type:Boolean, default:false}
  },
  setup() {
    // const isModalAddMemberOpen = ref(true);
    const form = reactive({
      name: "member2",
      email: "member2@gmail.com",
      password: "password",
      phone: 628992981508,
      role_id: 2,
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
    return {  form }
  },
  components: { ModalContainer }
}
</script>
<style></style>