import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pàgina no trobada'
}

const NotFound = () => {
  return (
    <main>
      <h1>No s’ha trobat la pàgina</h1>
      <p>La pàgina que busques no existeix.</p>
    </main>
  )
}

export default NotFound
