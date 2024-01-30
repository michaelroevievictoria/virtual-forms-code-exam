'use client'
import { useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';


const CongratsView: NextPage<any> = ({ }) => {
    const router = useRouter()
    const storedDataString = localStorage.getItem('formData');
    const data = storedDataString ? JSON.parse(storedDataString) : null;

    useEffect(() => {
        if (!data) {
            router.push('/404')
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Container className="mx-auto p-4 bg-white shadow-lg rounded-lg">
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
            </Container>
        </div>
    )
}

export default CongratsView;