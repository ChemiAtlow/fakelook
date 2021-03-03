import { shallowRef } from "vue";
import type { Component } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ModalInstance<T extends {} = any> {
    close: (value?: T) => void;
}
type closeModal<T extends ModalInstance> = Parameters<T["close"]>[0];
class ModalWrapper<T extends ModalInstance> {
    public promise: Promise<closeModal<T>>;
    public resolve!: (value: closeModal<T>) => void;

    constructor(public Component: Component<T>, public props: Omit<T, "close">) {
        this.promise = new Promise(res => {
            this.resolve = res;
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalInstances = shallowRef<ModalWrapper<any>[]>([]);

export const openModal = <T extends ModalInstance>(
    Component: Component<T>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Omit<T, "close"> = {} as any
) => {
    const modal = new ModalWrapper<T>(Component, props);
    modalInstances.value = [...modalInstances.value, modal];
    return modal.promise;
};
export const closeModal = <V extends {}, T extends ModalInstance<V>>(
    modal: ModalWrapper<T>,
    value: V
) => {
    modal.resolve(value);
    modalInstances.value = modalInstances.value.filter(m => m !== modal);
};
export const closeLastModal = () => {
    const lastModal = modalInstances.value.pop();
    lastModal?.resolve(undefined);
    modalInstances.value = [...modalInstances.value];
};
