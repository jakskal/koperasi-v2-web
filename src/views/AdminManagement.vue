<template>
    <ModalCreateAdmin :isModalAddAdminOpen="state.isModalAddAdminOpen" @closeAddModal="closeAddModal" />
    <ModalUpdateAdmin :isModalUpdateAdminOpen="state.isModalUpdateAdminOpen" @closeUpdateModal="closeUpdateModal" />


    <div class=" bg-bluegrey-200 p-12">
        <div class="flex flex-wrap pt-4 flex-shrink">
            <div class="w-full mb-12 px-4">
                <div class="mb-2">
                    <button
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" @click="state.isModalAddAdminOpen = true">
                    Tambahkan Admin
                </button>
            </div>
                <CardUserAdminTableVue color="light" :datas="adminList" />
            </div>
        </div>
    </div>
</template>
<script >
import CardUserAdminTableVue from "@/components/Cards/CardUserAdminTable.vue";
import ModalCreateAdmin from "@/components/Modal/AdminUser/ModalCreateAdmin.vue";
import ModalUpdateAdmin from "@/components/Modal/AdminUser/ModalUpdateAdmin.vue";
import { useAdminUserStore } from "@/stores/adminUser";
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";

export default {
    setup() {
        onMounted(async () => {
            const data = await adminUserStore.getUserAdmins();
            adminUserStore.userAdminList = data;
        })
        const adminUserStore = useAdminUserStore()

        const { componentKey } = storeToRefs(adminUserStore)
        const state = adminUserStore.state
        
        const adminList = computed(()=> adminUserStore.userAdminList)

        async function closeAddModal(shuoldReload) {
            state.isModalAddAdminOpen = false
            if (shuoldReload == true) {
                const data = await adminUserStore.getUserAdmins()
                adminUserStore.userAdminList = data;
            }
        }

        async function closeUpdateModal(shuoldReload) {
            state.isModalUpdateAdminOpen = false
            if (shuoldReload == true) {
                const data = await adminUserStore.getUserAdmins()
                adminUserStore.userAdminList = data;
            }
        }

        return { state, closeAddModal, componentKey , closeUpdateModal, adminList}
    },
    components: {
        CardUserAdminTableVue,
        ModalCreateAdmin,
        ModalUpdateAdmin
    },
};
</script>
  