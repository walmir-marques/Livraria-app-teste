import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [library, setLibrary] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState(0);

  const handleAddLibrary = () => {
    setLibrary([
      ...library,
      { name: name, quantity: quantity, id: Math.floor(Math.random() * 1000) },
    ]);
    setName("");
    setQuantity(0);
  };

  const handleDeleteLibrary = (id) => {
    const newLibrary = library.filter((item) => item.id !== id);
    setLibrary(newLibrary);
  };

  const handleEditLibrary = (id) => {
    const bookToEdit = library.find((item) => item.id === id);
    setEditingId(id);
    setEditName(bookToEdit.name);
    setEditQuantity(bookToEdit.quantity);
  };

  const handleSaveEdit = () => {
    const updatedLibrary = library.map((item) =>
      item.id === editingId
        ? { ...item, name: editName, quantity: editQuantity }
        : item
    );
    setLibrary(updatedLibrary);
    setEditingId(null);
    setEditName("");
    setEditQuantity(0);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do livro"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Digite a quantidade de livros"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddLibrary}>Adicionar</button>
      <br />
      <br />
      <br />
      {library.map((item) => (
        <div key={item.id}>
          {editingId === item.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Salvar</button>
            </>
          ) : (
            <>
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <button onClick={() => handleDeleteLibrary(item.id)}>
                Delete
              </button>
              <button onClick={() => handleEditLibrary(item.id)}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
