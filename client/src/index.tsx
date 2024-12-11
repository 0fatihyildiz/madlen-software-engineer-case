import { Theme } from '@radix-ui/themes'
import { Worker } from '@react-pdf-viewer/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import GeneralProvider from './context/GeneralContext.tsx'
import Home from './pages/home.tsx'

import '@react-pdf-viewer/core/lib/styles/index.css'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <GeneralProvider>
                <Theme className="main" accentColor="orange">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Toaster />
                        <Home />
                    </Worker>
                </Theme>
            </GeneralProvider>
        </QueryClientProvider>
    )
}

export default App
