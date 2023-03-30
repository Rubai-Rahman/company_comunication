import axiosInstance from "@/utils/hasuraSetup";
import { useState } from "react";
import { useMutation } from "react-query";
//import { useCreateUser } from "@/hooks/useCreateUser";
interface User {
  name: string;
  email: string;
  role: string;
}
const MUTATION_QUERY = `
  mutation AddUser($user: users_insert_input!) {
    insert_users_one(object: $user) {
      id,role,email
    }
  }
`;

const addUser = async ({ user }: { user: User }) => {
  const { data } = await axiosInstance.post("", {
    query: MUTATION_QUERY,
    variables: { user },
  });
  return data;
 
};

const CreateUserPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    role: "member",
  });
  const { mutate, isLoading,data } = useMutation(addUser, {
    onSuccess: () => {""
      console.log("success Data",data);
      setUser({ email: "", name: "", role: "" });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
    await mutate({ user });
  };
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block font-bold mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="administrator">administrator</option>
            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating User..." : "Create User"}
        </button>
      </form>
    </div>
  );
};
export default CreateUserPage;