import { create } from 'zustand'

interface StoreState {
  balance: number
}

interface StoreActions {
  setBalance: (balance: number) => void
}

export const useStore = create<StoreState & StoreActions>((set) => ({
  balance: 0,
  setBalance: (balance: number) => set({ balance }),
}))