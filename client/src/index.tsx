import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/home.tsx'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Theme className="main" accentColor="orange">
                <Home />
            </Theme>
        </QueryClientProvider>
    )
}

export default App
