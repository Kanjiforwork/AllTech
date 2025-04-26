import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/placeholder.svg" 
            alt="AllTech Logo" 
            width={40} 
            height={40} 
            className="mr-2"
          />
          <span className="text-xl font-bold">AllTech</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link href="/laptops" className="hover:text-blue-600">Laptops</Link></li>
            <li><Link href="/reviews" className="hover:text-blue-600">Reviews</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
