import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRatingContext } from "./context/GlobalState";

const ModifyRating: React.FC = () => {
  const { id } = useParams<{ id: string | any }>();
  const { ratings, deleteRating, modifyRating } = useRatingContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const rating = ratings.find((rating) => rating.id === parseInt(id));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    modifyRating(id, name, description, quantity);
    setEditing(false); // Aquí se establece el estado de edición en falso después de guardar los cambios
    navigate("/ver-tareas");
  };

  const handleEdit = () => {
    setEditing(true);
    setName(rating?.name || "");
    setDescription(rating?.description || "");
    setQuantity(rating?.quantity || 0);
  };

  const handleDelete = () => {
    //operador de acceso seguro ? si no encuentra el objeto rating retorna el 0
    deleteRating(rating?.id || 0);
    navigate("/ver-tareas");
  };

  if (!rating) {
    return <p>Tarea no encontrada</p>;
  }
  //filtrar tareas por materia
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold">Detalles de la Tarea:</h1>
      {editing ? (
        <div className="rounded-lg   bg-emerald-600  p-6 flex items-center justify-center h-full">
          <form onSubmit={handleSubmit} className=" grid gap-4">
            <p className="flex items-center justify-center">
              <span className="font-bold">ID:</span> <span>{rating.id}</span>
            </p>
            <label htmlFor="name" className="font-bold ">
              Materia:
            </label>
            <textarea
              name="name"
              placeholder="Ingrese un nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black px-4"
            />
            <label htmlFor="description" className="font-bold">
              Descripción:
            </label>
            <textarea
              placeholder="Ingrese una descripción..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-black px-4"
            ></textarea>
            <label htmlFor="quantity" className="font-bold">
              Punteo:
            </label>
            <input
              className="text-black px-2"
              placeholder="15"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              type="submit" // Agregamos el tipo de botón para que sea un botón de envío
              className="mt-1 bg-yellow-400 text-black px-16 rounded border border-yellow-600 hover:border-green-500 hover:bg-white hover:text-black"
            >
              Guardar
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center h-full">
            <ul>
              <li>
                <span className="font-bold">ID:</span> {rating.id}
              </li>
              <li>
                <span className="font-bold">Materia: </span> {rating.name}
              </li>
              <li>
                <span className="font-bold">Descripción: </span>
                {rating.description}
              </li>
              <li>
                <span className="font-bold">Punteo:</span> {rating.quantity}
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleEdit}
              className="mt-2 bg-white text-black py-0 px-10 rounded-md border border-blue-800 hover:border-green hover:bg-black hover:text-white"
            >
              Editar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const accept = window.confirm("Deseas eliminar esta tarea?");
                if (accept) handleDelete();
              }}
              className="mt-2 bg-white text-black py-0 px-10 rounded-md border border-red-700 hover:border-green hover:bg-black hover:text-white"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyRating;
