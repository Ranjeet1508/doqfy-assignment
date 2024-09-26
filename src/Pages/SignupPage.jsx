// import React from 'react';
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     Stack,
//     useDisclosure,
//     Alert,
//     AlertIcon,
//     Text,
//     Link as ChakraLink
// } from '@chakra-ui/react';
// import { useForm } from 'react-hook-form';
// import { Link as RouterLink } from 'react-router-dom'

// const SignupPage = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();

//     const onSubmit = (data) => {
//         console.log(data);
//         // Handle the signup logic here
//         onOpen(); // Show success alert on submit
//     };

//     return (
//         <Box bg='gray.50'>
//             <Box maxW="lg" mx="auto" py={8} px={4}>
//                 <Stack spacing={6} align="center">
//                     {/* <Heading as="h1" size={useBreakpointValue({ base: 'xl', md: '2xl' })}>
//           Sign Up
//         </Heading> */}
//                     <Box mt={10} minW={'30vw'} minH={'50vh'} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <Stack spacing={4}>
//                                 <FormControl isRequired>
//                                     <FormLabel>Name</FormLabel>
//                                     <Input
//                                         placeholder="John Doe"
//                                         {...register('name', { required: 'Name is required' })}
//                                     />
//                                     {errors.name && <Alert status="error"><AlertIcon />{errors.name.message}</Alert>}
//                                 </FormControl>

//                                 <FormControl isRequired>
//                                     <FormLabel>Email</FormLabel>
//                                     <Input
//                                         type="email"
//                                         placeholder="john.doe@example.com"
//                                         {...register('email', { required: 'Email is required' })}
//                                     />
//                                     {errors.email && <Alert status="error"><AlertIcon />{errors.email.message}</Alert>}
//                                 </FormControl>

//                                 <FormControl isRequired>
//                                     <FormLabel>Password</FormLabel>
//                                     <Input
//                                         type="password"
//                                         placeholder="********"
//                                         {...register('password', { required: 'Password is required' })}
//                                     />
//                                     {errors.password && <Alert status="error"><AlertIcon />{errors.password.message}</Alert>}
//                                 </FormControl>

//                                 <Button type="submit" colorScheme="teal">
//                                     Sign Up
//                                 </Button>
//                             </Stack>
//                         </form>
//                     </Box>
//                 </Stack>

//                 {isOpen && (
//                     <Alert status="success" mt={4}>
//                         <AlertIcon />
//                         Signup successful!
//                     </Alert>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default SignupPage;


import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertIcon,
    useDisclosure
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Send a POST request to your backend to register the user
            const response = await axios.post('https://signp-login-backend.vercel.app/user/signup', data);

            // Handle successful signup (the backend should return some kind of confirmation or user object)
            console.log(response.data);

            // Clear any previous error message
            setErrorMessage('');

            // Show success alert
            onOpen();

            // Redirect to login page after successful signup
            setTimeout(() => {
                onClose();
                navigate('/login');
            }, 2000); // Wait for 2 seconds before redirecting
        } catch (error) {
            // Handle error and display appropriate error message
            console.error('Signup error:', error);
            setErrorMessage('Signup failed. Please try again.');
        }
    };

    return (
        <Box bg='gray.50'>
            <Box maxW="lg" mx="auto" py={8} px={4}>
                <Stack spacing={6} align="center">
                    <Box mt={10} minW={'30vw'} minH={'50vh'} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder="John Doe"
                                        {...register('name', { required: 'Name is required' })}
                                    />
                                    {errors.name && <Alert status="error"><AlertIcon />{errors.name.message}</Alert>}
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <Alert status="error"><AlertIcon />{errors.email.message}</Alert>}
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        {...register('password', { required: 'Password is required' })}
                                    />
                                    {errors.password && <Alert status="error"><AlertIcon />{errors.password.message}</Alert>}
                                </FormControl>

                                <Button type="submit" colorScheme="teal">
                                    Sign Up
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>

                {isOpen && (
                    <Alert status="success" mt={4}>
                        <AlertIcon />
                        Signup successful! Redirecting to login...
                    </Alert>
                )}

                {errorMessage && (
                    <Alert status="error" mt={4}>
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default SignupPage;
