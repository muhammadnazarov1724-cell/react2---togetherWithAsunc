import { create } from 'zustand'
import { apiZustand } from '../utils/api';
import axios from 'axios';

export const useData = create((set,get): any => ({
    dataZ:[],
    get: async()=> {
        try {
          let {data} = await axios.get(apiZustand)
            set((state) => ({dataZ: data}))
        } catch (error) {
            console.log(error);
        }
    },

    deleteZustand: async(id) => {
        try {
            await axios.delete(`${apiZustand}/${id}`)
            get().get()
        } catch (error) {
            console.log(error);
        }
    }

}))