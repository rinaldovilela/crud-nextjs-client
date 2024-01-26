import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 to-gray-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sistema de Devs</h1>
        <div className="space-x-4">
          <a
            href="/"
            className="px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition duration-300"
          >
            Listar
          </a>
          <a
            href="/criar-atualizar"
            className="px-4 py-2 rounded-lg bg-white text-gray-800 hover:bg-gray-200 transition duration-300"
          >
            Criar/Atualizar
          </a>
        </div>
      </nav>
    </header>
  );
}
