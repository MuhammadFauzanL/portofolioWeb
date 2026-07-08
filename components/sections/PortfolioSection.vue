<template>
  <section id="portfolio" class="py-24 md:py-32 bg-paper-white relative">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <SectionHeading class="!mb-0">Portfolio</SectionHeading>
        <p class="text-slate-muted font-sans text-sm max-w-sm">
          A collection of projects showcasing my focus on clean code, performance, and user experience.
        </p>
      </div>
      
      <div v-if="!projects || projects.length === 0" class="py-20 text-center border border-dashed border-hairline card-cut-corner bg-paper-white/50">
        <p class="font-mono text-sm text-slate-muted uppercase tracking-widest">No projects found</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in sortedProjects" 
          :key="project.id" 
          :project="project" 
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '../ui/SectionHeading.vue'
import ProjectCard from '../ui/ProjectCard.vue'
import projectsData from '~/data/projects.json'

const projects = projectsData

const sortedProjects = computed(() => {
  if (!projects) return []
  return [...projects].sort((a, b) => (a.order || 99) - (b.order || 99))
})
</script>
