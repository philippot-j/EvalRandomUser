import axios from 'axios';
import { useState } from 'react'
import { useEffect} from "react";

type UseFetchProps<T> = {
    url: string
}
export const useFetch = <T>({url} : UseFetchProps) =>{

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    // const [hide, setHide] = useState<string | undefined>(undefined)
    // const [results, setResults] = useState<T | undefined>(undefined)

    //const [error, setError] = useState()

    

    useEffect(() => {
        const fetchData = async() =>{
            setLoading(true)
            try{
                
                // const response = await axios.get<T>(url);
                // if(response.status === 200){
                //     setTimeout(() => {
                //      SpeechRecognitionResultList()
                //     })
                // }

                const response = await axios.get(url);
                const personsData = response.data.results;  
                console.log("personsData: ", personsData);
                setPersons( personsData );
                console.log("persons: ", persons);
                }catch(error){
                console.error("erreur de recup donnnées", error);
                } finally {
                setLoading(false)
                }
            
            }
        fetchData();
    
        }, []
    );

return {persons, loading, error}

}


