import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUser,
  deleteUser,
  exportUsers,
  uploadUsers,
} from "../redux/reducers/user.reducer";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../types";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [file, setFile] = useState(null);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [selectedUserId, setSelectedUserId] = useState<any>(null);
  const { users } = useSelector((state: RootState) => state.users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData((prev) => ({
      ...prev,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      dob: user.dob,
      gender: user.gender,
      email: user.email,
      mobile: user.mobile,
      city: user.city,
      state: user.state,
    }));
  };

  const handleUpdate = async () => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser._id, data: formData }));
      setEditingUser(null);
    }
  };
  const [file, setFile] = useState<File | null>(null);
  const handleDelete = async (id: string) => {
    dispatch(deleteUser({ id }));
  };
  const handleExportUsers = () => {
    dispatch(exportUsers());
  };
  //   const uploadUsers = () => {};
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const openModal = (userId: any) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };
  const handleUpload = () => {
    if (file) {
      dispatch(uploadUsers(file));
      setFile(null);
    }
  };
  return (
    <div className="p-6">
      {/* {loading && <p>Loading...</p>} */}
      <div className="flex justify-end m-5">
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition duration-300"
        >
          Upload Users
        </button>
        <button
          onClick={handleExportUsers}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-300 ml-2"
        >
          Export Users
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="border p-2 rounded-md w-full"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpload();
                  handleCloseModal();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

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
                  onClick={() => openModal(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600">
              Do you really want to delete this user?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedUserId);
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.firstName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="First Name"
              />
              <input
                type="text"
                value={formData.lastName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Last Name"
              />
              <input
                type="text"
                value={formData.role || ""}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Role"
              />
              <input
                type="text"
                value={formData.dob || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Date Of Birth"
              />
              <input
                type="text"
                value={formData.gender || ""}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Gender"
              />
              <input
                type="text"
                value={formData.mobile || ""}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Enter mobile number"
              />
              <input
                type="text"
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Enter City"
              />
              <input
                type="text"
                value={formData.state || ""}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="p-2 border rounded w-full"
                placeholder="Enter State"
              />
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="p-2 border rounded bg-gray-300 w-full"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
