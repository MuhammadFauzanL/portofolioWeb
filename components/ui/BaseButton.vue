<template>
  <component
    :is="as"
    :class="[
      'inline-flex items-center justify-center px-6 py-3 font-sans font-medium uppercase tracking-widest text-sm transition-transform duration-150 relative group',
      variant === 'primary' ? 'text-paper-white' : 'text-ink-black'
    ]"
    v-bind="$attrs"
  >
    <!-- Background shape with clip-path -->
    <span
      :class="[
        'absolute inset-0 btn-primary transition-all duration-150 -z-10 group-hover:-translate-y-1 group-hover:shadow-[0_8px_0_0_rgba(232,56,79,0.3)]',
        variant === 'primary' 
          ? 'bg-signal-red' 
          : 'border-[1.5px] border-ink-black bg-transparent group-hover:bg-ink-black group-hover:border-transparent'
      ]"
    ></span>
    
    <!-- Hover secondary text color change for secondary button -->
    <span :class="['relative z-10', variant === 'secondary' ? 'group-hover:text-paper-white transition-colors duration-150' : '']">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary',
  as?: string
}>(), {
  variant: 'primary',
  as: 'button'
})
</script>
