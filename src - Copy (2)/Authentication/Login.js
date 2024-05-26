import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            alert('Login successful');
            navigate('/home', { replace: true });
        } catch (error) {
            alert('Enter correct credentials');
            console.error('Failed to log in:', error);
        }
    };

    return (
        <>
            <div className='bg-slate-100 h-screen flex justify-center items-center'>
                <form onSubmit={handleSubmit} className="w-[400px] h-[80%] bg-white rounded-md shadow-2xl hover:shadow-lg border-2 border-red-400 flex justify-center gap-10 items-center flex-col">
                    <h1 className='font-bold text-4xl'>Login</h1>
                    <div className="flex justify-end flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <label className="text-xl text-left">Enter Email:</label>
                            <input className="border-black border-2 rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="text-xl">Enter Password:</label>
                            <input className="border-black border-2 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className='btn'>Login</button>
                    <div className="flex flex-row gap-2">
                        <div>Already a user?</div>
                        <Link to='/register' className='text-blue-600 underline'>Register</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
