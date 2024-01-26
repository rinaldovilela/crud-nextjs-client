"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../services/api";

interface Developer {
  id: string;
  name: string;
}

export default function PageOne() {
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [devs, setDevs] = useState<Developer[]>([]);
  const [editingDev, setEditingDev] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

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

  async function handleAddDev() {
    try {
      const newDev: Developer = {
        id: uuidv4(),
        name: textInput,
      };

      await api.post("http://localhost:3333/developers", newDev);
      loadDevs();
      setTextInput("");
    } catch (error) {
      alert("Erro ao cadastrar o dev");
    }
  }

  async function handleEditDev(id: string, newName: string) {
    try {
      const updatedDevs = devs.map((dev) =>
        dev.id === id ? { ...dev, name: newName } : dev
      );
      setDevs(updatedDevs);

      const data = { name: newName };
      await api.put(`http://localhost:3333/developers/${id}`, data);
      setEditingDev(null);
    } catch (error) {
      alert("Erro ao editar o dev");
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (editingDev !== null) {
        handleEditDev(editingDev, editedName);
      } else {
        handleAddDev();
      }
    }
  };

  return (
    <main className="p-6 h-screen">
      <div className="max-w-md p-5 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <h1 className="text-3xl font-bold py-4 m-5">Developers</h1>
        <ul>
          {devs.map((dev) => (
            <li
              key={dev.id}
              className="py-2 flex items-center justify-between border-b border-gray-200"
            >
              {editingDev === dev.id ? (
                <>
                  <input
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring focus:border-green-300"
                    onClick={() => handleEditDev(dev.id, editedName)}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  {dev.name}{" "}
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => {
                      setEditingDev(dev.id);
                      setEditedName(dev.name);
                    }}
                  >
                    Editar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <input
          className="w-full px-4 py-2 my-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite o nome do desenvolvedor"
        />
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddDev}
          >
            Adicionar
          </button>
        </div>
      </div>
      {loading && <p className="text-center mt-4">Carregando...</p>}
    </main>
  );
}
