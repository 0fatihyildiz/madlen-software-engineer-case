import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import GeneralProvider from './context/GeneralContext.tsx'
import Home from './pages/home.tsx'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <GeneralProvider>
                <Theme className="main" accentColor="orange">
                    <Toaster />

                    <Home />
                </Theme>
            </GeneralProvider>
        </QueryClientProvider>
    )
}

export default App
