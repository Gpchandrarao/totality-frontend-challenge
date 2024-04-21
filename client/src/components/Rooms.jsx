import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/Rooms.css";

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    const url = "https://totality-backend-fumd.onrender.com/rental/get-rental";
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const formatedData = data.rental.map((each) => ({
          id: each._id,
          descriptions: each.descriptions,
          images: each.images,
          prices: each.prices,
          title: each.title,
        }));
        setRoomsData(formatedData);
      }
    } catch (error) {
      console.llog(error);
    }
  };

  return (
    <div>
      <Navbar />

      <ul className="ul-container">
        {roomsData.map((eachRoom) => {
          return (
            <li key={eachRoom.id} className="li-container">
              <img
                src={eachRoom.images}
                alt={eachRoom.title}
                className="rooms-img"
              />
              <div className="room-details">
                <p>
                  <span>Title:</span> {eachRoom.title}
                </p>
                <p>
                  <span>Description: </span>
                  {eachRoom.descriptions}
                </p>
                <p>
                  <span>Price: </span>${eachRoom.prices}/Month
                </p>
              </div>
              <button className="add-cart">Add To Cart</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rooms;
