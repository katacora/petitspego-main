import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Comprar from '../routes/Comprar';



const Navbar = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState('');

 

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <img src='../palomitas.pgn'></img>
       
        <h1 className="text-white text-2xl font-bold flex-grow text-center">Petits Pego</h1>
      </div>
    </nav>
  );
}

export default Navbar;
