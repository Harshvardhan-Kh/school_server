import express from "express";

const app = express();
app.use(express.json());

const students = [];

app.get("/students", (req, res) => {
  if (students.length === 0) {
    return res.json({
      status: false,
      massage: "No single student found in the list",
    });
  }

  res.json({
    suscess: true,
    data: students,
    massage: "students data fetched successfully",
  });
});

app.post("/student", (req, res) => {
  const { name, age, email, mobile } = req.body;
  const id = Math.floor(Math.random() * 10 + 1);

  const newStudent = {
    id,
    name,
    age,
    email,
    mobile,
  };

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

  res.json({
    suscess: true,
    data: newStudent,
    massage: "new student added successfully",
  });
  students.push(newStudent);
});

app.get("/student", (req, res) => {
  const { id } = req.query;

  let student = null;

  students.forEach((stud) => {
    if (stud.id == id) {
      student = stud;
    }
  });

  if (student == null) {
    return res.json({
      suscess: false,
      massage: "student no longer exists",
    });
  }
  res.json({
    suscess: "student added successfully",
    data: student,
  });
});

const PORT = 5000;
app.listen(PORT, console.log(`server listening on ${PORT}`));
