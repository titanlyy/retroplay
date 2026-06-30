<template>
  <div
    class="relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer outline-none"
    :class="isDragging
      ? 'border-violet-400 bg-violet-600/10 scale-[1.01]'
      : 'border-white/10 hover:border-white/20 hover:bg-white/3'"
    tabindex="0"
    role="button"
    aria-label="Upload ROM file"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop.prevent="handleDrop"
    @click="fileInput.click()"
    @keydown.enter="fileInput.click()"
  >
    <div class="flex flex-col items-center gap-3 pointer-events-none">
      <div
        class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-200"
        :class="isDragging ? 'bg-violet-500/20' : 'bg-white/5'"
      >
        {{ isDragging ? '✨' : '📁' }}
      </div>
      <div>
        <p class="text-white/70 font-medium text-sm">{{ isDragging ? 'Drop it!' : 'Drag & drop your ROM here' }}</p>
        <p class="text-white/30 text-xs mt-1">.gb &nbsp;·&nbsp; .gbc &nbsp;·&nbsp; .gba</p>
      </div>
      <div class="flex items-center gap-3 text-white/20 text-xs">
        <span class="h-px w-10 bg-white/10 block"></span>
        or
        <span class="h-px w-10 bg-white/10 block"></span>
      </div>
      <span class="btn-primary text-xs px-5">📤 Browse Files</span>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept=".gb,.gbc,.gba,.zip"
      class="hidden"
      @change="handleFileInput"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['rom-loaded'])
const isDragging = ref(false)
const fileInput = ref(null)

function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) processFile(file)
}
function handleFileInput(e) {
  const file = e.target.files[0]
  if (file) processFile(file)
}
async function processFile(file) {
  const arrayBuffer = await file.arrayBuffer()
  emit('rom-loaded', {
    filename: file.name,
    title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
    size: file.size,
    arrayBuffer,
    console: detectConsole(file.name)
  })
}
function detectConsole(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return { gb: 'GB', gbc: 'GBC', gba: 'GBA' }[ext] ?? 'Unknown'
}
</script>
