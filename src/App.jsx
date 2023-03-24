import axios from "axios";
import { useEffect, useState } from "react";

const STUDENTS_API_URL = "https://api-aluno.vercel.app/aluno";

function App() {
  const [students, setStudents] = useState([]);
  const [theme, setTheme] = useState("light");
  const [id, setId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentRegistration, setNewStudentRegistration] = useState("");
  const [newStudentCourse, setNewStudentCourse] = useState("");
  const [newStudentPeriod, setNewStudentPeriod] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await axios.get(STUDENTS_API_URL);
      setStudents(response.data);
    } catch (error) {
      alert("Não foi possível fazer a consulta");
    }
  }

  async function createStudent(event) {
    event.preventDefault();
    try {
      await axios.post(STUDENTS_API_URL, {
        nome: newStudentName,
        matricula: newStudentRegistration,
        curso: newStudentCourse,
        bimestre: newStudentPeriod,
      });
      clearForm();
      fetchStudents();
    } catch (error) {
      alert("Não foi possível criar o aluno");
    }
  }

  async function updateStudent() {
    event.preventDefault();
    try {
      await axios.put(`https://api-aluno.vercel.app/aluno/${id}`, {
        nome: newStudentName,
        matricula: newStudentRegistration,
        curso: newStudentCourse,
        bimestre: newStudentPeriod,
      });
      clearForm();
      fetchStudents();
    } catch (error) {
      alert("Não foi possível atualizar o aluno");
    }
  }

  async function deleteStudent(id) {
    event.preventDefault();
    alert("Aluno deletado com sucesso")
    try {
      await axios.delete(`https://api-aluno.vercel.app/aluno/${id}`);
      fetchStudents();
    } catch (error) {
      alert("Não foi possível deletar o aluno");
    }
  }

  function fillForm(student) {
    setId(student._id);
    setNewStudentName(student.nome);
    setNewStudentRegistration(student.matricula);
    setNewStudentCourse(student.curso);
    setNewStudentPeriod(student.bimestre);
  }

  function clearForm() {
    setId("");
    setNewStudentName("");
    setNewStudentRegistration("");
    setNewStudentCourse("");
    setNewStudentPeriod("");
  }

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
      document.body.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.body.setAttribute("data-theme", "light");
    }
  }

  return (
    <div>
      <div className="button-container">
        <button
          onClick={toggleTheme}
          className={`theme-button ${theme === "light" ? "light" : "dark"}`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
      <h1>Alunos do Evertinho</h1>
      <form onSubmit={id ? updateStudent : createStudent}>
        <input
          type="text"
          placeholder="Nome"
          value={newStudentName}
          onChange={(event) => setNewStudentName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Matricula"
          value={newStudentRegistration}
          onChange={(event) => setNewStudentRegistration(event.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          value={newStudentCourse}
          onChange={(event) => setNewStudentCourse(event.target.value)}
        />
        <input
          type="text"
          placeholder="Bimestre"
          value={newStudentPeriod}
          onChange={(event) => setNewStudentPeriod(event.target.value)}
        />
        <input type="submit" value={id ? "Editar" : "Criar"} />
      </form>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <h3>{student.nome}</h3>
            <p>Curso: {student.curso}</p>
            <p>id: {student._id}</p>
            <button onClick={() => fillForm(student)}>Editar</button>
            <button onClick={() => deleteStudent(student._id)}>Apagar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
