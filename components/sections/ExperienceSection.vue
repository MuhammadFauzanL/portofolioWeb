<template>
  <section id="experience" class="py-24 md:py-32 bg-paper-white relative">
    <div class="container mx-auto px-6 max-w-7xl">
      <SectionHeading>Experience</SectionHeading>
      
      <div class="space-y-12 max-w-4xl">
        <div v-for="(job, index) in profile.experience" :key="index" class="relative pl-8 md:pl-0">
          
          <!-- Timeline line -->
          <div class="hidden md:block absolute left-[150px] top-2 bottom-[-48px] w-px bg-hairline last:bottom-0"></div>
          
          <div class="flex flex-col md:flex-row gap-4 md:gap-16 items-start">
            <div class="md:w-[150px] md:text-right shrink-0 mt-1">
              <span class="font-mono text-xs uppercase tracking-widest text-slate-muted bg-paper-white relative z-10">{{ job.period }}</span>
            </div>
            
            <div class="flex-1 relative">
              <!-- Timeline node -->
              <div class="absolute -left-[41px] md:-left-[41px] top-2 w-3 h-3 bg-signal-red tag-angled hidden md:block"></div>
              <!-- Mobile Timeline line & node -->
              <div class="md:hidden absolute -left-8 top-2 bottom-[-48px] w-px bg-hairline last:bottom-0"></div>
              <div class="md:hidden absolute -left-[35px] top-2 w-3 h-3 bg-signal-red tag-angled"></div>

              <h3 class="font-display font-bold text-xl text-ink-black mb-1">{{ job.title }}</h3>
              <div class="font-sans text-sm font-medium text-signal-red mb-4">{{ job.company }} • {{ job.location }}</div>
              <p class="font-sans text-sm text-ink-black/80 leading-relaxed">
                {{ job.description }}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../ui/SectionHeading.vue'
import profileData from '~/data/profile.json'

const profile = profileData as any
</script>
