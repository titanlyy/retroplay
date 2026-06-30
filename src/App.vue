<template>
  <div class="flex h-screen bg-gb-darker text-white overflow-hidden">
    <!-- Sidebar Navigation -->
    <SidebarNav />

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import SidebarNav from '@/components/layout/SidebarNav.vue'
import { RouterView } from 'vue-router'
</script>
