import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [book,setBook] = useState({
        title: "",
        description:"",
        cover: "",
    });

    const navigate = useNavigate()

    const handleInput = (e)=>{
        setBook(prev=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/books",book);
            navigate("/books")
        }
        catch(err){
            console.log(err);
        }
    }

    console.log(book)
  return (
    <div className='form'>
      <h2>Add new book</h2>
      <input type="text" placeholder='Title'  onChange={handleInput} name='title' />
      <input type="text" placeholder='Description' onChange={handleInput} name='description'/>
      <input type="text" placeholder='Cover' onChange={handleInput} name='cover'/>

      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
