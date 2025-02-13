import '@testing-library/jest-dom';
import Button from "../components/Button"
import App from "../App"
import { vi, expect } from 'vitest';
import { fireEvent, render, screen } from "@testing-library/react"

test("testing if the buttons are rendering with the right text", () => {
    render(<App />)

    expect(screen.getByText("Create")).toBeInTheDocument()
    expect(screen.getByText("Read")).toBeInTheDocument()
    expect(screen.getByText("Update")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
})

test("testing if the click function works correctly", () => {
    const handleClick = vi.fn()

    render(<Button text="Create" color="green" onClick={handleClick}/>)
    fireEvent.click(screen.getByText("Create"))

    expect(handleClick).toHaveBeenCalledTimes(1)
})