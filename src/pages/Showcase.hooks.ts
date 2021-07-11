import create, { State } from "zustand";

export interface ViewState extends State {
  width: number
  height: number
}

export const useViewStore = create<ViewState>(set => ({
  width: 0,
  height: 0,
}))

export interface ScrollState extends State {
  y: number | undefined
}

export const useScrollStore = create<ScrollState>(set => ({
  y: undefined
}))