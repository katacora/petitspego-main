import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'; // Este archivo se generará después de compilar el tailwind.css
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Comprar from './routes/Comprar.jsx';
import {useSelector, useDispatch} from 'react-redux';
import { setFavoriteMovie } from './redux/slices/favoritemovie/favoriteMovieSlice.js';



function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedMovieForPurchase, setSelectedMovieForPurchase] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const[favorites, setFavorites] = useState([]);
  const dispatch=useDispatch();

  const handleCompraClick = (e, movieId) => {
    e.stopPropagation();
    setShowPurchaseForm(true);
    const selectedMovie = movies.find(movie => movie.id === movieId);
    setSelectedMovieForPurchase(selectedMovie);
   
  };

  const handleConfirmPurchase = () => {
    // Aquí puedes manejar la confirmación de la compra, por ejemplo, enviar los datos a un servidor, etc.
    setShowPurchaseForm(false);
  };

  

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = async (selectedMovie) => {
    fetchMovie(selectedMovie.id);
    setMovie(selectedMovie);
    dispatch(setFavoriteMovie(selectedMovie.title))
    window.scrollTo(0, 0);
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
   
    <div>
      <div > 
        <Navbar />   
      </div>
      
     
      
    <div className="mx-auto text-center p-4   ">
    <br/> <br/>
      
      <div className='shadow-2xl'>
        <form className="mb-7 " onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchKey(e.target.value)}
            className="p-2 border rounded"
          />
          <button className="btn btn-primary ml-2 px-4 py-2">Buscar</button>
        </form>

      </div>

      <main className='w-full text-white '>
        {movie ? (
          <div
            className="viewtrailer mx-auto"
            style={{
              backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              backgroundSize: "cover",
            }}
          >
            {playing ? (
              <>
                <div className="flex items-center justify-center h-full">
                  <YouTube 
                    videoId={trailer.key}
                    className="object-cover"
                    containerClassName={"youtube-container amru"}
                  />
                </div>
                <button onClick={() => setPlaying(false)} className="bg-sky-900 hover:bg-slate-200 hover:text-black text-white font-bold py-2 px-4 rounded-full">
                  Cerrar
                </button>
              </>
            ) : (
              <div className="trailer bg-cover">
                <div className="">
                  {trailer ? (
                    <button
                      className="botontrailer"
                      onClick={() => setPlaying(true)}
                      type="button"
                    >
                      Play Trailer
                    </button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  <div className='textoAbajo'>

                  <Link to={`/comprar/${movie.title}`}>
            <button onClick={handleConfirmPurchase} className='bg-green-500/50 px-8 py-2 rounded-lg'>Confirmar compra</button></Link>
                    <h1  className="text-white" >{movie.title}</h1>
                    <p /*className="text-white" */ >{movie.overview}</p>
                  </div>
                  
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>
      <br/><br/><br/><br/>

      <div className='px-8  mx-auto'>
        
        <div /* className="mt-3" */>
          <Slider {...settings}>
            {movies.map((movie) => (
              <div
                key={movie.id}
               /*  className="mb-3" */
                onClick={() => selectMovie(movie)}
              >
                <img
                  src={`${URL_IMAGE + movie.poster_path}`}
                  alt=""
                  className="w-96"
                />
                <h4 className="text-center text-white">{movie.title}</h4>
               
              </div>
            ))}
          </Slider>
          
        </div>

      </div>


      <br/><br/><br/><br/>

      <div className=" mt-3 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-96">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="mb-3 movie-container"
              onClick={() => selectMovie(movie)}
            >
              <img 
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                className="w-80  object-cover mx-auto"
              />
              <h1 className="text-center text-white">{movie.title}</h1>
              <button onClick={(e) => handleCompraClick(e, movie.id)} className="btn-comprar">Comprar</button>
              
            </div>
          ))} 
           
        </div>
       
      </div> 
      {showPurchaseForm && (
        <div className="purchase-form  ">
          <h2>Confirmar compra</h2>
          <div className="movie-info">
            <img src={`${URL_IMAGE + selectedMovieForPurchase.poster_path}`} alt={selectedMovieForPurchase.title} className="movie-poster" />
            <div className="movie-details">
              <h1>{selectedMovieForPurchase.title}</h1>
              <h3>{selectedMovieForPurchase.release_date}</h3>
              <h3>{selectedMovieForPurchase.overview}</h3>
              <br></br>
              <input type='number' className='h-12 w-28  rgba(255, 0, 0, 0.6) text-black ' min={1}/>
              

              {/* Mostrar más información de la película aquí */}
            </div>
          </div>
          <div className="purchase-actions">
            {/* Agrega más campos del formulario aquí */}
            <button onClick={handleConfirmPurchase}className='text-black bg-red-500/50 px-8 py-2 rounded-lg'>Cancelar compra</button>
            <br></br><br></br>
            <Link to={`/comprar/${movie.title}`}>
            <button onClick={handleConfirmPurchase} className='bg-green-500/50 px-8 py-2 rounded-lg'>Confirmar compra</button></Link>
          </div>
        </div>
      )}

      
      <div className='mb-3' ></div>
      
    </div>
      
     {/*  <div><Footer /></div> */}
    </div>


   

    </>
    
    
  );
}

export default App;

