<template>
    <section @click="close" class="z-10 h-screen w-screen bg-gray-600 fixed top-0 left-0 opacity-50"></section>
    <div class="absolute inset-0 h-screen w-screen">
        <div class="flex h-full">
            <div class="z-20 m-auto bg-white rounded px-6 py-6">
                <div class="text-center mb-3">
                    <h1 class="text-blueGray-700 text-sm font-bold">
                        <slot name="title"></slot>
                    </h1>
                </div>
                    <hr class="border-b-1 border-blueGray-700" />

                    <div class="flex-auto lg:px-10 pt-0">
                        <main>
                            <slot name="body"></slot>
                        </main>
                    </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    emits: ['close'],

    setup(_, { emit }) {
        function close() {
            emit("close");
        }

        return { close };
    },
};
</script>
  
<style></style>