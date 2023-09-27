import './App.css';
import React, { useState } from 'react'
import { API } from 'aws-amplify';

const myAPI = 'api811ea49e'
const path = '/users'; 

const App = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])

  //Function to fetch from our backend and update customers array
  function getUser(e) {
    let userId = e.input
    API.get(myAPI, path + '/' + userId)
       .then(response => {
         console.log(response)
         let newUsers = [...users]
         newUsers.push(response)
         setUsers(users)

       })
       .catch(error => {
         console.log(error)
       })
  }

  return (
    
    <div className='App'>
      <h1>Super Simple React App</h1>
      <div>
          <input placeholder='user id' type='text' value={input} onChange={(e) => setInput(e.target.value)}/>      
      </div>
      <br/>
      <button onClick={() => getUser({input})}>Get User From Backend</button>

      <h2 style={{visibility: users.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
      {
        users.map((thisUser) => {
         return (
        <div key={thisUser.userId}>
          <span><b>UserId:</b> {thisUser.userId} - <b>UserName</b>: {thisUser.username}</span>
        </div>)
       })
      }
    </div>
  )
}

export default App;