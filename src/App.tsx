import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
]

function App() {
  const [students, setStudents] = useState(data);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [studenteSelezionato, setStudenteSelezionato]=useState(null);
  

  function elimina(el: string) {
    setStudents(students.filter(obj => obj.name != el));
  }

  function aggiungi() {
    if (studenteSelezionato) {
      const aggiornaStudenti = students.map((student) => {
        if (student == studenteSelezionato) {
          return {
            name: name,
            age: parseInt(age),
            gender: gender
          };
        }
        return student;
      });
  
      setStudents(aggiornaStudenti);
      setStudenteSelezionato(null);
    } else {
      students.push({ name: name, age: parseInt(age), gender: gender });
      setStudents(students);
    }
  
    bottone();
  }
  
  function bottone() {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }

  }

  function modifica(student:any) {
    setStudenteSelezionato(student);
    bottone();
  }
  
  
  return (
    <div className="App">
      <center>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
          {students.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.gender}</td>
                <td><button className='btn btn-primary' onClick={() => elimina(val.name)}>ELIMINA</button></td>
                <td><button className='btn btn-primary' onClick={() => modifica(val)}>MODIFICA</button></td>
              </tr>
            )
          })}
        </table>
        <br />
        
          <button className='btn btn-primary' value="inserisci" onClick={() => bottone()}>Inserisci</button>

        {showForm &&
        
        <form>
          <br/>
          <input type="text" name="name" onChange={(e) =>setName(e.target.value)}/>
          <br />
          <br />
          <input type="number" name="age" onChange={(e) =>setAge(e.target.value)}/>
          <br />
          <br />
          <select name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <br />
          <input className='btn btn-primary' type="submit" value="salva" name="salva" onClick={()=> aggiungi()}/>

        </form>
        }
        
      </center>
      
    </div>
  );
}
export default App;