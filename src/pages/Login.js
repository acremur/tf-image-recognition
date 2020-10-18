import React, { useState } from 'react'
import firebase from '../config/firebase';
import { useHistory } from 'react-router-dom'

export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({email: '', password: ''})
  const history = useHistory()

  const handleForm = e => {
    e.preventDefault()
    
    if (isLoading) return
    setIsLoading(true)

    firebase.auth().signInWithEmailAndPassword(form.email, form.password)
    .then(res => {
      history.push('/')
      setError('')
      setIsLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setIsLoading(false)
    })
  }

  const handleInput = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
        <form className="m-5 w-10/12" onSubmit={handleForm}>
          {error !== '' && <p>{error}</p>}
          <h1 className="w-full text-4xl tracking-widest text-center my-6">
            Login
          </h1>
          <div className="w-full my-6">
            <input
              type="email"
              className="p-2 rounded shadow w-full text-black"
              placeholder="Email or Username"
              name='email'
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div className="w-full my-6">
            <input
              type="password"
              className="p-2 rounded shadow w-full text-black"
              placeholder="password"
              name='password'
              value={form.password}
              onChange={handleInput}
            />
          </div>
          <div className="w-full my-10">
            <button
              type="submit"
              className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-600 to-yellow-400 text-black"
            >{isLoading ? (<i className="fas fa-circle-notch fa-spin"></i>) : ('login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}