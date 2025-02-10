import styles from "./styles.module.css"
import api from "../../services/api"
import { useState } from "react";

export default function InputForm({action}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const handleCreate = () => {        api
            .post("/users/", {name, email, age})
            .then((response) => {
                alert("User created successfully")
            })
            .catch ((error) => {
                console.error("Error creating user: ", error.response.data)
                alert("Failed to create user")
            })
    }

    const handleUpdate = () => {
        api
          .put(`/users/${userId}`, { userId, name, age, email })
          .then((response) => {
            alert("User updated successfully");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            alert("Failed to update user");
          })
      };

    const handleDelete = () => {
        api
          .delete(`/users/${userId}`, { userId })
          .then((response) => {
            alert("User deleted from database");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
          })
    };      

    /* Para renderizar o formulário somente quando action == true (quando um dos botoes é clicado) */
    if (!action) return null;

    return (
        <div className={styles.container}>
            {action === "create" && (
                <div className={styles.inputs}>
                    <h2>Create User</h2>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                    <button onClick={handleCreate}>Send</button>
                </div>
            )}

            {action === "update" && (
                <div className={styles.inputs}>
                    <h2>Update User</h2>
                    <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                    <button onClick={handleUpdate}>Send</button>
                </div>
            )}

            {action === "delete" && (
                <div className={styles.inputDelete}>
                    <h2>Delete User</h2>
                    <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                    <button onClick={handleDelete}>Send</button>
                </div>
            )}
        </div>
    )
}