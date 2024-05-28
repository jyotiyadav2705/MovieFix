import { createContext, useContext } from 'react'
import { create, useStore } from 'zustand'

export const StoreContext = createContext(null)

export const useHomeStore = () => {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error('Missing StoreProvider')
    }
    return useStore(store)// return states
}
export const initializeStore = (preloadedState = {}) => {
    return create((set, get) => {
        return {
            ...preloadedState,
            genre: [],
            setGenre: (val) => {
                set({
                    ...get(),
                    genre: val,
                })
            },
            selectedCategory: [],
            setSelectedCategory: (val) => {
                set({
                    ...get(),
                    selectedCategory: val
                })
            }
        }
    })
}

export const useCreateStore = (pageProps) => {
    let _store = initializeStore(pageProps); //initialise store 
    return _store;

}


