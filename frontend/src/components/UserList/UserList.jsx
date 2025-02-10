import { useEffect, useState } from "react"
import api from "../../services/api"
import styles from "./styles.module.css"


export default function UserList() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api
            .get("/users/")
            .then((response) => {
                setUsers(response.data.users)
            })
            .catch((err) => {
                console.error("Ops! An error occured: " + err)
            })
    }, [])

    return (
        <div className={styles.container}>
            <h2>Users List</h2>
            <div className={styles.userList}>
                {users.map((user) => (
                    <div key={user.id} className={styles.userItem}>
                        <p>Id: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Age: {user.age}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}