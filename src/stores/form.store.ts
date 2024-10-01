import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FORM_STATUS } from '@/constants/FORM_STATUS';
import { FormData } from '@/types/FormData.type';

interface FormStoreState {
  data: FormData;
  step: number;
  max_step: number;
  status: keyof typeof FORM_STATUS;
  increment: () => void;
  setStep: (step:number) => void;
  setStatus: (status:keyof typeof FORM_STATUS) => void;
  updateData: (newData: Partial<FormData>) => void;
}

const useFormStore = create<FormStoreState>()(
    persist(
        (set) => ({
            data: {
              name:'Sancrisoft, LLC',
              type:'Limited Liability Company',
              address:{
                line1:'123 Main street',
                line2:'Suite 123',
                city:'Tampa',
                state:'FL',
                zip:'33626',
              },
              contact:{
                firstName:'John',
                lastName:'Doe',
                email:'john@sancrisoft.com',
                phone:'02'
              }
            },
            step: 0,
            max_step: 0,
            status: 'in_progress',
            increment: () => set((state) => {
                return ({ 
                    step: state.step >= 2 ? 0 :state.step + 1
                })
            }),
            setStep: (step) => set(() => ({ step})),
            setStatus: (status) => set(() => ({ status }) ),
            updateData: (newData) => set((state) => ({
                data: {
                  ...state.data,
                  ...newData,
                },
            })),
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