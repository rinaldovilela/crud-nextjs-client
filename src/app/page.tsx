"use client";
import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { FaTrash } from "react-icons/fa";
import { Spinner } from "@nextui-org/react";

interface Developer {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [devs, setDevs] = useState<Developer[]>([]);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    setLoading(true);
    try {
      const response = await api.get("http://localhost:3333/developers");
      setDevs(response.data);
    } catch (error) {
      alert("Erro ao carregar os devs");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteDeveloper(id);
      const updatedDevelopers = devs.filter((dev) => dev.id !== id);
      setDevs(updatedDevelopers);
    } catch (error) {
      alert("Erro ao deletar o dev");
    }
  };

  const deleteDeveloper = async (id: number) => {
    try {
      await api.delete(`http://localhost:3333/developers/${id}`);
    } catch (error) {
      throw new Error("Erro ao realizar a exclusão do dev");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Lista de Desenvolvedores
        </h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner size="md" />
            <p className="ml-2">Carregando...</p>
          </div>
        ) : (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {devs.map((dev) => (
              <li
                key={dev.id}
                className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                <p className="text-lg font-semibold mb-2">{dev.name}</p>
                <p className="text-gray-600">{dev.email}</p>
                <button
                  className="mt-4 text-red-500 hover:text-red-700 flex items-center focus:outline-none"
                  onClick={() => handleDelete(dev.id)}
                >
                  <FaTrash className="mr-1" /> Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
