<template>
  <section id="contact" class="py-24 md:py-32 bg-deep-ink">
    <div class="container mx-auto px-6 max-w-7xl text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="font-display text-4xl md:text-5xl font-bold text-paper-white uppercase tracking-tight mb-6">
          Let's build something together.
        </h2>
        <p class="font-sans text-lg text-paper-white/70 mb-12">
          Feel free to reach out for collaborations, freelance opportunities, or just to say hello.
        </p>
        
        <BaseButton as="a" :href="'mailto:' + profile.email" variant="primary" class="mb-16 !px-8 !py-4 text-base">
          Send an Email
        </BaseButton>
        
        <div class="flex items-center justify-center gap-8 mb-16">
          <a :href="profile.socials.github" target="_blank" rel="noopener noreferrer" class="text-paper-white/60 hover:text-signal-red transition-colors font-mono text-sm uppercase tracking-widest">
            GitHub
          </a>
          <a :href="profile.socials.linkedin" target="_blank" rel="noopener noreferrer" class="text-paper-white/60 hover:text-signal-red transition-colors font-mono text-sm uppercase tracking-widest">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
    
    <footer class="mt-12 border-t border-paper-white/10 pt-8 pb-4">
      <div class="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-mono text-xs text-paper-white/40 uppercase tracking-widest">
          &copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.
        </p>
        <button @click="scrollToTop" class="font-mono text-xs text-paper-white/40 hover:text-signal-red uppercase tracking-widest transition-colors flex items-center gap-2">
          Back to Top
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import profileData from '~/data/profile.json'

const profile = profileData

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
