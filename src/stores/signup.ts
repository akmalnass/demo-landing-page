import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSignupStore = defineStore('signup', () => {
    const email = ref('');
    const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle');
    const errorMessage = ref('');


    async function submit() {
        status.value = 'loading';
        try {
            await new Promise((resolve) => setTimeout(resolve, 800));
            status.value = 'success';
        } catch {
            status.value = 'error';
            errorMessage.value = 'Something went wrong. Please try again.';
        }
    }

    return {
        email,
        status,
        errorMessage,
        submit
    };
});