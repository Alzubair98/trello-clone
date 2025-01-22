<template>
  <aside
    class="h-screen overflow-hidden transition-all duration-500 ease-in-out"
    :class="{ 'w-16': expand, 'w-64': !expand }"
  >
    <nav class="h-full flex flex-col bg-white border-r shadow-sm">
      <div class="p-4 pb-2 flex justify-between items-center">
        <img
          src="https://img.logoipsum.com/346.svg"
          class="overflow-hidden transition-all w-32"
          :class="{ 'w-0': expand }"
          alt="logo"
        />
        <button @click="expand = !expand" class="p-1.5 rounded-lg bg-gray-15 hover:bg-gray-100">
          <i
            class="bi bi-arrow-left-circle-fill text-gray-600 text-2xl"
            :class="{ 'bi-arrow-right-circle-fill': expand }"
          ></i>
        </button>
      </div>

      <ul class="flex-1 px-3">
        <li
          v-for="(item, index) in itemsList"
          :key="index"
          class="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-indigo-50 text-gray-600"
          :class="{
            'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800': item.active,
          }"
          @click="onClick(index)"
        >
          <i class="bi" :class="item.icon"></i>
          <span class="w-52 ml-3 overflow-hidden transition-all" :class="{ 'w-0 ml-0': expand }">{{
            item.label
          }}</span>
        </li>
      </ul>
      <div class="border-t flex p-3">
        <img
          src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
          alt=""
          class="w-10 h-10 rounded-md"
        />
        <div
          class="flex justify-between items-center w-52 ml-3 overflow-hidden transition-all"
          :class="{ 'w-0': expand }"
        >
          <div class="leading-4" v-if="useUserStore.currentUser">
            <h4 class="font-semibold">{{ useUserStore.currentUser.username }}</h4>
            <span class="text-xs text-gray-600">zubairsk53@gmail.com</span>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
// import
import type { Item } from '../types'
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

// data
const itemsList = ref<Item[]>([
  {
    label: 'Dashborad',
    icon: 'bi-trello',
    active: true,
  },
  {
    label: 'Teams',
    icon: 'bi-people-fill',
    active: false,
  },
])

const expand = ref<boolean>(false)

// methods
const onClick = (index: number): void => {
  itemsList.value.forEach((item, i) => {
    item.active = i === index
  })
}
</script>
