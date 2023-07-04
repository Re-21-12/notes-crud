import React from "react";
import { useRatingContext } from "./context/GlobalState";
import { Link } from "react-router-dom";

export const RatingList: React.FC = () => {
  const { ratings, deleteRating } = useRatingContext();

  //calcula el numero de notas ingresadas
  const totalRatings = ratings.length;
  //calcula la suma
  /** la sintaxis es:
   * const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
   */
  const sumRatings = ratings.reduce(
    (total, rating) => total + rating.quantity,
    0
  );
  //si es mayor que cero el numero de notas inigresadas -> calcular promedio ! -> deja en 0
  const averageRatings = totalRatings > 0 ? sumRatings / totalRatings : 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-center">Punteos ingresados</h1>
      <div className="grid grid-cols-2 gap-4 mt-4 text-center mb-2">
        <div>
          <p className="text-lg font-semibold">Número de notas</p>
          <p className="text-xl">{totalRatings}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Promedio pts</p>
          <p className="text-xl">{averageRatings}</p>
        </div>
        {/** <div>
          <p className="text-lg font-semibold">Suma pts</p>
          <p className="text-xl">{sumRatings}</p>
        </div> */}
      </div>

      {ratings.length > 0 ? (
        <div className="w-full items-center justify-center flex">
          <table className="border border-collapse rounded">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Descripción</th>
                <th>Punteo</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr
                  key={rating.id}
                  className="rounded-lg border border-collapse"
                >
                  <td className="rounded-t border px-4 py-2">
                    <Link to={`/materia/${rating.name}`}>{rating.name}</Link>
                  </td>
                  <td className="rounded-t border px-4 py-2">
                    {rating.description}
                  </td>
                  <td className="rounded-t border px-4 py-2">
                    {rating.quantity}
                  </td>
                  <td className="rounded-t border px-4 py-2">
                    {rating.date.toString().substring(0, 10)}
                  </td>
                  <td className="rounded-t border px-4 py-2">
                    <button className="bg-white text-black py-2 px-5 rounded-md border border-blue-800 hover:border-green hover:bg-black hover:text-white">
                      <Link to={`/rating/${rating.id}`}>Ver/Editar</Link>
                    </button>
                    <button
                      className="bg-red-50 text-black py-2 px-4 rounded-md m-auto border border-red-700 hover:border-yellow-500 hover:bg-black hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        const accept = window.confirm(
                          "Deseas eliminar esta tarea?"
                        );
                        if (accept) deleteRating(rating.id);
                      }}
                    >
                      Eliminar tarea
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No ha ingresado ninguna nota!</p>
      )}
    </div>
  );
};

export default RatingList;
