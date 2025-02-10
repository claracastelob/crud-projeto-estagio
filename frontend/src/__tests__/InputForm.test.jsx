import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react"
import InputForm from '../components/InputForm';

test("testing if the create InputForm component is rendering how it should", () => {
    render(<InputForm action="create" onSubmit={() => {}}/> )

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Age")).toBeInTheDocument()
})

test("testing if we can type correctly on the InputForm", () => {
    render(<InputForm action="create" onSubmit={() => {}}/> )

    const inputName = screen.getByPlaceholderText("Name") 
    const inputEmail = screen.getByPlaceholderText("Email") 
    const inputAge = screen.getByPlaceholderText("Age") 

    fireEvent.change(inputName, {target: {value: "Maria"}})
    fireEvent.change(inputEmail, {target: {value: "maria@email.com"}})
    fireEvent.change(inputAge, {target: {value: 20}})

    expect(inputName.value).toBe("Maria")
    expect(inputEmail.value).toBe("maria@email.com")
    expect(inputAge.value).toBe("20")
})