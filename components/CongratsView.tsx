'use client'
import { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';


const CongratsView: NextPage<any> = ({ }) => {
    const router = useRouter()
    const [data, setData] = useState(null);
    console.log('data', data)
    useEffect(() => {

        // Check if running on the client side
        if (typeof window !== 'undefined') {
            const storedDataString = localStorage.getItem('formData');
            const parsedData = storedDataString ? JSON.parse(storedDataString) : null;

            if (!parsedData) {
                router.push('/404')
            }
            setData(parsedData);
        } else {
            router.push('/404')
        }

    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Paper elevation={6} className='lg:w-2/5 w-10/12 p-10'>
                <Typography variant="h4" align="center" className="mb-4">
                    🎉 Congratulations, {_.get(data, 'firstName', '')} {_.get(data, 'lastName', '')}! 🎉
                </Typography>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">First Name:</label>
                    <p className="text-lg">{_.get(data, 'lastName', '')}</p>
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <p className="text-lg">{_.get(data, 'lastName', '')}</p>
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <p className="text-lg">{_.get(data, 'email', '')}</p>
                </div>
            </Paper>
        </div>
    )
}

export default CongratsView;