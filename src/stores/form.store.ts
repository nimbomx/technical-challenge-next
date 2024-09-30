import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FORM_STATUS } from '@/constants/FORM_STATUS';

interface FormStoreState {
  step: number;
  status: keyof typeof FORM_STATUS;
  increment: () => void;
}

const useFormStore = create<FormStoreState>()(
    persist(
        (set) => ({
            step: 0,
            status: 'in_progress',
            increment: () => set((state) => {
                const nextStep = state.step >= 2 ? 0 :state.step + 1
                return ({ 
                    step: nextStep,
                    status: nextStep === 0 ? 'init' : 'in_progress' 
                })
            }),
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