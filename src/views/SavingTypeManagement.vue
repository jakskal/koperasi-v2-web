<template>
    <ModalCreateSavingType :isModalAddSavingTypeOpen="state.isModalAddSavingTypeOpen" @closeAddSavingTypeModal="closeAddSavingTypeModal" />
    <ModalUpdateSavingType :isModalUpdateSavingTypeOpen="state.isModalUpdateSavingTypeOpen" @closeUpdateSavingTypeModal="closeUpdateSavingTypeModal" />

    <div class=" bg-bluegrey-200 p-12">
        <div class="flex flex-wrap pt-4 flex-shrink">
            <div class="w-full mb-12 px-4">
                <div class="mb-2">
                    <button
                    class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button" @click="state.isModalAddSavingTypeOpen = true">
                    Tambahkan Tipe Simpanan
                </button>
            </div>
                <CardSavingTypeTable color="light" :datas="savingTypeList"/>
            </div>
        </div>
    </div>
</template>
<script >
import CardSavingTypeTable from "@/components/Cards/CardSavingTypeTable.vue";
import ModalCreateSavingType from "@/components/Modal/SavingType/ModalCreateSavingType.vue";
import ModalUpdateSavingType from "@/components/Modal/SavingType/ModalUpdateSavingType.vue";
import { useSavingTypeStore } from "@/stores/savingType";
import { onMounted, computed } from "vue";

export default {
    setup() {
        
        const savingTypeStore = useSavingTypeStore()
        onMounted(async () => {
            const data = await savingTypeStore.getSavingTypes();
            savingTypeStore.savingTypeList = data;
        })
        const state = savingTypeStore.state
        
        const savingTypeList = computed(()=> savingTypeStore.savingTypeList)

        async function closeAddSavingTypeModal(shuoldReload) {
            state.isModalAddSavingTypeOpen = false
            if (shuoldReload == true) {
                await reloadSavingTypeList()
            }
        }

        async function reloadSavingTypeList() {
            const data = await savingTypeStore.getSavingTypes();
            savingTypeStore.savingTypeList = data;
        }

        async function closeUpdateSavingTypeModal(shuoldReload) {
            state.isModalUpdateSavingTypeOpen = false
            if (shuoldReload == true) {
                await reloadSavingTypeList()
            }
        }

        return { state, closeAddSavingTypeModal,  closeUpdateSavingTypeModal, savingTypeList, reloadSavingTypeList}
    },
    components: {
    ModalCreateSavingType,
    ModalUpdateSavingType,
    CardSavingTypeTable
},
};
</script>
  