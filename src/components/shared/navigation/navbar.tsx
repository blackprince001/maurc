import NavClient from './nav-client'

export default function NavBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <NavClient />
    </header>
  )
}