import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav class="bg-gray-800 p-5">
        <div class="flex items-center justify-between">
          <div>
            <a href="#" class="text-white font-bold">TO-DO List</a>
          </div>
          <div class="hidden md:block">
            <a href="#" class="text-white mr-4 text-base transition duration-300 hover:text-lg">Home</a>
            <a href="#" class="text-white mr-4 text-base transition duration-300 hover:text-lg">About</a>
            <a href="#" class="text-white text-base transition duration-300 hover:text-lg">Contact</a>
          </div>
          <div class="md:hidden">
            <button class="text-white focus:outline-none">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
