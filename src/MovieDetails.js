import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'; 

//MovieDetails component displays the additional details
const MovieDetails = () => {
  const { id } = useParams(); 
  const [movieDetails, setMovieDetails] = useState(null); //store

  // Fetch when the ID changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!id) {
          console.error('Invalid id');
          return;
        }

        const url = `https://imdb8.p.rapidapi.com/title/get-details?tconst=${id}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '15f1d5c376msh5ed860dc64432a3p13d424jsn999cb1318235', //API KEY
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
          },
        };

        console.log('Fetching movie details...');
        const response = await fetch(url, options);

        if (!response.ok) {
          console.error(`Error fetching movie details: ${response.statusText}`);
          return;
        }

        const result = await response.json();
        setMovieDetails(result);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container mt-4 text-center">
      {movieDetails && (
        <div className="card w-50 mx-auto">
          <img src={movieDetails.image.url} className="card-img-top" alt={movieDetails.title} />
          <div className="card-body">
            <h5 className="card-title">{movieDetails.title}</h5>
            <p className="card-text">Year: {movieDetails.year}</p>
            {movieDetails.runningTimeInMinutes && (
              <p className="card-text">Runtime: {movieDetails.runningTimeInMinutes} minutes</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
