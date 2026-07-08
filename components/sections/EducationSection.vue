<template>
  <section id="education" class="py-24 md:py-32 bg-paper-white border-t border-hairline relative">
    <div class="container mx-auto px-6 max-w-7xl">
      <SectionHeading>Education & Certifications</SectionHeading>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <!-- Education -->
        <div>
          <h3 class="font-mono text-sm uppercase tracking-widest text-slate-muted mb-8 flex items-center gap-4">
            Formal Education
            <span class="flex-1 h-px bg-hairline"></span>
          </h3>
          <div class="space-y-8">
            <div v-for="(edu, index) in profile.education" :key="index" class="p-6 border border-hairline card-cut-corner bg-paper-white hover:shadow-sm transition-shadow">
              <div class="font-mono text-xs text-signal-red mb-2">{{ edu.period }}</div>
              <h4 class="font-display font-bold text-lg text-ink-black mb-1">{{ edu.degree }}</h4>
              <div class="font-sans text-sm text-ink-black/70 mb-3">{{ edu.institution }} • {{ edu.location }}</div>
              <p class="font-sans text-sm text-ink-black/80 leading-relaxed">{{ edu.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- Certifications -->
        <div>
          <h3 class="font-mono text-sm uppercase tracking-widest text-slate-muted mb-8 flex items-center gap-4">
            Certifications & Courses
            <span class="flex-1 h-px bg-hairline"></span>
          </h3>
          <div class="space-y-4">
            <div v-for="(cert, index) in profile.certifications" :key="'cert-'+index" class="p-4 border border-hairline tag-angled bg-deep-ink text-paper-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 class="font-sans font-medium text-sm">{{ cert.title }}</h4>
                <div class="font-mono text-[10px] uppercase tracking-widest text-paper-white/60 mt-1">{{ cert.issuer }}</div>
              </div>
              <div class="font-mono text-[10px] text-signal-red shrink-0">{{ cert.date }}</div>
            </div>
            
            <div v-for="(course, index) in profile.courses" :key="'course-'+index" class="p-4 border border-hairline tag-angled bg-paper-white hover:border-signal-red transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 class="font-sans font-medium text-sm text-ink-black">{{ course.title }}</h4>
                <div class="font-mono text-[10px] uppercase tracking-widest text-slate-muted mt-1">{{ course.issuer }}</div>
              </div>
              <div class="font-mono text-[10px] text-slate-muted shrink-0">{{ course.period }}</div>
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
