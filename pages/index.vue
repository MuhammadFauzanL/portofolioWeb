<template>
  <div class="min-h-screen bg-paper-white text-ink-black font-sans selection:bg-signal-red selection:text-paper-white overflow-x-hidden">
    <AppNavbar />
    
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <PortfolioSection />
    </main>
    
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '~/components/layout/AppNavbar.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ExperienceSection from '~/components/sections/ExperienceSection.vue'
import EducationSection from '~/components/sections/EducationSection.vue'
import SkillsSection from '~/components/sections/SkillsSection.vue'
import PortfolioSection from '~/components/sections/PortfolioSection.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import profileData from '~/data/profile.json'

// SEO setup
useSeoMeta({
  title: `${profileData.name} — ${profileData.role} Portfolio`,
  description: profileData.tagline,
  ogTitle: `${profileData.name} — ${profileData.role}`,
  ogDescription: profileData.tagline,
  ogImage: '/images/og-image.webp',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>
