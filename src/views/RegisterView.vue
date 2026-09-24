<script setup lang="ts">
import FormField from '../components/FormField.vue'
import { useRegistrationStore } from '../stores/registration'

const store = useRegistrationStore()
</script>

<template>
  <div class="register">
    <header class="topbar">
      <RouterLink to="/" class="brand">YourBrand</RouterLink>
      <RouterLink to="/" class="back">← Back to home</RouterLink>
    </header>

    <main class="wrap">
      <template v-if="!store.submitted">
        <h1>Let's get you started</h1>
        <p class="subtitle">Enter the details to get going</p>

        <ol class="steps">
          <li
            v-for="(label, i) in store.steps"
            :key="label"
            class="step"
            :class="{ active: i === store.step, done: i < store.step }"
          >
            <span class="circle">{{ i + 1 }}</span>
            <span class="label">{{ label }}</span>
          </li>
        </ol>

        <form
          class="form"
          novalidate
          @submit.prevent="store.isLast ? store.submit() : store.next()"
        >
          <!-- Langkah 1 -->
          <div v-if="store.step === 0" class="grid">
            <FormField label="First Name" input-id="firstName" required :error="store.errors.firstName">
              <input id="firstName" v-model="store.form.firstName" type="text" placeholder="Enter your first name" autocomplete="given-name" />
            </FormField>

            <FormField label="Last Name" input-id="lastName">
              <input id="lastName" v-model="store.form.lastName" type="text" placeholder="Enter your last name" autocomplete="family-name" />
            </FormField>

            <FormField label="Gender" input-id="gender" required :error="store.errors.gender">
              <select id="gender" v-model="store.form.gender">
                <option value="" disabled>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </FormField>

            <FormField label="Date of Birth" input-id="dob" required :error="store.errors.dob">
              <input id="dob" v-model="store.form.dob" type="date" />
            </FormField>

            <FormField label="Email Address" input-id="email" required :error="store.errors.email">
              <input id="email" v-model="store.form.email" type="email" placeholder="Enter your email address" autocomplete="email" />
            </FormField>

            <FormField label="Phone Number" input-id="phone" required :error="store.errors.phone">
              <input id="phone" v-model="store.form.phone" type="tel" placeholder="+60 12 345 6789" autocomplete="tel" />
            </FormField>

            <FormField label="Country" input-id="country" required :error="store.errors.country">
              <select id="country" v-model="store.form.country">
                <option value="" disabled>Select</option>
                <option>Malaysia</option>
                <option>Singapore</option>
                <option>Indonesia</option>
                <option>Other</option>
              </select>
            </FormField>
          </div>

          <!-- Langkah 2 -->
          <div v-else-if="store.step === 1" class="grid">
            <FormField label="Favourite Coffee" input-id="coffee" required :error="store.errors.coffee">
              <select id="coffee" v-model="store.form.coffee">
                <option value="" disabled>Select</option>
                <option>Espresso</option>
                <option>Latte</option>
                <option>Cold brew</option>
                <option>Pour over</option>
              </select>
            </FormField>

            <FormField label="Format" input-id="format">
              <select id="format" v-model="store.form.format">
                <option>Whole beans</option>
                <option>Ground</option>
              </select>
            </FormField>

            <label class="check full">
              <input v-model="store.form.newsletter" type="checkbox" />
              Send me news and offers
            </label>
          </div>

          <!-- Langkah 3 -->
          <dl v-else class="review">
            <div v-for="row in store.summary" :key="row.label">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value || '—' }}</dd>
            </div>
          </dl>

          <div class="actions">
            <button v-if="store.step > 0" type="button" class="btn ghost" @click="store.back()">
              Back
            </button>
            <button type="submit" class="btn" :disabled="store.loading">
              {{ store.isLast ? (store.loading ? 'Submitting…' : 'Submit') : 'Next' }}
            </button>
          </div>
        </form>
      </template>

      <section v-else class="success">
        <h1>You're all set, {{ store.form.firstName }}!</h1>
        <p class="subtitle">We'll send a confirmation to {{ store.form.email }}.</p>
        <RouterLink to="/" class="btn" @click="store.reset()">Back to home</RouterLink>
      </section>
    </main>
  </div>
</template>

<style scoped>
.register {
  --accent: #3b2a1f;
  min-height: 100vh;
  color: #1f1f1f;
  background:
    radial-gradient(circle at 0% 0%, #ece8f5 0, transparent 40%),
    radial-gradient(circle at 100% 40%, #fbeccb 0, transparent 40%),
    radial-gradient(circle at 40% 100%, #e3eefb 0, transparent 40%),
    #fff;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}
.brand {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-decoration: none;
}
.back { color: inherit; font-size: 0.9rem; text-decoration: none; }
.back:hover { text-decoration: underline; }

.wrap {
  max-width: 44rem;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem;
  text-align: center;
}
h1 {
  margin: 1.5rem 0 0.25rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}
.subtitle { margin: 0; color: #6b7280; }

/* ---------- Stepper ---------- */
.steps {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  color: #9ca3af;
}
.step:not(:last-child)::after {
  content: '';
  width: clamp(1rem, 4vw, 3rem);
  height: 1px;
  margin-left: 0.5rem;
  background: #d1d5db;
}
.circle {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.step.active { color: var(--accent); font-weight: 600; }
.step.done { color: var(--accent); }
.step.done .circle { background: var(--accent); border-color: var(--accent); color: #fff; }

@media (max-width: 640px) {
  .step:not(.active) .label { display: none; }
}

/* ---------- Form ---------- */
.form { margin-top: 2.5rem; text-align: left; }
.grid { display: grid; gap: 1.25rem 2rem; grid-template-columns: 1fr; }
@media (min-width: 640px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
.full { grid-column: 1 / -1; }

.check { display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; }
.check input { width: 1.1rem; height: 1.1rem; accent-color: var(--accent); }

.review { display: grid; gap: 0.75rem; margin: 0; }
.review div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}
.review dt { color: #6b7280; }
.review dd { margin: 0; font-weight: 600; text-align: right; }

.actions { display: flex; justify-content: center; gap: 0.75rem; margin-top: 2rem; }
.btn {
  display: inline-block;
  padding: 0.75rem 2.5rem;
  border: 1px solid var(--accent);
  border-radius: 0.5rem;
  background: var(--accent);
  color: #fff;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}
.btn.ghost { background: transparent; color: var(--accent); }
.btn:disabled { opacity: 0.6; cursor: progress; }

.success { padding: 4rem 0; }
.success .btn { margin-top: 2rem; }
</style>