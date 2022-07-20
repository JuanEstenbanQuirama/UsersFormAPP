import React, { useEffect, useState } from 'react';
import axios from 'axios'

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

    const [first_name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(()=>{
        if(userSelected !== null){
            setName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
        } 
    },[userSelected ])

    const submit = e => {
        e.preventDefault();
        const user = 
            {
                email: email,
                password: password,
                first_name: first_name,
                last_name: last_name,
                birthday: birthday
            }
            if(userSelected !== null){
                axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
                    .then(()=>{
                        getUsers()
                        reset()
                        deselectUser()
                    })
                    .catch(error => console.log(error.response))
            } else {
                axios.post('https://users-crud1.herokuapp.com/users/', user)
                    .then(()=>{
                        getUsers()
                        reset()
                    })
                    .catch(error => console.log(error.response))
            }
    }

    const reset = () => {
        setName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setBirthday("")
    }

    const clear = () => {
        reset()
        deselectUser()
    }
    return (
        <form onSubmit={submit} className='container-form'>
            <h1>Create, delete, edit user</h1>
            <div className="input-container">
                <label htmlFor="name"> <b>First name</b></label>
                <input
                    type="text"
                    id='name'
                    onChange={e => setName(e.target.value)}
                    value={first_name}
                />
            </div >
            <div className="input-container">
                <label htmlFor="lastname"><b>Last name</b></label>
                <input
                    type="text"
                    id='lastname'
                    onChange={e => setLastName(e.target.value)}
                    value={last_name}
                />
            </div>
            <div className="input-container">
                <label htmlFor="email"><b>Email</b></label>
                <input
                    type="text"
                    id='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className="input-container">
                <label htmlFor="Password"><b>Password</b></label>
                <input
                    type="password"
                    id='Password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className="input-container">
                <label htmlFor="birthday"><b>Birthday</b></label>
                <input
                    type="date"
                    id='birthday'
                    onChange={e => setBirthday(e.target.value)}
                    value={birthday}
                />
            </div>
            <button>submit</button>
            <button type='button' onClick={clear}>clear</button>
        </form>
    );
};

export default UsersForm;