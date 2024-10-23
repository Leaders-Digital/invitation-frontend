import axios from "axios";
import React from "react";

const Oneuser = ({ user , fetchUsers }) => {
    
  const handleValid = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/valideInvitation`,
        { id: user._id, email: user.email }
      );
      fetchUsers()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td scope="col">{user?.firstName}</td>
      <td scope="col">{user?.lastName}</td>
      <td scope="col">{user?.email}</td>
      <td scope="col">{user?.telephone}</td>
      <td scope="col">{user?.profession}</td>
      <td scope="col">{user?.activite}</td>
      <td scope="col">{user?.society}</td>
      <td scope="col">
        {user?.valide ? (
          <button  style={{ border: "none" }}>
            deja Validé
          </button>
        ) : (
          <button
            onClick={handleValid}
            style={{ border: "none" }}
            className="submit"
          >
            Validé
          </button>
        )}
      </td>
    </tr>
  );
};

export default Oneuser;
