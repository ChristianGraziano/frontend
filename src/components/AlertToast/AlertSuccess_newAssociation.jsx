import React from "react";
import { toast } from "react-toastify";

const AlertSuccess_newAssociation = () => {
  toast.success(
    "Registrazione Effettuata con Successo! Ritorna alla Homepage ed Effettua il Login.",
    {
      position: "top-right", // Posizione del toast
      autoClose: 3000, // Durata in millisecondi
      hideProgressBar: false, // Mostra la barra di avanzamento
      closeOnClick: true, // Chiudi il toast al click
      pauseOnHover: true, // Metti in pausa al passaggio del mouse
      draggable: true, // Spostabile
    }
  );
};

export default AlertSuccess_newAssociation;
