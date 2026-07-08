<template>
  <section id="about" class="py-24 md:py-32 bg-paper-white relative">
    <div class="container mx-auto px-6 max-w-7xl">
      <SectionHeading>About Me</SectionHeading>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div class="lg:col-span-7">
          <div class="space-y-6 text-lg text-ink-black/80 font-sans leading-relaxed max-w-3xl">
            <p v-for="(paragraph, index) in profile.aboutParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
          
          <div class="mt-12 flex flex-wrap gap-4">
            <div 
              v-for="stat in profile.stats" 
              :key="stat.label"
              class="border border-hairline p-4 min-w-[140px] card-cut-corner bg-paper-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="font-display font-bold text-3xl text-ink-black mb-1">{{ stat.value }}</div>
              <div class="font-mono text-xs uppercase tracking-widest text-slate-muted">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="lg:col-span-5 relative">
          <div class="aspect-[4/5] bg-hairline relative card-cut-corner overflow-hidden border border-hairline shadow-sm">
            <img v-if="profile.photo" :src="profile.photo" :alt="profile.name" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
            <div v-else class="w-full h-full flex items-center justify-center bg-ink-black/5 text-slate-muted font-mono text-sm uppercase tracking-widest">
              [ Photo Placeholder ]
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 w-48 h-48 bg-signal-red tag-angled -z-10 opacity-10"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import profileData from '~/data/profile.json'

// We assert the type loosely to handle the optional photo property
const profile = profileData as any
</script>
