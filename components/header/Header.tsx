import Link from "next/link"
import Menu from "./Menu"

const Header = () => {
  return (
    <header>
      <nav className="navbar justify-between bg-base-300">
        <Link href="/" className="btn btn-ghost text-lg">Sahil-it</Link>
       <Menu/>
      </nav>
    </header>
  )
}

export default Header
