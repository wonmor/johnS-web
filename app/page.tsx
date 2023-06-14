import React from 'react';

export default function Portfolio() {
  return (
    <>
      {/* About */}
      <section className="p-6 max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p>
          I'm a Software Engineer specializing in front-end development with an interest in back-end technologies.
          Experienced in modern JavaScript technologies and libraries, and a diverse set of skills covering areas such
          as responsive web design, accessibility, and performance optimization.
        </p>
      </section>

      {/* Skills */}
      <section className="p-6 max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap justify-center">
          <div className="p-4">
            <img src="/icons/swiftui.svg" alt="SwiftUI" className="w-12 h-12 mb-2" />
            <p>SwiftUI</p>
          </div>
          {/* Add more skills here */}
        </div>
      </section>

      {/* Projects */}
      <section className="p-6 max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded overflow-hidden shadow-md">
            <img src="/img/project.jpg" alt="Project" className="w-full" />
            <div className="px-6 py-4">
              <h3 className="font-bold text-xl mb-2">Project Title</h3>
              <p>Project description...</p>
            </div>
          </div>
          {/* Add more project cards here */}
        </div>
      </section>
    </>
  );
}
