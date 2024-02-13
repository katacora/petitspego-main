// favoriteMoviesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteMovies: "", // Inicialmente no hay películas favoritas
};

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    setFavoriteMovie: (state, action) => {
      state.favoriteMovies=(action.payload); // Añadir una película a la lista de favoritos
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(movie => movie !== action.payload); // Eliminar una película de la lista de favoritos
    },
  },
});

export const { setFavoriteMovie, removeFavoriteMovie } = favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;


/* import { setFavoriteMovie } from '../redux/slices/favoritemovie/favoriteMovieSlice';  */