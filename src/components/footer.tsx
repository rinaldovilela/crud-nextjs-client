import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r  from-green-600 to-gray-600 text-white p-4 mt-8">
      <div className="text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sistema de Devs. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
