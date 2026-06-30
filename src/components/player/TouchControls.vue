<template>
  <div class="touch-controls fixed bottom-0 left-0 right-0 pb-6 px-4 flex justify-between items-end pointer-events-none">
    <!-- D-Pad -->
    <div class="relative w-32 h-32 pointer-events-auto">
      <button class="dpad-btn top-0 left-1/2 -translate-x-1/2" @touchstart.prevent="press('up')" @touchend.prevent="release('up')">▲</button>
      <button class="dpad-btn bottom-0 left-1/2 -translate-x-1/2" @touchstart.prevent="press('down')" @touchend.prevent="release('down')">▼</button>
      <button class="dpad-btn left-0 top-1/2 -translate-y-1/2" @touchstart.prevent="press('left')" @touchend.prevent="release('left')">◀</button>
      <button class="dpad-btn right-0 top-1/2 -translate-y-1/2" @touchstart.prevent="press('right')" @touchend.prevent="release('right')">▶</button>
      <div class="absolute inset-1/3 bg-white/10 rounded"></div>
    </div>

    <!-- Center Buttons -->
    <div class="flex flex-col items-center gap-2 pointer-events-auto mb-4">
      <div class="flex gap-3">
        <button class="meta-btn" @touchstart.prevent="press('select')" @touchend.prevent="release('select')">SELECT</button>
        <button class="meta-btn" @touchstart.prevent="press('start')" @touchend.prevent="release('start')">START</button>
      </div>
    </div>

    <!-- A / B Buttons -->
    <div class="relative w-32 h-32 pointer-events-auto">
      <button
        class="action-btn bg-red-500/80 right-0 top-1/2 -translate-y-1/2"
        @touchstart.prevent="press('a')"
        @touchend.prevent="release('a')"
      >A</button>
      <button
        class="action-btn bg-yellow-500/80 left-0 bottom-2"
        @touchstart.prevent="press('b')"
        @touchend.prevent="release('b')"
      >B</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['press', 'release'])
function press(btn) { emit('press', btn) }
function release(btn) { emit('release', btn) }
</script>

<style scoped>
.dpad-btn {
  @apply absolute w-10 h-10 bg-white/20 active:bg-white/40 rounded text-white text-sm flex items-center justify-center;
}
.action-btn {
  @apply absolute w-12 h-12 rounded-full text-white font-bold text-sm flex items-center justify-center active:scale-95 transition-transform;
}
.meta-btn {
  @apply bg-white/20 active:bg-white/40 text-white text-xs px-3 py-1.5 rounded-full;
}
</style>
