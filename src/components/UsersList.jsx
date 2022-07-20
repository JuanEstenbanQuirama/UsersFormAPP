import React from 'react';

const UsersList = ({users, selectUser, deleteUser}) => {
    return (
        <ul className='container-list'>
            
            {
                users.map(user => (
                    <li key={user.id} className='list'>
                        <div> <b>Name: </b> {user.first_name} {user.last_name}</div>
                        <div> <b>Email: </b>{user.email}</div>
                        <div><b>Password: </b>{user.password}</div>
                        <div><b>birthday: </b>{user.birthday}</div> 
                        <button onClick={()=>selectUser(user)}>Edit</button>
                        <button onClick={()=>deleteUser(user.id)}>Delete</button>
                        
                    </li>
                    
                    ))
                }
        </ul>
    );
};

export default UsersList;