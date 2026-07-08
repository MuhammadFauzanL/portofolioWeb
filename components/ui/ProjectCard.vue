<template>
  <article 
    class="bg-paper-white card-cut-corner border border-hairline shadow-sm hover:shadow-[0_8px_0_0_rgba(21,21,26,0.05)] transition-all duration-300 group flex flex-col h-full"
  >
    <!-- Thumbnail -->
    <div class="aspect-video bg-hairline relative overflow-hidden card-cut-corner border-b border-hairline">
      <img v-if="project.thumbnail && !imageError" :src="project.thumbnail" :alt="project.title" @error="imageError = true" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div v-else class="w-full h-full flex items-center justify-center bg-signal-red">
        <span class="font-display font-bold text-4xl text-paper-white">{{ initials }}</span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6 flex-1 flex flex-col relative z-10">
      <NuxtLink :to="'/projects/' + project.slug" class="block mb-2 group-hover:text-signal-red transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-red">
        <h3 class="font-display font-bold text-xl text-ink-black inherit-color">{{ project.title }}</h3>
      </NuxtLink>
      <p class="font-sans text-sm text-ink-black/80 leading-relaxed mb-6 flex-1">
        {{ project.shortDescription }}
      </p>
      
      <!-- Tech Stack Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span 
          v-for="tech in project.techStack" 
          :key="tech"
          class="bg-hairline text-slate-muted font-mono text-[10px] uppercase tracking-widest px-2 py-1 tag-angled"
        >
          {{ tech }}
        </span>
      </div>
      
      <!-- Links -->
      <div class="flex items-center gap-4 mt-auto pt-4 border-t border-hairline flex-wrap">
        <NuxtLink 
          :to="'/projects/' + project.slug"
          class="inline-flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-widest text-signal-red hover:text-ink-black transition-colors"
        >
          Details
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>
        <a 
          v-if="project.githubUrl && project.githubUrl !== '#'" 
          :href="project.githubUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-sans font-medium uppercase tracking-widest text-slate-muted hover:text-signal-red transition-colors ml-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Repo
        </a>
        <a 
          v-if="project.liveUrl && project.liveUrl !== '#'" 
          :href="project.liveUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-sans font-medium uppercase tracking-widest text-slate-muted hover:text-signal-red transition-colors"
          :class="!(project.githubUrl && project.githubUrl !== '#') ? 'ml-auto' : ''"
        >
          Demo
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  project: {
    id: string;
    title: string;
    thumbnail?: string;
    shortDescription: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  }
}>()

const imageError = ref(false)

const initials = computed(() => {
  if (!props.project?.title) return 'P'
  return props.project.title
    .split(' ')
    .filter(w => w.length > 0)
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})
</script>
