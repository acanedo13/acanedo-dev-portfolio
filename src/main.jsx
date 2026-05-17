import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  fonts: {
     // VIBE 1: THE "TECHNICAL ELITE" (Inter everywhere - Ben Scott style)
    // heading: `'Inter', sans-serif`,
    // body: `'Inter', sans-serif`,

    // VIBE 2: THE "CYBER ANALYST" (Space Grotesk Headings + Inter Body)
    // heading: `'Space Grotesk', sans-serif`,
    // body: `'Inter', sans-serif`,

    // VIBE 3: THE "MODERN DESIGNER" (Plus Jakarta Sans everywhere)
    // heading: `'Plus Jakarta Sans', sans-serif`,
    // body: `'Plus Jakarta Sans', sans-serif`,

    // VIBE 4: THE "SOPHISTICATED AGENT" (Space Grotesk Headings + Lora Body)
    heading: `'Space Grotesk', sans-serif`,
    body: `'Lora', serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </>
)