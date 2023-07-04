import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useRatingContext } from "./context/GlobalState";
import { VictoryPie, VictoryLabel } from "victory";

const RatingSubject: React.FC = () => {
  const { ratings } = useRatingContext();
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  //filtrar las tareas segun su materia
  const filteredRatings = ratings.filter((rating) => rating.name === name);
  const totalRatings = filteredRatings.length;
  const sumRatings = filteredRatings.reduce(
    (total, rating) => total + rating.quantity,
    0
  );
  const minusRatings =
    100 - filteredRatings.reduce((total, rating) => total + rating.quantity, 0);

  const averageRatings = totalRatings > 0 ? sumRatings / totalRatings : 0;

  const handleGoBack = () => {
    navigate("/ver-tareas");
  };

  return (
    <div>
      <div className="flex flex-col  items-center justify-center">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-1 text-center">
            <p className="text-lg font-semibold">
              Número de notas: <span>{totalRatings}</span>
            </p>
            <p className="text-lg font-semibold">
              Promedio pts: <span>{averageRatings}</span>
            </p>
            <p className="text-lg font-semibold">
              Total faltante de punteo: <span>{minusRatings}</span>
            </p>
            <p className="text-lg font-semibold">
              Estado de la nota:{" "}
              <p className="text-xl">
                {sumRatings >= 61 ? (
                  <p>Vas bien! c:</p>
                ) : (
                  <p>Necesitas mejorar :C</p>
                )}
              </p>
            </p>
          </div>
          <VictoryPie
            data={[
              { x: "Total", y: 100 },
              { x: "Actual Pts", y: sumRatings },
            ]}
            animate={{ duration: 200 }}
            labels={({ datum }) => `${datum.y}%`}
            width={300}
            height={300}
            labelComponent={
              <VictoryLabel style={{ fontSize: 20, fill: "white" }} />
            }
          />
        </div>

        <h1 className="font-bold">Tareas de la Materia: {name}</h1>

        <table className="mt-4 w-full border border-collapse rounded">
          <thead>
            <tr>
              <th className="rounded-t border px-4 py-2">ID</th>
              <th className="rounded-t border px-4 py-2">Materia</th>
              <th className="rounded-t border px-4 py-2">Descripción</th>
              <th className="rounded-t border px-4 py-2">Punteo</th>
            </tr>
          </thead>
          <tbody>
            {filteredRatings.map((rating) => (
              <tr key={rating.id}>
                <td className="rounded-t border px-4 py-2 text-center">
                  {rating.id}
                </td>
                <td className="rounded-t border px-4 py-2 text-center">
                  <Link to={`/rating/${rating.id}`}>{rating.name}</Link>
                </td>
                <td className="rounded-t border px-4 py-2">
                  {rating.description}
                </td>
                <td className="rounded-t border px-4 py-2 text-center">
                  {rating.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default RatingSubject;
