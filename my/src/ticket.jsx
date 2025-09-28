import React, { useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backnend=process.env.REACT_APP_URL
function MovieBooking() {
    const location = useLocation();
    const { id } = location.state || {};
    const navig=useNavigate()
    const [movieData, setMovieData] = useState(null);
const location1=useLocation()
const and=localStorage.getItem("token")
   console.log({"token":and})

    const fetchMovieData = async () => {
        if (and && id) {
            try {
                const response = await axios.get(`${backnend}/item/${id}`);
                setMovieData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        }
        else{
            navig("/login")
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, [id]);

    if (!movieData) {
        return <div>Loading...</div>;
    }

    
  
   
    return (
        <div>
           
            <div className="movie-details">
                <h3>{movieData.text}</h3>
                
                <iframe 
    src={movieData.video} 
    allowFullScreen
    width="100%"
    height="500px"
  />

            </div>

            

            
                   
          

           

            
          
        </div>
    );
}

export default MovieBooking;
