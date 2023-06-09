import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import useDeleteUser from "@/hooks/useDeleteUser";
import useEditUser from "@/hooks/useEditUser";
import Loading from "@/reusecomponents/Loading";

const AllUserPage = () => {
  const { isLoading, data } = useUser();
  const deleteUser = useDeleteUser();
  const editUser = useEditUser();

  const [editingUser, setEditingUser]: any = useState(null);
  const [name, setName]: any = useState("");
  const [email, setEmail]: any = useState("");
  const [role, setRole]: any = useState("");

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };

  const handleEditUser = (
    id: number,
    name: string,
    email: string,
    role: string
  ) => {
    editUser.mutate({ id, name, email, role });
    setEditingUser(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-gray-300  ">
      <table className="table-auto w-full bg-slate-300 ">
        <thead className="border-collapse ">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>EditUser</th>
            <th>DeleteUser</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>

              <td>
                {item?.role !== "administrator" && (
                  <button
                    className="editButton"
                    onClick={() => setEditingUser(item)}
                  >
                    Edit
                  </button>
                )}
              </td>

              <td>
                {item?.role !== "administrator" && (
                  <button
                    className="deleteButton"
                    onClick={() => handleDeleteUser(item.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <>
          <div className="fixed inset-0  bg-black opacity-50 z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 w-96  rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">Edit User</h2>
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    name: { value: string };
                    email: { value: string };
                    role: { value: string };
                  };
                  const name = target.name.value;
                  const email = target.email.value;
                  const role = target.role.value;
                  handleEditUser(editingUser.id, name, email, role);
                }}
              >
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editingUser.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={editingUser.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="block font-medium mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    defaultValue={editingUser?.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="administrator">administrator</option>
                    <option value="manager">manager</option>
                    <option value="member">member</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-800"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400"
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default AllUserPage;
