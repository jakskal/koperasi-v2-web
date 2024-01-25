<template>
    <ModalCreateMember :isModalAddMemberOpen="state.isModalAddMemberOpen" @closeAddMemberModal="closeAddMemberModal" />
    <ModalUpdateMember :isModalUpdateMemberOpen="state.isModalUpdateMemberOpen" @closeUpdateMemberModal="closeUpdateMemberModal" />

    <div class=" bg-bluegrey-200 p-12">
        <div class="flex flex-wrap pt-4 flex-shrink">
            <div class="w-full mb-12 px-4">
                <div class="mb-2">
                    <button
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" @click="state.isModalAddMemberOpen = true">
                    Tambahkan Anggota
                </button>
            </div>
                <CardUserMemberTableVue color="light" :datas="memberList"/>
            </div>
        </div>
    </div>
</template>
<script >
import CardUserMemberTableVue from "@/components/Cards/CardUserMemberTable.vue";
import ModalCreateMember from "@/components/Modal/MemberUser/ModalCreateMember.vue";
import ModalUpdateMember from "@/components/Modal/MemberUser/ModalUpdateMember.vue";
import { useMemberUserStore } from "@/stores/memberUser.js";
// import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";

export default {
    setup() {
        const memberUserStore = useMemberUserStore()
        onMounted(async () => {
            const data = await memberUserStore.getUserMembers();
            memberUserStore.userMemberList = data;
        })
        // const indexStore = useIndexStore()
        const state = memberUserStore.state
        
        const memberList = computed(()=> memberUserStore.userMemberList)

        async function closeAddMemberModal(shuoldReload) {
            state.isModalAddMemberOpen = false
            if (shuoldReload == true) {
                await reloadMemberList()
            }
        }

        async function reloadMemberList() {
            const data = await memberUserStore.getUserMembers();
            memberUserStore.userMemberList = data;
        }

        async function closeUpdateMemberModal(shuoldReload) {
            state.isModalUpdateMemberOpen = false
            if (shuoldReload == true) {
                await reloadMemberList()
            }
        }

        return { state, closeAddMemberModal,  closeUpdateMemberModal, memberList, reloadMemberList}
    },
    components: {
    CardUserMemberTableVue,
    ModalCreateMember,
    ModalUpdateMember
},
};
</script>
  