<template>
  <div class="relative flex items-center justify-center bg-black" :style="containerStyle">
    <canvas
      ref="canvasRef"
      :width="160"
      :height="144"
      class="game-screen block"
      :style="canvasStyle"
    />

    <!-- HUD Overlay -->
    <PlayerHUD
      v-if="showHUD"
      @save="$emit('save')"
      @load="$emit('load')"
      @screenshot="takeScreenshot"
      @toggle-pause="$emit('toggle-pause')"
      @set-speed="(s) => $emit('set-speed', s)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PlayerHUD from './PlayerHUD.vue'

const props = defineProps({
  scale: { type: Number, default: 3 },
  showHUD: { type: Boolean, default: true }
})

const emit = defineEmits(['save', 'load', 'toggle-pause', 'set-speed', 'canvas-ready'])
const canvasRef = ref(null)

const canvasStyle = computed(() => ({
  width: `${160 * props.scale}px`,
  height: `${144 * props.scale}px`
}))

const containerStyle = computed(() => ({
  width: `${160 * props.scale}px`,
  height: `${144 * props.scale}px`
}))

function takeScreenshot() {
  if (!canvasRef.value) return
  const url = canvasRef.value.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `retroplay-screenshot-${Date.now()}.png`
  a.click()
}

onMounted(() => {
  emit('canvas-ready', canvasRef.value)
})
</script>
