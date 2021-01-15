import React from 'react'

// creating the theme context
const { Consumer, Provider } = React.createContext()

export const ThemeConsumer = Consumer // consuming information from provider
export const ThemeProvider = Provider // holds the information