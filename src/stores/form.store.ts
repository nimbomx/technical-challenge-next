import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FORM_STATUS } from '@/constants/FORM_STATUS';

interface FormStoreState {
  step: number;
  status: keyof typeof FORM_STATUS;
  increment: () => void;
  setStep: (step:number) => void;
  setStatus: (status:keyof typeof FORM_STATUS) => void;
}

const useFormStore = create<FormStoreState>()(
    persist(
        (set) => ({
            step: 0,
            status: 'in_progress',
            increment: () => set((state) => {
                return ({ 
                    step: state.step >= 2 ? 0 :state.step + 1
                })
            }),
            setStep: (step) => set(() => ({ step})),
            setStatus: (status) => set(() => ({ status }) ),
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