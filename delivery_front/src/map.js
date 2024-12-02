import axios from "axios"; // Importa Axios
import L from "leaflet"; // Importa Leaflet
import { Button } from "primereact/button";
import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import Modal from "react-modal";
import ModalSencillo from "../../componentes/modal/modalSencillo";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Crea un ícono personalizado
const arrowIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente para centrar el mapa al cambiar la posición
const CenterMap = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

// Maneja clics en el mapa
const MapClickHandler = ({ setDirecciones }) => {
  useMapEvent("click", async (event) => {
    const { lat, lng } = event.latlng;
    const direccion = await obtenerDireccion(lat, lng);
    setDirecciones((prevDirecciones) => {
      const updatedDirecciones = [...prevDirecciones];
      updatedDirecciones[0] = {
        ...updatedDirecciones[0],
        latitud: lat.toFixed(4).toString(),
        longitud: lng.toFixed(4).toString(),
        direccion: direccion || "",
      };
      return updatedDirecciones;
    });
  });

  return null;
};

const obtenerDireccion = async (lat, lng) => {
  try {
    const response = await axios.get(
      https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json
    );
    return response.data.display_name;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return null;
  }
};

const GestionUbicacion = ({
  direcciones,
  setDirecciones,
  isModalOpen,
  setIsModalOpen,
}) => {
  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude } = coords;
          const direccion = await obtenerDireccion(latitude, longitude);
          setDirecciones([
            {
              direccion: direccion || "",
              latitud: latitude.toFixed(4).toString(),
              longitud: longitude.toFixed(4).toString(),
            },
          ]);
        },
        (error) => {
          console.error("Error obteniendo la ubicación", error);
          alert(
            "No se pudo obtener la ubicación. Por favor, permite el acceso a la ubicación."
          );
        }
      );
    } else {
      alert("Geolocalización no está soportada por este navegador.");
    }
  };

  const handleModalOpen = () => {
    requestGeolocation();
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        label="Seleccionar ubicación"
        onClick={handleModalOpen}
        className="btn btn-block btn-warning btn-lg"
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Seleccionar Ubicación"
      >
        <MapContainer
          center={{
            lat: parseFloat(direcciones[0]?.latitud) || 14.1,
            lng: parseFloat(direcciones[0]?.longitud) || -87.21,
          }}
          zoom={15}
          style={{ height: "350px", width: "90%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CenterMap
            center={{
              lat: parseFloat(direcciones[0]?.latitud) || 14.1,
              lng: parseFloat(direcciones[0]?.longitud) || -87.21,
            }}
          />
          <Marker
            position={{
              lat: parseFloat(direcciones[0]?.latitud) || 14.1,
              lng: parseFloat(direcciones[0]?.longitud) || -87.21,
            }}
            icon={arrowIcon}
          >
            <Popup>
              <div className="marker-popup content">
                <p>Latitud: {direcciones[0]?.latitud || "No disponible"}</p>
                <p>Longitud: {direcciones[0]?.longitud || "No disponible"}</p>
                <p>Dirección: {direcciones[0]?.direccion || "No disponible"}</p>
                <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
              </div>
            </Popup>
          </Marker>
          <MapClickHandler setDirecciones={setDirecciones} />
        </MapContainer>
        <Button
          label="Cerrar"
          onClick={() => setIsModalOpen(false)}
          className="p-button-danger mt-2"
        />
        <Button
          label="Actualizar Ubicación del Dispositivo"
          onClick={requestGeolocation}
          className="p-button-success mt-2"
        />
      </Modal>
      <ModalSencillo
        nombreBoton="Seleccionar Ubicacion"
        size="modal-xl"
        titulo="Ejemplo de Modal"
      >
        <MapContainer
          center={{
            lat: parseFloat(direcciones[0]?.latitud) || 14.1,
            lng: parseFloat(direcciones[0]?.longitud) || -87.21,
          }}
          zoom={15}
          style={{ height: "450px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CenterMap
            center={{
              lat: parseFloat(direcciones[0]?.latitud) || 14.1,
              lng: parseFloat(direcciones[0]?.longitud) || -87.21,
            }}
          />
          <Marker
            position={{
              lat: parseFloat(direcciones[0]?.latitud) || 14.1,
              lng: parseFloat(direcciones[0]?.longitud) || -87.21,
            }}
            icon={arrowIcon}
          >
            <Popup>
              <div className="marker-popup content">
                <p>Latitud: {direcciones[0]?.latitud || "No disponible"}</p>
                <p>Longitud: {direcciones[0]?.longitud || "No disponible"}</p>
                <p>Dirección: {direcciones[0]?.direccion || "No disponible"}</p>
              </div>
            </Popup>
          </Marker>
          <MapClickHandler setDirecciones={setDirecciones} />
        </MapContainer>
        <Button
          type="button"
          label="Actualizar Ubicación del Dispositivo"
          onClick={requestGeolocation}
          className="p-button-success mt-2"
        />
      </ModalSencillo>
    </>
  );
};

export default GestionUbicacion;