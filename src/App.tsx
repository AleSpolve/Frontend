import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Table} from 'react-bootstrap';

function App() {
  const [students, setStudents] = useState([{id: 0, name: ''}]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [id, setGender] = useState('');
  const [studenteSelezionato, setStudenteSelezionato]=useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:8080/rest/studenti`)
      .then((response) => response.json())
      .then((actualData) =>{
        setStudents(actualData.records);
      });
  }, []);

  function elimina(el: number) {
    setStudents(students.filter(obj => obj.id != el));
  }

  function aggiungi() {
    if (studenteSelezionato) {
      const aggiornaStudenti = students.length <= 0 ? [] : students.map((student) => {
        if (student == studenteSelezionato) {
          return {
            id: parseInt(id),
            name: name
          };
        }
        return student;
      });
  
      setStudents(aggiornaStudenti);
      setStudenteSelezionato(null);
    } else {
      students.push({id: parseInt(id), name:name});
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
        <Table>
          <thead>
          <tr>
            <th>id</th>
            <th>nome</th>
          </tr>
          </thead>
          <tbody>
          {students && students.length > 0 && students.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td><button className='btn btn-primary' onClick={() => elimina(val.id)}>ELIMINA</button></td>
                <td><button className='btn btn-primary' onClick={() => modifica(val)}>MODIFICA</button></td>
              </tr>
            
            )
            
          })}
          </tbody>
        </Table>
        <br />
        
          <button className='btn btn-primary' value="inserisci" onClick={() => bottone()}>Inserisci</button>

        {showForm &&
        
        <form>
          <br/>
          <input type="text" name="name" onChange={(e) =>setName(e.target.value)}/>
          <br />
          <br />
          <input type="number" name="id" onChange={(e) =>setGender(e.target.value)}/>
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