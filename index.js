import express from "express";
import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 2080;

const connectDB = async () => {
  const conet = await mongoose.connect(process.env.MONGODB_URI);

  if (conet) {
    console.log("MongoDB connection succeeded");
  }
};

connectDB();

const studentSchema = new Schema({
  name: String,
  mobile: String,
  email: String,
  age: Number,
});

const Student = model("Student", studentSchema);

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json({
    suscess: true,
    data: students,
    massage: "students data fetched successfully",
  });
});

app.post("/student", async (req, res) => {
  const { name, age, email, mobile } = req.body;

  if (!name) {
    return res.json({
      suscess: false,
      massage: "Please enter a name first",
    });
  }

  if (!age) {
    return res.json({
      suscess: false,
      massage: "Please enter your age first",
    });
  }

  if (!email) {
    return res.json({
      suscess: false,
      massage: "Please enter a email first",
    });
  }

  if (!mobile) {
    return res.json({
      suscess: false,
      massage: "Please enter mobile number first",
    });
  }
  const newStudent = new Student({
    name: name,
    age: age,
    mobile: mobile,
    email: email,
  });

  const saveStudent = await newStudent.save();

  res.json({
    suscess: true,
    data: saveStudent,
    massage: "new student added successfully",
  });
});

app.get("/student", async (req, res) => {
  const { email } = req.query;

  const students = await Student.findOne({ email: email });

  res.json({
    suscess: "student fetched successfully",
    data: students,
  });
});

app.listen(PORT, console.log(`server listening on ${PORT}`));
