import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

//definir children?
interface RatingContextProviderProps {
  children: ReactNode;
}

// Definir tipos
interface Rating {
  id: number;
  quantity: number;
  name: string;
  description: string | null;
  date: Date | string;
}
//le damos la estructura a lo que se va a compartir en el context
//se da la estructura de las funcionees y del estado
interface   RatingState {
  ratings: Rating[];
  addRating: (name: string, description: string, quantity: number) => void;
  deleteRating: (id: number) => void;
  modifyRating: (
    id: number,
    name: string,
    description: string,
    quantity: number
  ) => void;
}

// Crear el contexto
//usando genericos declara un nuevo objeto con el tipo RatingState con su estructura o undefinied
const RatingContext = createContext<RatingState | undefined>(undefined);

// Crear el proveedor del contexto
const RatingContextProvider:React.FC<RatingContextProviderProps>  = ({ children }) => {
  //se declara el estado va a empezar con un arreglo vacio- > lo cual es un un arreglo de objetos
  //Ejemplo: const ratings =  [{id: 0, quantity: 200, name: "victor", description: "string", date:Date},{id: 0, quantity: 200, name: "victor", description: "string", date:Date},]
  const [ratings, setRatings] = useState<Rating[]>([]);

  const addRating = (name: string, description: string, quantity: number) => {
    //declarando una instancia del objeto nuevo con parametros seria agregando un rating
    const newRating: Rating = {
      //aca no se usa lo de abajo princicpalmente por que queremos agregarle el numero segun el tamanio del arreglo actual
      id: ratings.length,
      name, //esta sintaxis hace referencia al mismo atributo de modo que name:name = name
      description,
      quantity,
      //guaurdara la materia de la tarea que nos servira para distribuir los punteos
      //para agregar una fecha en la que se subio
      date: new Date(),
    };
    //usando el spread operator ...
    // crea un nuevo arreglo con la copia del arreglo de objeto de ratings y le agrega newRating
    const updatedRatings = [...ratings, newRating];
    //actualiza ratings usando el set
    setRatings(updatedRatings);
    //actualiza el localStorage
    //subir los datos al local storage
    //recibe un key del elemento por ejemplo el div="key" puede ser un id?

    localStorage.setItem("ratings", JSON.stringify(updatedRatings));

    //    localStorage.setItem("ratings", JSON.stringify(savelocalStorageRatings));
  };

  const deleteRating = (id: number) => {
    const newRatings = ratings.filter((rating) => rating.id !== id);
    //actualiza el estado
    setRatings(newRatings);
    //recibe un key del elemento por ejemplo el div="key" puede ser un id? -> es un id
    //recibe dos argumentos, la clave: el valor
    //bajo esto lo guarda en el local storage
    //stringify sirve para convertir de objeto a string
    localStorage.setItem("ratings", JSON.stringify(newRatings));
  };
  //modificar un punteo
  //recibe id -> saber cual es, a modificar{nombre,descripcion,punteo}

  const modifyRating = (
    id: number,
    name: string,
    description: string,
    quantity: number    
  ) => {
    const updatedRatings = ratings.map((rating) => {
      //Si encuentra un id que haga match con el que se le pasa
      if (rating.id == id) {
        //->
        //si coinicide usa ese objeto -> conserva y modifica
        return {
          //copia el punteo o el objeto punteo que tiene, y remplaza con los nuevos datos
          ...rating,
          name,
          description,
          quantity,
          // Puedes actualizar la fecha aquí si es necesario
        };
      }
      //retorna el nuevo objeto
      return rating;
    });
    //actualiza el arreglo  con el objeto nuevo
    setRatings(updatedRatings);
    //actualiza el localStorage
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  const ratingState: RatingState = {
    ratings,
    addRating,
    deleteRating,
    modifyRating,
  };  

  useEffect(() => {
    //el codigo que va a ejecutar
    const savedRatingsLocalStorage = localStorage.getItem("ratings");
    if (savedRatingsLocalStorage) {
      setRatings(JSON.parse(savedRatingsLocalStorage));
    }
    //el arreglo vacio significa que se cargara solo cuando se cargue la pagina por primera vez
  }, []);

  //carga el arreglo con la clave ratings del objeto matriz, luego lo convierte a cadena y por ultimo si existe un cambio vuelve a guardar en el local storage

  //retorna el value -> a los componentes debajo en este caso va a retornarles el ratingState y lo quue contenga
  return (
    <RatingContext.Provider value={ratingState}>
      {children}
    </RatingContext.Provider>
  );
};

// Custom hook para acceder al contexto
const useRatingContext = () => {
  //proporciona lo que contiene RatingContext
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error(
      "useRatingContext debe ser utilizado dentro de RatingContextProvider"
    );
  }
  return context;
};

export { RatingContextProvider, useRatingContext };
