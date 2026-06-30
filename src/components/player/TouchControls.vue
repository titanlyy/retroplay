<template>
  <div class="fixed bottom-0 left-0 right-0 pointer-events-none select-none pb-safe px-6 py-5 flex justify-between items-end">
    <!-- D-Pad -->
    <div class="pointer-events-auto relative w-36 h-36">
      <!-- Cross shape background -->
      <div class="absolute inset-x-[33%] inset-y-0 bg-white/8 rounded-xl" />
      <div class="absolute inset-y-[33%] inset-x-0 bg-white/8 rounded-xl" />
      <!-- Buttons -->
      <button v-for="d in dpad" :key="d.dir"
        class="absolute w-11 h-11 flex items-center justify-center text-white/60 active:text-white active:bg-white/20 rounded-xl transition-all text-sm font-bold"
        :style="d.style"
        @touchstart.prevent="$emit('press', d.dir)"
        @touchend.prevent="$emit('release', d.dir)"
      >{{ d.icon }}</button>
      <div class="absolute inset-[35%] rounded-lg bg-white/5" />
    </div>

    <!-- System buttons -->
    <div class="pointer-events-auto flex flex-col items-center gap-2 mb-3">
      <div class="flex gap-2">
        <button
          v-for="sys in sysButtons" :key="sys.label"
          class="bg-white/10 active:bg-white/20 text-white/50 active:text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full border border-white/8 transition-all"
          @touchstart.prevent="$emit('press', sys.key)"
          @touchend.prevent="$emit('release', sys.key)"
        >{{ sys.label }}</button>
      </div>
    </div>

    <!-- A / B -->
    <div class="pointer-events-auto relative w-36 h-36">
      <button
        class="absolute right-1 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full
               bg-red-500/70 active:bg-red-400 border-2 border-red-400/30
               text-white font-bold text-base shadow-lg active:scale-95 transition-all"
        @touchstart.prevent="$emit('press', 'a')"
        @touchend.prevent="$emit('release', 'a')"
      >A</button>
      <button
        class="absolute left-1 bottom-1 w-12 h-12 rounded-full
               bg-yellow-500/70 active:bg-yellow-400 border-2 border-yellow-400/30
               text-white font-bold text-sm shadow-lg active:scale-95 transition-all"
        @touchstart.prevent="$emit('press', 'b')"
        @touchend.prevent="$emit('release', 'b')"
      >B</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['press', 'release'])

const dpad = [
  { dir: 'up',    icon: '▲', style: 'top:0; left:50%; transform:translateX(-50%)' },
  { dir: 'down',  icon: '▼', style: 'bottom:0; left:50%; transform:translateX(-50%)' },
  { dir: 'left',  icon: '◀', style: 'left:0; top:50%; transform:translateY(-50%)' },
  { dir: 'right', icon: '▶', style: 'right:0; top:50%; transform:translateY(-50%)' },
]
const sysButtons = [
  { label: 'SELECT', key: 'select' },
  { label: 'START',  key: 'start' },
]
</script>
