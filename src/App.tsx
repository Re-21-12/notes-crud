import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RatingForm } from "./components/RatingForm";
import { RatingContextProvider } from "./components/context/GlobalState";
import { RatingList } from "./components/RatingList";
import Navbar from "./components/Navbar";
import ModifyRating from "./components/ModifyRating";
import RatingSubject from "./components/RatingSubject";

function App() {
  return (
    <Router>
      <RatingContextProvider>
        <div className=" bg-black text-white h-screen w-full">
          <Navbar />
          <hr className="my-4 " />
          <div className="bg-black">
            <Routes>
              <Route path="/agregar-tarea" element={<RatingForm />} />
              <Route path="/rating/:id" element={<ModifyRating />} />
              <Route path="/ver-tareas" element={<RatingList />} />
              <Route path="/materia/:name" element={<RatingSubject />} />
            </Routes>
          </div>
        </div>
      </RatingContextProvider>
    </Router>
  );
}

export default App;
