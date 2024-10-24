import axios from "axios";
import React, { useEffect, useState } from "react";
import Oneuser from "./Oneuser";

const Liste = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    console.log("fierd");
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/getAll`
      );
      console.log(response.data.users);

      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div style={{ width: "70%", marginLeft: "auto", marginRight: "auto" , marginTop:"100px" }}>
      Nombre de participants : {users.length}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Premon</th>
            <th scope="col">Email</th>
            <th scope="col">Telephone</th>
            <th scope="col">Profission</th>
            <th scope="col">Activite</th>
            <th scope="col">Socite</th>
            <th scope="col">Validé</th>
          </tr>
        </thead>
        <tbody>
       {
        users.map((user, index) => (
          <Oneuser key={index} user={user}  fetchUsers={fetchUsers}/>
        ))
       }
          
        </tbody>
      </table>
    </div>
  );
};

export default Liste;
