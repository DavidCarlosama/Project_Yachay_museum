import Head from "next/head";
import Navbar from "../components/navbar";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReservationForm = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleDateChange = (value) => {
    setDate(value);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al backend para manejar la reserva
    console.log("Fecha seleccionada:", date);
    console.log("Hora seleccionada:", selectedTimeSlot);
    console.log("Nombre:", name);
    console.log("Correo electrónico:", email);
    console.log("Teléfono:", phone);
    setShowDialog(true);
  };

  // Definir los time slots disponibles (de 10 am a 5 pm en intervalos de 30 minutos)
  const availableTimeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  return (
    <>
      <Head>
        <title>Yachay Archaeological Museum</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
            style={{ width: '25%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            style={{ width: '25%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Cellphone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-control"
            style={{ width: '25%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Pick a date:</label>
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Pick the hour for your visit:</label>
          <div className="time-slots-container">
            {availableTimeSlots.map((timeSlot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSlotSelect(timeSlot)}
                className={selectedTimeSlot === timeSlot ? 'selected-time-slot' : 'time-slot'}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reservar
        </button>
      </form>

      {showDialog && (
        <div className="dialog">
          <p>Cita programada</p>
          <button onClick={() => setShowDialog(false)}>Cerrar</button>
        </div>
      )}

      <style jsx>{`
        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .form-control {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .time-slots-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        
        .time-slot, .selected-time-slot {
          background-color: white;
          color: #333;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .selected-time-slot {
          background-color: #007bff;
          color: white;
          border-color: #007bff;
        }
      `}</style>
    </>
  );
};

export default ReservationForm;
