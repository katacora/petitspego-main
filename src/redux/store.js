import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from "./slices/counter/counterSlice";
import favoriteMoviesReducer from './slices/favoritemovie/favoriteMovieSlice';


export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
    favoriteMovies: favoriteMoviesReducer,
    

  },
})