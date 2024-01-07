<template>
  <div class="flex h-full w-full">
    <ModalUpdateAdmin :isModalUpdateAdminOpen="isModalUpdateAdminOpen" @closeUpdateModal="closeUpdateModal" />
  </div>
  <div>
    <a class="text-blueGray-500 py-1 px-3" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }">
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        @click="openUpdateModal"
        >
        Edit
      </a>
      <a href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-700"
        @click="DeleteAdminUser">
        Delete
      </a>
    </div>
  </div>
</template>
<script >
import { useAdminUserStore } from "@/stores/adminUser";
import { createPopper } from "@popperjs/core";
import ModalUpdateAdmin from "../Modal/AdminUser/ModalUpdateAdmin.vue";
import {ref} from  'vue';
export default {
    setup(props) {
        const isModalUpdateAdminOpen = ref(false);
        const adminUserStore = useAdminUserStore();
      const   dropdownPopoverShow =  ref(false);
        async function DeleteAdminUser() {
            await adminUserStore.deleteAdminUser(props.id);
            this.dropdownPopoverShow = false;
            adminUserStore.componentKey++;
        }

        function closeUpdateModal(){
          isModalUpdateAdminOpen.value = false
        }

        function openUpdateModal(){
          isModalUpdateAdminOpen.value = true
          dropdownPopoverShow.value = false
        }

        return { DeleteAdminUser, isModalUpdateAdminOpen , closeUpdateModal,dropdownPopoverShow, openUpdateModal};
    },
    props: {
        id: { type: Number },
    },
    data() {
        return {
          
        };
    },
    methods: {
        toggleDropdown: function (event) {
            event.preventDefault();
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            }
            else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom-start",
                });
            }
        },
    },
    components: { ModalUpdateAdmin }
};
</script>
