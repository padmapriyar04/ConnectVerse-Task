import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link, json } from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().required('UserName is required'),
    email: yup.string().required('Email is required').email('Enter a vali Email'),
    password: yup.string().required('Password is required').min(8, 'Password must have atleast 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmpassword: yup.string().oneOf([yup.ref('password')], "Passwords don't match").required('Confirm password is required'),
    terms: yup.boolean().oneOf([true], "You must accept the terms and conditions")
});


const Signup = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch(process.env.REACT_APP_SIGNUP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': data.username,
                    'email': data.email,
                    'password': data.password
                }),
            });
            const result = await response.json();
            console.log(result);
            if (!response.ok) {
                if(result.error === "Name already exists"){
                    alert("User already exists, try changing the UserName/Email used")
                }else{
                    alert(result.error || 'Signup failed,please try again');
                }
                return;
            }
            console.log(result);

            alert("Account Successfully created! You would have recieved an email notification");
            navigate('/login');

        } catch (error) {
            alert('Signup failed. Please try again.');
        }

    }

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full ">
                <div className="text-2xl font-bold text-center mb-6 text-gray-800">Create an Account</div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">UserName</label>
                        <input type="text" {...register('username')} placeholder="Enter Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <p className="text-sm text-red-500 mt-1">{errors.username?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" {...register('email')} placeholder="Enter Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" {...register('password')} placeholder="Enter Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input type="password" {...register('confirmpassword')} placeholder="Confirm password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p className="text-sm text-red-500 mt-1">{errors.confirmpassword?.message}</p>
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Optional)</label>
                        <input type="file" onChange={handleProfilePicChange} accept="image/*" />
                        {profilePic && <p>Selected File: {profilePic.name}</p>}
                    </div>
                    <div className="form-group">
                        <label className="text-sm">
                            <input type="checkbox" {...register('terms')} />
                            I agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">terms and conditions</Link>
                        </label>
                        <p className="text-sm text-red-500 mt-1">{errors.terms?.message}</p>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium transition transform hover:scale-105">Sign up</button>
                    <p className="text-center text-sm ">
                        Already have an Account? <Link to='/login' className="text-blue-600 hover:underline">Login Here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;