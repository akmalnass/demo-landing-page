<script setup lang="ts">
defineProps<{
  label: string
  inputId: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="field" :class="{ invalid: error }">
    <label :for="inputId">{{ label }}<span v-if="required">*</span></label>
    <slot />
    <small v-if="error" class="error">{{ error }}</small>
  </div>
</template>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.4rem; text-align: left; }
label { font-size: 0.8rem; color: #374151; }

.field :slotted(input:not([type='checkbox'])),
.field :slotted(select) {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 0.85);
  color: #111;
  font: inherit;
  font-size: 0.9rem;
}
.field :slotted(input:focus),
.field :slotted(select:focus) {
  outline: 2px solid var(--accent, #3b2a1f);
  outline-offset: 1px;
}
.invalid :slotted(input),
.invalid :slotted(select) { border-color: #dc2626; }

.error { color: #dc2626; font-size: 0.72rem; }
</style>