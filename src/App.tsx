import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect} from "react";
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [persons, setPersons] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchData = async() =>{
      try{
        console.log("useEffect loading list");
        const response = await axios.get("https://randomuser.me/api/?results=10");
        const personsData = response.data.results;  
        console.log("personsData: ", personsData);
        setPersons( personsData );
        console.log("persons: ", persons);
        }catch(error){
          console.error("erreur de recup donnnées", error);
        }
      
      }
      fetchData();
 
      }, []
  );

  const handleUserDetails = (id) => {
    setSelectedPerson(id);
  };

  const hideUserDetails = () => {
    setSelectedPerson(null);
  };

  return (
    <>
      <div>
 
        <div className="rightContainer">
            <span>List of users</span>
            {
              !persons.length ? (
                <span>No users yet ! 🎉</span>
                
              ) : (
                <ul>
                  {persons.map(person =>(
                    <li key={person.login.uuid}>
                      <img src={person.picture.thumbnail} />
                      <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
                      <div>Email: {person.email}</div>
                      <button onClick={() => handleUserDetails(person.login.uuid)}>Details</button>

                      {selectedPerson === person.login.uuid && (
                        <div>
                          <div>Adress: {person.location.street.number} {person.location.street.name}, {person.location.country}</div>
                          <div>Phone: {person.phone}</div>
                          <button onClick={() => hideUserDetails()}>Hide</button>
                          
                        </div>
                      )}

                    </li>
                  ))}
                </ul>
              )
            }
          </div>

          

      </div>

      
    </>
  )
}

export default App
