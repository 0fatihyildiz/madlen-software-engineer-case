import { Theme } from '@radix-ui/themes'
import Home from './pages/Home'

function App() {
    return (
        <>
            <Theme className="main" accentColor="orange">
                <Home />
            </Theme>
        </>
    )
}

export default App
