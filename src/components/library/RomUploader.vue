<template>
  <div
    class="border-2 border-dashed border-white/10 hover:border-gb-purple/50 rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer"
    :class="{ 'border-gb-purple bg-gb-purple/5': isDragging }"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop.prevent="handleDrop"
    @click="fileInput.click()"
  >
    <div class="text-4xl mb-3">📁</div>
    <p class="text-white/60 text-sm">Drag & drop your ROM here</p>
    <p class="text-white/30 text-xs mt-1">.gb · .gbc · .gba</p>
    <button class="btn-primary mt-4 text-sm">Browse Files</button>

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
    title: file.name.replace(/\.[^.]+$/, ''),
    size: file.size,
    arrayBuffer,
    console: detectConsole(file.name)
  })
}

function detectConsole(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  const map = { gb: 'GB', gbc: 'GBC', gba: 'GBA' }
  return map[ext] ?? 'Unknown'
}
</script>
