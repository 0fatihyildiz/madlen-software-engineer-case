import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages/Home'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Theme className="main" accentColor="orange">
                <Home />
            </Theme>
        </QueryClientProvider>
    )
}

export default App
