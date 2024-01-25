<template>
    <ModalCreateLoanType :isModalAddLoanTypeOpen="state.isModalAddLoanTypeOpen" @closeAddLoanTypeModal="closeAddLoanTypeModal" />
    <ModalUpdateLoanType :isModalUpdateLoanTypeOpen="state.isModalUpdateLoanTypeOpen" @closeUpdateLoanTypeModal="closeUpdateLoanTypeModal" />

    <div class=" bg-bluegrey-200 p-12">
        <div class="flex flex-wrap pt-4 flex-shrink">
            <div class="w-full mb-12 px-4">
                <div class="mb-2">
                    <button
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" @click="state.isModalAddLoanTypeOpen = true">
                    Tambahkan Tipe Pinjaman
                </button>
            </div>
                <CardLoanTypeTable color="light" :datas="loanTypeList"/>
            </div>
        </div>
    </div>
</template>
<script >
import ModalUpdateLoanType from "@/components/Modal/LoanType/ModalUpdateLoanType.vue";
import ModalCreateLoanType from "@/components/Modal/LoanType/ModalCreateLoanType.vue";
import { useLoanTypeStore } from "@/stores/loanType";
import { onMounted, computed } from "vue";
import CardLoanTypeTable from "@/components/Cards/CardLoanTypeTable.vue";

export default {
    setup() {
        const loanTypeStore = useLoanTypeStore()
        onMounted(async () => {
            await reloadSavingTypeList()
        })
        const state = loanTypeStore.state
        
        const loanTypeList = computed(()=> loanTypeStore.loanTypeList)

        async function closeAddLoanTypeModal(shuoldReload) {
            state.isModalAddLoanTypeOpen = false
            if (shuoldReload == true) {
                await reloadSavingTypeList()
            }
        }

        async function reloadSavingTypeList() {
            const data = await loanTypeStore.getLoanTypes();
            loanTypeStore.loanTypeList = data;
        }

        async function closeUpdateLoanTypeModal(shuoldReload) {
            state.isModalUpdateLoanTypeOpen = false
            if (shuoldReload == true) {
                await reloadSavingTypeList()
            }
        }

        return { state, closeAddLoanTypeModal,  closeUpdateLoanTypeModal, loanTypeList, reloadSavingTypeList}
    },
    components: {
    ModalCreateLoanType,
    ModalUpdateLoanType,
    CardLoanTypeTable
},
};
</script>
  