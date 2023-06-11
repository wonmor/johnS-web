// Import necessary modules
import React from 'react'

export default function Portfolio() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white py-2 text-center">
            <header className="text-4xl font-bold mt-10">
                <h1 className="font-sans text-gray-800">John Seong</h1>
                <p className="text-2xl text-gray-600 mt-2">Software Engineer</p>
            </header>

            <section className="w-full px-10 mt-10">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Skills</h2>
                <div className="flex flex-wrap justify-center items-center gap-10">
                    <div className="flex flex-col items-center">
                        <img src="/icons/swiftui.svg" alt="SwiftUI" className="w-16 h-16"/>
                        <p className="mt-2 text-gray-700">SwiftUI</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/icons/python.svg" alt="Python" className="w-16 h-16"/>
                        <p className="mt-2 text-gray-700">Python</p>
                    </div>

                    {/* Add more skill icons here... */}
                </div>
            </section>

            <h2 className="text-3xl font-semibold text-gray-800 mt-10">Projects</h2>

            <main className="flex flex-wrap justify-around items-center w-full px-10">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <img className="h-48 w-full object-cover md:w-48" src="/img/work1.jpg" alt="Project image"/>
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Project 1</div>
                            <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Awesome Project</a>
                            <p className="mt-2 text-gray-500">Description of the project...</p>
                        </div>
                    </div>
                </div>
                
                {/* ... more project cards ... */}
                
            </main>

            <footer className="flex items-center justify-center w-full h-24 border-t mt-10">
                <a className="flex items-center justify-center">
                    &copy; {new Date().getFullYear()} John Seong. All rights reserved.
                </a>
            </footer>
        </div>
    )
}
