import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';



export default function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        emailOrUsername: yup.string().required('Username or Email is required'),
        password: yup
            .string()
            .required('Password is required')
    });

    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        const storedUser = localStorage.getItem('rememberedUser');
        if (storedUser) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(process.env.REACT_APP_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: data.emailOrUsername,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || 'Login failed');
                return;
            }

            const { accesstoken, refreshToken } = result;

            localStorage.setItem('accessToken', accesstoken);
            localStorage.setItem('refreshToken', refreshToken);

            if (rememberMe) {
                localStorage.setItem('rememberedUser', data.emailOrUsername);
            }

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login to ConnectVerse
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username or Email
                        </label>
                        <input
                            type="text"
                            {...register('emailOrUsername')}
                            placeholder="Enter username or email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.emailOrUsername?.message}</p>
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
                    </div>

                    {/* Options (Remember Me & Forgot Password) */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2 text-blue-500 focus:ring-blue-400 focus:outline-none"
                            />
                            Remember Me
                        </label>
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-medium transition transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
};

