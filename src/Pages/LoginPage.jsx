// import React from 'react';
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     Stack,
//     Heading,
//     useBreakpointValue,
//     useDisclosure,
//     Alert,
//     AlertIcon,
//     Text,
//     Link as ChakraLink
// } from '@chakra-ui/react';
// import { useForm } from 'react-hook-form';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const navigate = useNavigate();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();

//     const onSubmit = async(data) => {
//         try {
//             console.log(data);
//             let res = axios.post('http://localhost:8080/user/login', data);
            
//         } catch (error) {
            
//         }
        
//         // Handle the login logic here
//         onOpen(); // Show success alert on submit
//     };

//     return (
//         <Box bg='gray.50' h={'90vh'}>
//             <Box maxW="lg" mx="auto" py={8} px={4}>
//                 <Stack spacing={6} align="center">
//                     {/* <Heading as="h1" size={useBreakpointValue({ base: 'xl', md: '2xl' })}>
//                     Login
//                 </Heading> */}
//                     <Box mt={10} minW={'30vw'} minH={'50vh'} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <Stack spacing={4}>
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

//                                 <Button mt={5} type="submit" colorScheme="teal">
//                                     Login
//                                 </Button>
//                             </Stack>
//                         </form>
//                     </Box>
//                 </Stack>

//                 {isOpen && (
//                     <Alert status="success" mt={4}>
//                         <AlertIcon />
//                         Login successful!
//                     </Alert>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default LoginPage;



import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Alert,
    AlertIcon,
    useDisclosure,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Send login request to backend
            const response = await axios.post('https://signp-login-backend.vercel.app/user/login', data);

            // Assuming the backend returns a token and user data on successful login
            const { token, isUser } = response.data;

            // Store the token in localStorage (or in cookies)
            localStorage.setItem('authToken', token);

            // You can also store user information if needed
            localStorage.setItem('user', JSON.stringify(isUser));

            // Clear any previous error message
            setErrorMessage('');

            // Show success alert
            onOpen();

            // Redirect to a different page after login (e.g., home or dashboard)
            setTimeout(() => {
                onClose();
                navigate('/fee-structure'); // Replace with your desired route
            }, 1500);
        } catch (error) {
            // Handle error and display appropriate error message
            setErrorMessage('Invalid email or password. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Box bg='gray.50' h={'90vh'}>
            <Box maxW="lg" mx="auto" py={8} px={4}>
                <Stack spacing={6} align="center">
                    <Box mt={10} minW={'30vw'} minH={'50vh'} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
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

                                <Button mt={5} type="submit" colorScheme="teal">
                                    Login
                                </Button>
                            </Stack>
                        </form>

                        {errorMessage && (
                            <Alert status="error" mt={4}>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                    </Box>
                </Stack>

                {isOpen && (
                    <Alert status="success" mt={4}>
                        <AlertIcon />
                        Login successful! Redirecting...
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default LoginPage;
