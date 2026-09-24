<script setup lang="ts">
import bg1 from '../assets/backgrounds/images.jpg'
import bg2 from '../assets/backgrounds/images2.jpg'
import bg3 from '../assets/backgrounds/images3.jpg'
import bg4 from '../assets/backgrounds/images4.jpg'
import { onMounted, onUnmounted, ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import BackgroundSlides from '../components/BackgroundSlides.vue';
import { vReveal } from '../directives/reveal';
import SiteFooter from '../components/SiteFooter.vue'

const features = [
  { title: 'Feature One', description: 'Description for feature one.' },
  { title: 'Feature Two', description: 'Description for feature two.' },
  { title: 'Feature Three', description: 'Description for feature three.' },
];

const images = [bg1, bg2, bg3, bg4];
const activeBg = ref(0);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeBg.value = Number((entry.target as HTMLElement).dataset.bg);
        }
      }
    },
    {rootMargin: '-50% 0px -50% 0px' },
  )
  document.querySelectorAll('[data-bg]').forEach((el) => observer?.observe(el));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>


<template>
  <BackgroundSlides :images="images" :active="activeBg" />

  <AppHeader>
    <a href="#home">Home</a>
    <a href="#features">Features</a>
    <a href="#join">Join</a>
  </AppHeader>

  <main>
    <section id="home" class="hero" data-bg="3">
      <div class="hero-text">
        <h1 v-reveal>Welcome to My Landing Page</h1>
        <p v-reveal="100">This is a simple landing page built with Vue.js.</p>
        <button class="btn" v-reveal="200">Get Started</button>
      </div>

      <figure class="hero-card" v-reveal="300">
        <img :src="bg1" alt="Freshly roasted coffee beans" />
        <figcaption>
          <strong>Freshly Roasted Coffee Beans </strong>
          <span>From the farm to your cup</span>
        </figcaption>
        </figure>
    </section>

    <section id="features" class="features" data-bg="1">
      <h2 v-reveal>Why you'll like it</h2>
      <div class="grid">
        <article
        v-for="(f,i) in features"
        :key="f.title"
        class="card"
        v-reveal="i * 150"
        >
          <h3>{{ f.title }}</h3>
          <p>{{ f.description }}</p>
        </article>
      </div>
    </section>

    <section id="join" class="cta" data-bg="2" v-reveal>
      <h2>Ready to get started?</h2>
    </section>
  </main>

  <SiteFooter />
</template>

<style scoped>

.hero,
.features,
.cta {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem 4rem;
  text-align: center;
}

/* ---------- Hero ---------- */
.hero { gap: 2.5rem; }
.hero-text { max-width: 36rem; }
.hero h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin: 0 0 1rem;
}
.hero p { margin: 0; }

.btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  border: 0;
  border-radius: 999px;
  background: #3b2a1f;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.hero-card {
  margin: 0;
  width: min(100%, 26rem);
  flex-shrink: 0;
  padding: 0.75rem;
  border-radius: 1.5rem;
  background: #fff;
  color: #1f1f1f;
  text-align: left;
  box-shadow: 0 20px 50px rgb(0 0 0 / 0.35);
}
.hero-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 1rem;
}
.hero-card figcaption {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.5rem 0.25rem;
}
.hero-card figcaption span { font-size: 0.875rem; color: #6b7280; }

/* Desktop: teks kiri tengah, kotak kanan */
@media (min-width: 900px) {
  .hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    width: 100%;
    max-width: 72rem;
    margin: 0 auto;
    padding-inline: 2rem;
    text-align: left;
  }
}

/* ---------- Features ---------- */
.features { scroll-margin-top: 4rem; }
.grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 2.5rem;
  width: 100%;
  max-width: 64rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
.card {
  padding: 2rem 1.5rem;
  border: 1px solid rgb(255 255 255 / 0.3);
  border-radius: 1rem;
  background: rgb(255 255 255 / 0.1);
  backdrop-filter: blur(6px);
}

/* ---------- Footer ---------- */
.footer {
  padding: 2rem;
  text-align: center;
  background: rgb(0 0 0 / 0.5);
}

</style>