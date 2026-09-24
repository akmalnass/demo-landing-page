<script setup lang="ts">
// Ganti semua nilai ini dengan maklumat syarikat sebenar
const company = {
  name: 'Just Coffee',
  tagline: 'Freshly roasted, from the farm to your cup.',
  phone: '+60 3-0000 0000',
  whatsapp: '+60 12-000 0000',
  email: 'hello@example.com',
  address: 'Your street address, City, Postcode, Country',
}

const digits = (value: string) => value.replace(/\D/g, '')

const telHref = `tel:+${digits(company.phone)}`
const waHref = `https://wa.me/${digits(company.whatsapp)}`
const mailHref = `mailto:${company.email}`

const mapEmbed =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7966.87470354837!2d101.70003064186449!3d3.2408749269449757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4762d91525e9%3A0xd61393fb8ec82ed7!2sJalan%20SG%203%2F1%2C%20Taman%20Sri%20Gombak%2C%2068100%20Batu%20Caves%2C%20Selangor!5e0!3m2!1sen!2smy!4v1789977356075!5m2!1sen!2smy'
const mapLink = 'https://maps.app.goo.gl/FrJquYhHM82LtXDN9'
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="footer-grid">
      <!-- Jenama -->
      <section>
        <a href="#home" class="brand">{{ company.name }}</a>
        <p class="tagline">{{ company.tagline }}</p>
      </section>

      <!-- Link -->
      <nav aria-label="Footer">
        <h3>Explore</h3>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#join">Join</a></li>
          <li><RouterLink to="/register">Sign Up</RouterLink></li>
        </ul>
      </nav>

      <!-- Hubungi kami -->
      <section>
        <h3>Contact Us</h3>
        <ul class="contact-list">
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </span>
            <a :href="telHref">{{ company.phone }}</a>
          </li>
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </span>
            <a :href="waHref" target="_blank" rel="noopener">{{ company.whatsapp }} (WhatsApp)</a>
          </li>
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </span>
            <a :href="mailHref">{{ company.email }}</a>
          </li>
          <li>
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </span>
            <address>{{ company.address }}</address>
          </li>
        </ul>
      </section>

      <!-- Peta -->
      <section>
        <h3>Find Us</h3>
        <div class="map">
          <iframe
            :src="mapEmbed"
            :title="`Map showing the location of ${company.name}`"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>
        <a :href="mapLink" target="_blank" rel="noopener" class="map-link">
          Open in Google Maps ↗
        </a>
      </section>
    </div>

    <p class="copyright">© 2026 {{ company.name }}. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 4rem 2rem 1.5rem;
  color: #fff;
  background: rgb(0 0 0 / 0.6);
  backdrop-filter: blur(10px);
}

.footer-grid {
  display: grid;
  gap: 2.5rem;
  max-width: 76rem;
  margin: 0 auto;
}
@media (min-width: 700px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
  .footer-grid { grid-template-columns: 1.1fr 0.7fr 1.3fr 1.5fr; }
}

h3 { margin: 0 0 1rem; font-size: 1rem; }
a { color: inherit; text-decoration: none; }
li a:hover,
.map-link:hover { text-decoration: underline; }

.brand {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.tagline {
  max-width: 18rem;
  margin: 0.75rem 0 0;
  color: rgb(255 255 255 / 0.75);
}

ul { display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none; }
.contact-list li { display: flex; align-items: center; gap: 0.75rem; }

.icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.15);
}
.icon svg {
  width: 1.05rem;
  height: 1.05rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
address { margin: 0; font-style: normal; line-height: 1.5; }

.map {
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: 1rem;
}
.map iframe { display: block; width: 100%; height: 14rem; border: 0; }
.map-link { display: inline-block; margin-top: 0.75rem; font-size: 0.9rem; }

.copyright {
  max-width: 76rem;
  margin: 3rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(255 255 255 / 0.2);
  color: rgb(255 255 255 / 0.7);
  font-size: 0.85rem;
  text-align: center;
}
</style>