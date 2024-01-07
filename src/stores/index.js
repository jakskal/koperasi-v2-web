import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
  const token = ref(null)
  const componentKey = ref(0)

  return {token, componentKey}
})
