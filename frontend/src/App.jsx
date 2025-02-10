import { useState } from "react"
import Button from "./components/Button"
import Header from "./components/Header"
import InputForm from "./components/InputForm"
import UserList from "./components/UserList/UserList"

export default function App() {
  const [selectedAction, setSelectAction] = useState(null)
  const [showList, setShowList] = useState(false)

  function handleButtonClick(action) {
    setSelectAction(action)
    setShowList(false)
  }

  const handleGetUsers = () => {
    setShowList(true)
    setSelectAction(null);
  }

  return(
    <div className="app">
      <Header />
      <div className="divider"></div>
      <div className="BtnList">
        <Button text="Create" color="green" onClick={() => handleButtonClick("create")}/>
        <Button text="Read" color="blue" onClick={handleGetUsers}/>
        <Button text="Update" color="orange" onClick={() => handleButtonClick("update")}/>
        <Button text="Delete" color="red" onClick={() => handleButtonClick("delete")}/>
      </div>
      {!showList && selectedAction && <InputForm action={selectedAction} />}
      {showList && <UserList />}
    </div>
  )
}