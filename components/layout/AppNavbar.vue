<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-paper-white/95 backdrop-blur-sm shadow-sm py-3 border-b border-hairline' : 'bg-transparent py-6'
    ]"
  >
    <div class="container mx-auto px-6 max-w-7xl flex items-center justify-between">
      <a href="#hero" class="font-display font-bold text-xl tracking-tight transition-colors" :class="isScrolled ? 'text-ink-black' : 'text-paper-white'">
        {{ profile?.name || 'PORTFOLIO' }}
      </a>
      
      <nav class="hidden md:flex items-center gap-8">
        <a 
          v-for="link in navLinks" 
          :key="link.href"
          :href="link.href"
          class="text-sm font-sans font-medium uppercase tracking-widest relative group transition-colors"
          :class="[
            isScrolled ? 'text-slate-muted hover:text-ink-black' : 'text-paper-white/70 hover:text-paper-white',
            activeSection === link.href.substring(1) ? (isScrolled ? '!text-ink-black' : '!text-paper-white') : ''
          ]"
        >
          {{ link.label }}
          <span 
            v-if="activeSection === link.href.substring(1)"
            class="absolute -bottom-2 left-0 w-full h-[2px] bg-signal-red tag-angled"
          ></span>
        </a>
        
        <BaseButton as="a" :href="profile?.cvFile || '#'" target="_blank" rel="noopener noreferrer" variant="primary" class="ml-4 !py-2 !px-4 text-xs">
          Download CV
        </BaseButton>
      </nav>

      <div class="md:hidden flex items-center gap-3">
        <BaseButton as="a" :href="profile?.cvFile || '#'" target="_blank" rel="noopener noreferrer" variant="primary" class="!py-1.5 !px-3 text-[10px]">
          CV
        </BaseButton>
        <button class="p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red" @click="isMobileMenuOpen = !isMobileMenuOpen" :class="isScrolled || isMobileMenuOpen ? 'text-ink-black' : 'text-paper-white'" aria-label="Toggle menu" aria-expanded="isMobileMenuOpen">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-paper-white shadow-lg border-b border-hairline py-4 px-6 flex flex-col gap-4">
      <a 
        v-for="link in navLinks" 
        :key="link.href"
        :href="link.href"
        class="text-sm font-sans font-medium uppercase tracking-widest text-ink-black py-2 focus-visible:ring-2 focus-visible:ring-signal-red"
        @click="isMobileMenuOpen = false"
      >
        {{ link.label }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import profileData from '~/data/profile.json'

const profile = profileData

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  
  // Scroll spy logic
  const sections = ['hero', 'about', 'experience', 'skills', 'portfolio', 'contact']
  for (const section of sections.reverse()) {
    const el = document.getElementById(section)
    if (el && window.scrollY >= el.offsetTop - 150) {
      activeSection.value = section
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
