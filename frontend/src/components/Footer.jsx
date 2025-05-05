import { Github, Linkedin, Code, Mail } from "lucide-react";

export default function Footer() {
  const links = [];

  return (
    <>
      <div className="h-auto bg-d-display text-white text-xl py-4 flex flex-col justify-center items-center md:flex-row">
        <div className="w-full md:w-1/2 h-full text-xs flex justify-center items-center mb-2 md:mb-0">
          © 2025 PulseBoard. Built with React, Node.js, PostgreSQL.
        </div>
        <div className="w-full md:w-1/2 text-xs justify-center items-center flex flex-row gap-x-2 md:gap-x-5 mt-2 md:mt-0">
          <a
            href="https://github.com/Jo3-h/PulseBoard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 flex flex-row items-center justify-center gap-x-2"
          >
            <Github size={24} /> Github
          </a>
          <a
            href="https://github.com/Jo3-h/PulseBoard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold hover:text-gray-300 flex flex-row items-center justify-center gap-x-2"
          >
            <Linkedin size={24} /> LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/Jo3-h/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold hover:text-gray-300 flex flex-row items-center justify-center gap-x-2"
          >
            <Code size={24} /> Leetcode
          </a>
          <a
            href="mailto:joe.hosking1@gmail.com"
            target="_blank"
            className="text-white font-bold hover:text-gray-300 flex flex-row items-center justify-center gap-x-2"
            rel="noopener noreferrer"
          >
            <Mail size={24} className="hover:text-someColor transition" /> Email
          </a>
        </div>
      </div>
    </>
  );
}
