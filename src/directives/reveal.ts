import type { Directive } from 'vue';

const observer = new IntersectionObserver(
(entries) => {
    for (const entry of entries) {
        const el = entry.target as HTMLElement
        el.classList.toggle('is-visible', entry.isIntersecting)
    }
},
{threshold: 0.15, rootMargin: '0px 0px -8% 0px'},
)

export const vReveal: Directive<HTMLElement, number | undefined> = {
    mounted(el, binding) {
        el.classList.add('reveal')
        if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
            observer.observe(el)
    },
    unmounted(el) {
        observer.unobserve(el)
    },
}