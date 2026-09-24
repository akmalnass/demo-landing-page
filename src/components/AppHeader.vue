<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref} from 'vue'

const nav = ref<HTMLElement | null>(null)
const x = ref(0)
const width = ref(0)
const ready = ref(false)

const pillStyle = computed(() => ({
  transform: `translateX(${x.value}px)`,
  width: `${width.value}px`,
}))

let links: HTMLAnchorElement[] = []
let targets: (Element | null)[] = []
let current = 0
let observer: IntersectionObserver | undefined
let locked = false
let lockTimer: number | undefined

function moveTo(i: number) {
  if (i < 0 || i >= links.length) return
  const link = links[i]
  if (!link) return
  current = i
  links.forEach((a, idx) => a.classList.toggle('is-active', idx === i))
  x.value = link.offsetLeft
  width.value = link.offsetWidth
}

function onNavClick(event: MouseEvent) {
  const link = (event.target as HTMLElement).closest('a')
  if (!link) return
  const i = links.indexOf(link)
  if (i === -1) return
  moveTo(i)

  locked = true
  window.clearTimeout(lockTimer)
  lockTimer = window.setTimeout(() => {
    locked = false
  }, 1000)
}

function onResize() {
  moveTo(current)
}

onMounted(async () => {
  await nextTick()
  links = Array.from(nav.value?.querySelectorAll('a') ?? [])
  targets = links.map((a) => {
    const href = a.getAttribute('href') ?? ''
    return href.length > 1 && href.startsWith('#') ? document.querySelector(href) : null

  })

  moveTo(0)
  requestAnimationFrame(() => {
    ready.value = true
  })

  observer = new IntersectionObserver(
    (entries) => {
      if (locked) return
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const i = targets.indexOf(entry.target)
        if (i !== -1) moveTo(i)
      }
    },
    { rootMargin: '-50% 0px -50% 0px'},
  )
  targets.forEach((t) => {
    if (t) observer?.observe(t)
  })

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('resize', onResize)
  window.clearTimeout(lockTimer)
})
</script>

<template>
  <header class="header">
    <a href="#home" class="brand">Just Coffee</a>

    <nav ref="nav" class="nav" @click="onNavClick">
      <span class="pill" :class="{ ready }" :style="pillStyle" aria-hidden="true" />
      <slot />
    </nav>

    <RouterLink to="/register" class="contact">Sign Up</RouterLink>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  color: #fff;
  background: linear-gradient(to bottom, rgb(0 0 0 / 0.45), transparent);
}

.brand {
  color: inherit;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
}

.contact {
  padding: 0.5rem 1.25rem;
  border: 1px solid rgb(255 255 255 / 0.7);
  border-radius: 999px;
  background: transparent;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.contact:hover { background: rgb(255 255 255 / 0.15); }

/* ---------- Kapsul navigasi ---------- */
.nav {
  position: relative;
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  border: 1px solid rgb(255 255 255 / 0.5);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.12);
  backdrop-filter: blur(8px);
}

/* Pil putih yang bergerak */
.pill {
  position: absolute;
  top: 0.35rem;
  bottom: 0.35rem;
  left: 0;
  border-radius: 999px;
  background: #fff;
  opacity: 0;
  pointer-events: none;
}
.pill.ready {
  opacity: 1;
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav :slotted(a) {
  position: relative;
  z-index: 1;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  color: #fff;
  text-decoration: none;
  transition: color 0.4s ease, background 0.25s ease;
}
.nav :slotted(a.is-active) { color: #3b2a1f; }
.nav :slotted(a:hover:not(.is-active)) { background: rgb(255 255 255 / 0.15); }
.nav :slotted(a:focus-visible) { outline: 2px solid #fff; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .pill.ready { transition: none; }
}

@media (max-width: 640px) {
  .nav { display: none; }
}
</style>