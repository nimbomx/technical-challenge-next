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
  setMaxStep: (max_step:number) => void;
  setStatus: (status:keyof typeof FORM_STATUS) => void;
  updateData: (newData: Partial<FormData>) => void;
  clearData: () => void;
}

const EMPTY:FormData = {
  name:'',
  type:'',
  address:{
    line1:'',
    line2:'',
    city:'',
    state:'',
    zip:'',
  },
  contact:{
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
}
const useFormStore = create<FormStoreState>()(
    persist(
        (set) => ({
            data: EMPTY,
            step: 0,
            max_step: 0,
            status: 'in_progress',
            increment: () => set((state) => {
                return ({ 
                    step: state.step >= 2 ? 0 :state.step + 1
                })
            }),
            setStep: (step) => set(() => ({ step})),
            setMaxStep: (max_step) => set(() => ({ max_step, step:max_step})),
            setStatus: (status) => set(() => ({ status }) ),
            updateData: (newData) => set((state) => ({
                status: 'in_progress',
                data: {
                  ...state.data,
                  ...newData,
                },
            })),
            clearData: () => set(() => ({data:EMPTY}))
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