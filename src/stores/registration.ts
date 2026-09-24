import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'

export interface RegistrationForm {
  firstName: string
  lastName: string
  gender: string
  dob: string
  email: string
  phone: string
  country: string
  coffee: string
  format: string
  newsletter: boolean
}

type FieldKey = keyof RegistrationForm

const emptyForm = (): RegistrationForm => ({
  firstName: '',
  lastName: '',
  gender: '',
  dob: '',
  email: '',
  phone: '',
  country: '',
  coffee: '',
  format: 'Whole beans',
  newsletter: false,
})

const requiredMessages: Partial<Record<FieldKey, string>> = {
  firstName: 'Please enter first name',
  gender: 'Please select gender',
  dob: 'Please enter date of birth',
  email: 'Please enter email address',
  phone: 'Please enter phone number',
  country: 'Please select country',
  coffee: 'Please choose a coffee',
}

// medan wajib bagi setiap langkah
const fieldsByStep: FieldKey[][] = [
  ['firstName', 'gender', 'dob', 'email', 'phone', 'country'],
  ['coffee'],
  [],
]

export const useRegistrationStore = defineStore('registration', () => {
  const steps = ['General Details', 'Preferences', 'Review & Submit']
  const step = ref(0)
  const loading = ref(false)
  const submitted = ref(false)
  const form = reactive<RegistrationForm>(emptyForm())
  const errors = reactive<Partial<Record<FieldKey, string>>>({})

  const isLast = computed(() => step.value === steps.length - 1)

  const summary = computed(() => [
    { label: 'Name', value: `${form.firstName} ${form.lastName}`.trim() },
    { label: 'Gender', value: form.gender },
    { label: 'Date of birth', value: form.dob },
    { label: 'Email', value: form.email },
    { label: 'Phone', value: form.phone },
    { label: 'Country', value: form.country },
    { label: 'Favourite coffee', value: form.coffee },
    { label: 'Format', value: form.format },
    { label: 'Newsletter', value: form.newsletter ? 'Yes' : 'No' },
  ])

  // padam mesej error sebaik sahaja pengguna mengubah medan itu
  for (const key of Object.keys(form) as FieldKey[]) {
    watch(
      () => form[key],
      () => {
        errors[key] = ''
      },
    )
  }

  function validate() {
    let valid = true
    for (const key of fieldsByStep[step.value] ?? []) {
      const value = String(form[key]).trim()
      if (!value) {
        errors[key] = requiredMessages[key] ?? 'This field is required'
        valid = false
      } else if (key === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        errors[key] = 'Please enter a valid email address'
        valid = false
      } else {
        errors[key] = ''
      }
    }
    return valid
  }

  function next() {
    if (validate() && !isLast.value) step.value++
  }

  function back() {
    if (step.value > 0) step.value--
  }

  async function submit() {
    if (!validate()) return
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 800)) // nanti: simpan ke Firebase
    loading.value = false
    submitted.value = true
  }

  function reset() {
    Object.assign(form, emptyForm())
    for (const key of Object.keys(errors) as FieldKey[]) delete errors[key]
    step.value = 0
    submitted.value = false
  }

  return { steps, step, form, errors, loading, submitted, isLast, summary, next, back, submit, reset }
})