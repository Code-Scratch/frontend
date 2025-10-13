import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Login } from "./Login";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  const handlerButtonPlay = () => {
    navigate("/game");
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0d6efd 0%, #6610f2 100%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "700px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
        }}
      >
        <h1 className="mb-3 fw-bold"> Bienvenido a Code-Scratch</h1>
        <p className="lead mb-4" style={{ lineHeight: "1.6" }}>
          Este es un proyecto de inserción profesional que pone a prueba los
          conocimientos adquiridos durante la carrera de Programación
          Informática.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          {user.email === "" ?
            <Login /> : null}

          {user.email !== "" ? (
            <button
              type="button"
              className="btn btn-success btn-lg px-4"
              onClick={handlerButtonPlay}
            >
              🎮 Jugar
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-light btn-lg px-4"
              disabled
            >
              🎮 Jugar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};