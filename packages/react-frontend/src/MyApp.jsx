import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // on mount, fetch all users
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setCharacters(data.users_list));
  }, []);

  // DELETE user by _id, then update state
  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCharacters((prev) =>
            prev.filter((char) => char._id !== id)
          );
        } else {
          console.error("Delete failed");
        }
      });
  }

  // POST new user, then append to state
  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setCharacters((prev) => [...prev, newUser]);
      });
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
