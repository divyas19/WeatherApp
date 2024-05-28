import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6)
            alert("Password length must be more than 6");
        try {
            await signUp(email, password);
            alert('Register successful')
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <div className='h-screen overflow-y-scroll overflow-x-hidden bg-slate-100  flex justify-center items-center '>
            <form onSubmit={handleSubmit} className="  w-[400px] h-[600px] bg-white rounded-md shadow-2xl hover:shadow-lg border-2  border-red-400  flex flex-col justify-center items-center gap-10  ">
                <h1 className='font-bold text-4xl'>Register</h1>
                <div className="flex flex-col justify-end gap-10">
                    <div className="flex flex-col gap-4">
                        <label className="text-xl text-left ">Enter Email : </label>
                        <input className=" border-black border-2 rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className=" text-xl ">Enter Password : </label>
                        <input className=" border-black border-2 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                </div>
                <button type="submit" className='btn'>Register</button>
                <div className="flex flex-row gap-2">
                    <div >Go back Home ? </div>

                    <Link to='/' className='text-blue-600 underline'>Home</Link>
                </div>
            </form>

        </div>
    );
};

export default RegisterPage;
