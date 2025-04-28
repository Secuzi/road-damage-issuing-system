import {createContext, useContext} from 'react'

export const AppContentContext = createContext()

export const useAppContentContext = () => useContext(AppContentContext)
