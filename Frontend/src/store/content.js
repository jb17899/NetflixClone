import {create } from 'zustand';
export const useContentStore = create((set)=>{
    return{
        contentType:"movie",
        setContentType:(type)=>{
            set((state)=>({
                contentType:type
            }))
        }
    }
})