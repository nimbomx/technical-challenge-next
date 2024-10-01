import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FORM_STATUS } from '@/constants/FORM_STATUS';
import { FormData } from '@/types/FormData.type';
import { countries } from '@/constants/COUNTRIES';
import { CountryType } from '@/types/Country.type';

interface FormStoreState {
  data: FormData;
  step: number;
  message: string;
  max_step: number;
  status: keyof typeof FORM_STATUS;
  country:CountryType;
  increment: () => void;
  setCountry: (country:CountryType) => void;
  setStep: (step:number) => void;
  setMaxStep: (max_step:number) => void;
  setMessage: (message:string) => void;
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
            message: '',
            country: countries[0],
            status: 'in_progress',
            increment: () => set((state) => {
                return ({ 
                    step: state.step >= 2 ? 0 :state.step + 1
                })
            }),
            setStep: (step) => set(() => ({ step})),
            setMaxStep: (max_step) => set(() => ({ max_step, step:max_step})),
            setStatus: (status) => set(() => ({ status }) ),
            setMessage: (message) => set(() => ({ message }) ),
            setCountry: (country) => set(() => ({ country }) ),
            updateData: (newData) => set((state) => ({
                status: 'in_progress',
                data: {
                  ...state.data,
                  ...newData,
                },
            })),
            clearData: () => set(() => ({data:EMPTY, country:countries[0]}))
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