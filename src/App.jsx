import { cn } from '@/lib/utils'

function App() {
  return (
    <main className={cn('app-shell', 'w-full')}>
      <section className={cn('hero-card')} aria-labelledby="restart-title">
        <p className="eyebrow">Foundation Reset</p>
        <h1 id="restart-title">DaveOps Portfolio Restart</h1>
        <p className="supporting-copy">
          Fresh Vite + React baseline for the next rebuild. No 3D, no hero system,
          and no legacy portfolio sections.
        </p>
      </section>
    </main>
  )
}

export default App
