import { useState } from 'react'
import {ApiResponse} from "./ApiResponseType";
import './App.css'
import { useFetch } from './hooks/useFetch';

function App() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [hide, setHide] = useState(true)


  /** */
  const {persons, loading, error} = useFetch<ApiResponse>({
       url: "https://randomuser.me/api/?results=10"
    })
  
  if(loading){
    return (
      <div className="">Loading</div>
    )
  }
  if(error){

    return <div>erreur test</div>
  }

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
