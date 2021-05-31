import React, {useContext} from 'react';
import {SocketContext} from '../Context'

const Signup = () => {
    const {handleSignup, inputs, setInputs, error} = useContext(SocketContext);
    const handleSubmit = (e) =>{
        e.preventDefault()
        handleSignup()
    }
    const handleChange = e =>{
        const {name, value} = e.target
        setInputs(prev=>({...prev, [name]:value}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="email" placeholder='email' value={inputs.email}/>
            <input onChange={handleChange} name="password" placeholder="password" value={inputs.password}/>
            <button>signin</button>
            {error.length>0 ? error.map(errors=> <p style={{color:'red'}}>{errors}</p>): null}
        </form>
    )
}

export default Signup
