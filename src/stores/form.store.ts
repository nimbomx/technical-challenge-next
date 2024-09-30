import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FormStoreState {
  count: number;
  increment: () => void;
}

const useFormStore = create<FormStoreState>()(
    persist(
        (set) => ({
            count: 0,
            increment: () => set((state) => ({ count: state.count + 1 })),
        }),
        {
            name: 'form-storage',
            storage: createJSONStorage(() => {
              if (typeof window !== 'undefined') {
                return sessionStorage;
              }
              // Retorna un storage de no operación (no-op) durante la renderización del lado del servidor
              return {
                getItem: () => null,
                setItem: () => {},
                removeItem: () => {},
              };
            }),
          }
    )
  );

export default useFormStore;