/** @jsxImportSource react */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserList from "../components/UserList/UserList";
import api from "../services/api";
import { describe, expect, vi } from "vitest";
import InputForm from "../components/InputForm";

vi.mock("../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("API tests", () => {
  test("Testing the GET method", async () => {
    const dataUsers = {
      data: {
        users: [
          { id: 1, name: "Maria", email: "maria@email.com", age: 20 },
          { id: 2, name: "João", email: "joao@email.com", age: 34 },
        ],
      },
    };
  
    api.get.mockResolvedValue(dataUsers);
  
    render(<UserList />);
  
    await waitFor(() => {
      expect(screen.getByText("Name: Maria")).toBeInTheDocument();
      expect(screen.getByText("Name: João")).toBeInTheDocument();
    });
  
    expect(api.get).toHaveBeenCalledWith("/users/");
  });


  test("Testing the POST method", async () => {
    const data = {
      data: {id: 3, name: "Ana", email: "ana@email.com", age: 23}
    }

    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    api.post.mockResolvedValue(data)
    render(<InputForm action="create"/>)

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: {value: "Ana"}
    })

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {value: "ana@email.com"}
    })

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: {value: "23"}
    })

    fireEvent.click(screen.getByText("Send"))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/users/", {
        name: "Ana",
        email: "ana@email.com",
        age: "23"
      })
    })

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("User created successfully");
    });

    alert.mockRestore();
  })


  test("Testing the PUT method", async() => {
    api.put.mockResolvedValue({
      data: {id: 1, name: "Ana", email: "ana@emailnovo.com", age: 24}
    })

    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<InputForm action="update"/>)

    fireEvent.change(screen.getByPlaceholderText("User ID"), {
      target: {value: "1"}
    })

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: {value: "Ana"}
    })

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: {value: "ana@emailnovo.com"}
    })

    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: {value: "24"}
    })

    fireEvent.click(screen.getByText("Send"))

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith("/users/1", {
        name: "Ana",
        email: "ana@emailnovo.com",
        age: "24",
        userId: "1"
      })
    })

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("User updated successfully");
    });

    alert.mockRestore();
  })


  test("Testing the DELETE method", async() => {
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});
    api.delete.mockResolvedValue({data:{}})

    render(<InputForm action="delete" />);

    const idInput = screen.getByPlaceholderText("User ID");
    fireEvent.change(idInput, { target: { value: "1" } });

    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/users/1", {
        userId: "1"
      });
    });

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("User deleted from database");
    });

    alert.mockRestore();
  })

})

