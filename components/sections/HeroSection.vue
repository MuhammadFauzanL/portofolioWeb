<template>
  <section id="hero" class="min-h-screen bg-deep-ink flex items-center relative overflow-hidden pt-24 pb-12">
    <div class="container mx-auto px-6 max-w-7xl relative z-10">
      <div class="max-w-3xl">
        <div class="inline-block bg-signal-red text-paper-white tag-angled px-3 py-1 text-xs font-mono font-medium uppercase tracking-widest mb-8">
          AVAILABLE FOR HIRE
        </div>
        
        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-paper-white uppercase tracking-tight leading-[1.1] mb-6">
          {{ profile.name }}.
        </h1>
        
        <p class="font-sans text-lg md:text-xl text-paper-white/80 max-w-xl leading-relaxed mb-10">
          {{ profile.tagline }}
        </p>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <BaseButton as="a" :href="profile.cvFile" target="_blank" rel="noopener noreferrer" variant="primary">
            Download CV
          </BaseButton>
          <a href="#portfolio" class="group inline-flex items-center justify-center px-6 py-3 font-sans font-medium uppercase tracking-widest text-sm transition-transform duration-150 relative text-paper-white hover:text-deep-ink">
            <span class="absolute inset-0 border-[1.5px] border-paper-white btn-primary transition-all duration-150 -z-10 bg-transparent group-hover:bg-paper-white group-hover:border-transparent group-hover:-translate-y-1 group-hover:shadow-[0_8px_0_0_rgba(250,250,248,0.2)]"></span>
            <span class="relative z-10 transition-colors duration-150">View Portfolio</span>
          </a>
        </div>
        
        <div class="flex items-center gap-6">
          <a :href="profile.socials.github" target="_blank" rel="noopener noreferrer" class="text-paper-white/60 hover:text-signal-red transition-colors" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener noreferrer" class="text-paper-white/60 hover:text-signal-red transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a :href="'mailto:' + profile.email" class="text-paper-white/60 hover:text-signal-red transition-colors" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <a href="#about" class="absolute bottom-12 left-1/2 -translate-x-1/2 text-paper-white/40 hover:text-signal-red transition-colors animate-bounce-limited" aria-label="Scroll down">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
    </a>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import profileData from '~/data/profile.json'

const profile = profileData
</script>
