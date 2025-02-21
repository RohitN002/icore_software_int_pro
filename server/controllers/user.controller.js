import xlsx from "xlsx";
import User from "../models/user.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadUsers = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await User.insertMany(data);
    res.status(200).json({ message: "User data inserted sucessfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.messge });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const exportUsers = async (req, res) => {
  try {
    const users = await User.find();
    const worksheet = await xlsx.utils.json_to_sheet(
      users.map((user) => ({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        dob: user.dob,
        gender: user.gender,
        email: user.email,
        mobile: user.mobile,
        city: user.city,
        state: user.state,
      }))
    );

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Users");
    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
