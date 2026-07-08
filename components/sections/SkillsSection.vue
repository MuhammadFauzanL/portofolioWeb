<template>
  <section id="skills" class="py-24 md:py-32 bg-paper-white border-t border-hairline">
    <div class="container mx-auto px-6 max-w-7xl">
      <SectionHeading>Tech Stack</SectionHeading>
      
      <div class="space-y-12 md:space-y-16">
        <div v-for="category in skillsData.categories" :key="category.name">
          <h3 class="font-mono text-sm uppercase tracking-widest text-slate-muted mb-6 flex items-center gap-4">
            {{ category.name }}
            <span class="flex-1 h-px bg-hairline"></span>
          </h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div 
              v-for="item in category.items" 
              :key="item.name"
              class="flex items-center gap-3 p-3 bg-paper-white border border-hairline tag-angled hover:border-signal-red hover:text-signal-red hover:shadow-[0_4px_0_0_rgba(232,56,79,0.1)] transition-all group"
            >
              <div class="w-2 h-2 bg-slate-muted group-hover:bg-signal-red tag-angled transition-colors"></div>
              <span class="font-sans text-sm font-medium text-ink-black group-hover:text-signal-red transition-colors">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import skillsData from '~/data/skills.json'
</script>
