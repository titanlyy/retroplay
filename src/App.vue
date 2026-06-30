<template>
  <div class="flex h-screen bg-surface overflow-hidden">
    <SidebarNav />
    <main class="flex-1 overflow-y-auto min-w-0">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import SidebarNav from '@/components/layout/SidebarNav.vue'
import { RouterView } from 'vue-router'
</script>

<style>
.page-enter-active, .page-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to   { opacity: 0; transform: translateY(-8px); }
</style>
