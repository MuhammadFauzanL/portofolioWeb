<template>
  <div class="min-h-screen bg-paper-white text-ink-black font-sans selection:bg-signal-red selection:text-paper-white">
    <AppNavbar />
    
    <main v-if="project" class="pt-32 pb-24 md:pt-40 md:pb-32">
      <div class="container mx-auto px-6 max-w-4xl">
        <!-- Back Link -->
        <NuxtLink to="/#portfolio" class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-muted hover:text-signal-red transition-colors mb-12 group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to Portfolio
        </NuxtLink>
        
        <!-- Header -->
        <header class="mb-12">
          <div class="flex items-center gap-4 mb-4">
            <span class="font-mono text-xs text-signal-red uppercase tracking-widest">{{ project.year }}</span>
            <span class="w-1 h-1 bg-hairline rounded-full"></span>
            <span class="font-mono text-xs text-slate-muted uppercase tracking-widest">{{ project.role }}</span>
          </div>
          <h1 class="font-display text-4xl md:text-5xl font-bold text-ink-black tracking-tight mb-6">
            {{ project.title }}
          </h1>
          <p class="font-sans text-xl text-ink-black/80 leading-relaxed">
            {{ project.shortDescription }}
          </p>
        </header>
        
        <!-- Tags & Links -->
        <div class="flex flex-col md:flex-row gap-8 md:items-center justify-between py-8 border-y border-hairline mb-16">
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tech in project.techStack" 
              :key="tech"
              class="bg-hairline text-ink-black font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 tag-angled"
            >
              {{ tech }}
            </span>
          </div>
          
          <div class="flex items-center gap-6 shrink-0">
            <a 
              v-if="project.githubUrl && project.githubUrl !== '#'" 
              :href="project.githubUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-sans font-medium uppercase tracking-widest text-ink-black hover:text-signal-red transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              Repository
            </a>
            <a 
              v-if="project.liveUrl && project.liveUrl !== '#'" 
              :href="project.liveUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-sans font-medium uppercase tracking-widest text-signal-red hover:text-ink-black transition-colors"
            >
              Live Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
          </div>
        </div>
        
        <!-- Project Details -->
        <article class="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-signal-red">
          <h2>The Problem</h2>
          <p>{{ project.problem }}</p>
          
          <h2>The Solution</h2>
          <p>{{ project.solution }}</p>
        </article>
      </div>
    </main>
    
    <div v-else class="min-h-screen flex items-center justify-center pt-32 pb-24">
      <div class="text-center">
        <h1 class="font-display text-4xl font-bold text-ink-black mb-4">Project Not Found</h1>
        <NuxtLink to="/#portfolio" class="text-signal-red font-mono uppercase tracking-widest text-sm hover:underline">
          Return to Portfolio
        </NuxtLink>
      </div>
    </div>
    
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '~/components/layout/AppNavbar.vue'
import ContactSection from '~/components/sections/ContactSection.vue'
import projectsData from '~/data/projects.json'

const route = useRoute()
const slug = route.params.slug as string

const project = computed(() => {
  return projectsData.find(p => p.slug === slug)
})

useSeoMeta({
  title: project.value ? `${project.value.title} — Fauzan Lubada` : 'Project Not Found',
  description: project.value?.shortDescription || '',
})
</script>
