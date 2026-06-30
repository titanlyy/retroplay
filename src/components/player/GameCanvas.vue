<template>
  <div
    class="relative flex items-center justify-center rounded-2xl overflow-hidden
           shadow-2xl shadow-black/60 ring-1 ring-white/8"
    :style="containerStyle"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- The actual game canvas -->
    <canvas
      ref="canvasRef"
      :width="160"
      :height="144"
      class="game-screen"
      :style="canvasStyle"
    />

    <!-- HUD overlay -->
    <Transition name="hud">
      <PlayerHUD
        v-if="hovered"
        @save="$emit('save')"
        @load="$emit('load')"
        @screenshot="takeScreenshot"
        @toggle-pause="$emit('toggle-pause')"
        @set-speed="(s) => $emit('set-speed', s)"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PlayerHUD from './PlayerHUD.vue'

const props = defineProps({
  scale: { type: Number, default: 3 }
})
const emit = defineEmits(['save', 'load', 'toggle-pause', 'set-speed', 'canvas-ready'])
const canvasRef = ref(null)
const hovered = ref(false)

const canvasStyle = computed(() => ({ width: `${160 * props.scale}px`, height: `${144 * props.scale}px` }))
const containerStyle = computed(() => ({ width: `${160 * props.scale}px`, height: `${144 * props.scale}px` }))

function takeScreenshot() {
  if (!canvasRef.value) return
  const a = document.createElement('a')
  a.href = canvasRef.value.toDataURL('image/png')
  a.download = `retroplay-${Date.now()}.png`
  a.click()
}
onMounted(() => emit('canvas-ready', canvasRef.value))
</script>

<style scoped>
.hud-enter-active { transition: opacity 0.15s ease; }
.hud-leave-active { transition: opacity 0.1s ease; }
.hud-enter-from, .hud-leave-to { opacity: 0; }
</style>
