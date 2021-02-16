import { Directive } from "vue";

type extendedEl = HTMLElement & { clickOutsideEvent: (e: MouseEvent) => void };

export const ClickOutside: Directive = {
    beforeMount(el: extendedEl, binding) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el: extendedEl) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
};