import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../redux/reducers/user.reducer";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../types";

interface Props {
  token: string;
}

const UserTable: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ first_name: user.first_name, email: user.email });
  };

  const handleUpdate = async () => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser._id, data: formData, token }));
      setEditingUser(null);
    }
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteUser({ id }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {loading && <p>Loading...</p>}

      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">First Name</th>
            <th className="p-3 text-left">Last Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Dob</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">City</th>
            <th className="p-3 text-left">State</th>

            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id} className="border-b">
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.lastName}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.dob}</td>
              <td className="p-3">{user.gender}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.mobile}</td>
              <td className="p-3">{user.city}</td>
              <td className="p-3">{user.state}</td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Edit User</h3>
          <input
            type="text"
            value={formData.first_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            className="p-2 border rounded w-full mb-2"
            placeholder="First Name"
          />
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="p-2 border rounded w-full mb-2"
            placeholder="Email"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
