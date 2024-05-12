import Link from "next/link"

const Header = () => {
  return (
    <header>
      <nav className="navbar justify-between bg-base-300">
        <Link href="/" className="btn btn-ghost text-lg">Sahil-it</Link>
        <ul className="flex gap-2">
            <li>
                <Link href="/cart" className="btn btn-ghost text-lg" >Cart</Link>
            </li>
            <li>
                <Link href="/signin" className="btn btn-ghost text-lg" >Sign In</Link>
            </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
