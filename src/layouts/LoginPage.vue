<template>
    <div class="h-full bg-emerald-600">
        <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full w-full">
                <div class="w-full lg:w-4/12 px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg shadow-gray-700 rounded-lg bg-white border-0">
                        <div class="rounded-t mb-0 px-6 py-6">
                            <div class="text-center mb-3">
                                <h6 class="text-blueGray-700 text-sm font-bold">
                                    Login
                                </h6>
                            </div>

                            <hr class="mt-6 border-b-1 border-blueGray-700" />
                        </div>
                        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

                            <form @submit.prevent="login">
                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password">
                                        Email
                                    </label>
                                    <input type="email"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Email" v-model="state.form.email" />
                                </div>

                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password">
                                        Password
                                    </label>
                                    <input type="password"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Password" v-model="state.form.password" />
                                </div>
                                <div>
                                    <label class="inline-flex items-center cursor-pointer">
                                        <input id="customCheckLogin" type="checkbox"
                                            class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150" />
                                        <span class="ml-2 text-sm font-semibold text-blueGray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div class="text-center mt-6">
                                    <button
                                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "@/plugins/axios";
import router from "@/router";
import { reactive } from "vue";
export default {
    setup() {
        const state = reactive({
            users: [],
            form: {
                email: "admin@koperasi.com",
                password: "admin1234",
            }
        })

        async function login() {
            await axios.post("/login", state.form).then(
                (resp) => {
                    localStorage.setItem("token", resp.data.token);
                    state.form.email = ""
                    state.form.password = ""
                    return resp;
                }
            ).catch(() => {
                localStorage.removeItem("token")
            })
            router.push('/admin/dashboard')
        }

        return { state, login }
    }
};
</script>
  