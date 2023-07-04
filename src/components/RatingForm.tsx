import React, { useState } from "react";
import { useRatingContext } from "./context/GlobalState";
import { useNavigate } from "react-router-dom";

export const RatingForm: React.FC = () => {
    const { addRating} = useRatingContext();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedQuantity = parseInt(quantity);

    if (!isNaN(parsedQuantity)) {
      addRating(name, description, parsedQuantity);
      setName("");
      setDescription("");
      setQuantity("");
      navigate("/ver-tareas");
    }
  };

  // Calcular el promedio y el total de notas
 /*  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce((total, rating) => total + rating.quantity, 0);
  const averageRatings = totalRatings > 0 ? sumRatings / totalRatings : 0;
 */
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg shadow-lg p-6 flex items-center justify-center h-full bg-violet-600">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <label htmlFor="name" className="font-bold">
            Materia:
          </label>
          <textarea
            placeholder="Ingrese un nombre..."
            name="text"
            id="name"
            value={name}  
            onChange={(e) => setName(e.target.value)}
            required
            className="text-black"
          />

          <label htmlFor="description" className="font-bold">
            Descripción:
          </label>
          <textarea
            placeholder="Ingrese una descripcion..."
            name="description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="text-black"
          />

          <label htmlFor="quantity" className="font-bold">
            Punteo:
          </label>
          <input
            placeholder="15"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="text-black"
          />

          <button
            type="submit"
            className="mt-2 bg-white text-black px-20 rounded-md border border-blue-800 
            hover:border-green hover:bg-black hover:text-white"
          >
            Subir
          </button>
        </form>

    
      </div>
    </div>
  );
};
