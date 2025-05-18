<template>
    <ModalCreateMemberSaving :isModalAddMemberSavingOpen="state.isModalAddMemberSavingOpen"
        @closeAddMemberSavingModal="closeAddModal" />
    <ModalUpdateMemberSaving :isModalUpdateMemberSavingOpen="state.isModalUpdateMemberSavingOpen"
        @closeUpdateMemberSavingModal="closeUpdateModal" />


    <div class=" bg-bluegrey-200 p-12">
        <div class="flex flex-wrap pt-4 flex-shrink">
            <div class="w-full mb-12 px-4">
                <div class="mb-2 flex-wrap justify-between lg:flex flex-grow items-center">
                    <button
                        class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button" @click="state.isModalAddMemberSavingOpen = true">
                        Tambahkan Simpanan
                    </button>
                    <div class="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
                        <div class="flex">
                            <span
                                class="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-emerald-600 rounded-full text-sm items-center rounded-r-none pl-2 py-1  border-r-0 placeholder-emerald-800">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                        <input type="text"
                            class="px-2 py-1 h-8 border border-solid  border-emerald-600 rounded-full text-sm leading-snug text-emerald-700 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-emerald-300"
                            placeholder="Cari berdasarkan nama atau nomor transaksi.." v-model="state.keyword" @keyup.enter="fetchData({currentPage, currentPageSize})"/>
                    </div>
                </div>
                <CardMemberSavingTable color="light" :datas="memberSavingStore.memberSavingList"
                    :totalCount="totalData" />
                <div id="pagination">

                    <div class="my-4">
                        <button :disabled="isFirstPage" @click="prev"
                            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                            prev
                        </button>
                        <button v-for="item in pageCount" :key="item" :disabled="currentPage === item"
                            @click="currentPage = item"
                            class=" text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            :class="[currentPage === item ? 'bg-emerald-800' : 'bg-emerald-500 active:bg-emerald-600 ']">
                            {{ item }}
                        </button>
                        <button :disabled="isLastPage" @click="next"
                            class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                            next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardMemberSavingTable from "@/components/Cards/CardMemberSavingTable.vue";
import ModalCreateMemberSaving from "@/components/Modal/MemberSaving/ModalCreateMemberSaving.vue";
import ModalUpdateMemberSaving from "@/components/Modal/MemberSaving/ModalUpdateMemberSaving.vue";
import { useMemberSavingStore } from "@/stores/memberSaving";
import { onMounted, ref, computed } from "vue";
import { useOffsetPagination } from '@vueuse/core';

export default {
    setup() {

        const memberSavingStore = useMemberSavingStore()

        const state = memberSavingStore.state
        const page = state.page
        const pageSize = state.pageSize
        const totalData = ref(0)
        const keyword = state.keyword



        const savingList = computed(() => memberSavingStore.memberSavingList)
        onMounted(async () => {
            console.log("the page", page);
            console.log("the page", pageSize);
            console.log("the page", keyword);
            const data = await reloadMemberSavingList(page, pageSize,keyword)
            memberSavingStore.memberSavingList = data.data
            totalData.value = data.page_info.count
        })

        async function closeAddModal(shuoldReload) {
            state.isModalAddMemberSavingOpen = false
            if (shuoldReload == true) {
                page.value = 1
                const data = await reloadMemberSavingList(page, pageSize, keyword)
                memberSavingStore.memberSavingList = data.data
            }
        }

        async function reloadMemberSavingList(currentPage, currentPageSize, keyword) {
            return memberSavingStore.getMemberSavings(currentPage, currentPageSize, keyword)

        }

        async function closeUpdateModal(shuoldReload) {
            state.isModalUpdateMemberSavingOpen = false
            if (shuoldReload == true) {
                const data = await reloadMemberSavingList(page, pageSize, keyword)
                memberSavingStore.memberSavingList = data.data
                totalData.value = data.page_info.count
            }
        }


        async function fetchData({currentPage, currentPageSize}) {
            console.log("the keywod =", state.keyword);
            console.log("page", currentPage, currentPageSize)
            const data = await reloadMemberSavingList(currentPage, currentPageSize, state.keyword)
            memberSavingStore.memberSavingList = data.data
            totalData.value = data.page_info.count

        }

        // fetchData(page.value, pageSize.value)

        const {
            currentPage,
            currentPageSize,
            pageCount,
            isFirstPage,
            isLastPage,
            prev,
            next,
        } = useOffsetPagination({
            total: totalData,
            page: page,
            pageSize: pageSize,
            onPageChange: fetchData,
            onPageSizeChange: fetchData,
        })

        return { state, closeAddModal, closeUpdateModal, savingList, useOffsetPagination, page, currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, totalData, memberSavingStore, pageSize, fetchData }
    },
    components: {
        ModalCreateMemberSaving,
        ModalUpdateMemberSaving,
        CardMemberSavingTable,
    },
};
</script>