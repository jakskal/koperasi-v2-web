<template>
  <div class=" bg-bluegrey-200 p-12">
    <div class="flex flex-wrap pt-4 flex-shrink">
      <div class="w-full mb-12 px-4 flex-shrink">
        <card-table />
      </div>
      <div class="w-full mb-12 px-4">
        <card-table color="dark" />
      </div>
    </div>
  </div>
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";

export default {
  components: {
    CardTable,
  },
};
</script>
