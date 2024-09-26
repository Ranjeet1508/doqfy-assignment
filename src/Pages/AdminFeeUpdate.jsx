// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Heading,
//   Input,
//   Select,
//   FormControl,
//   FormLabel,
//   Button,
//   VStack,
// } from '@chakra-ui/react';

// function AdminFeeUpdate() {
//   const [fees, setFees] = useState([
//     { timing: 'morning', fees: '', availability: true },
//     { timing: 'afternoon', fees: '', availability: true },
//     { timing: 'evening', fees: '', availability: true },
//   ]);

//   // Update the state when admin changes inputs
//   const handleInputChange = (index, field, value) => {
//     const updatedFees = [...fees];
//     updatedFees[index][field] = value;
//     setFees(updatedFees);
//   };

//   // Submit the updated fees
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.put('/fees', fees)
//       .then(response => alert('Fees updated successfully!'))
//       .catch(error => console.error('Error updating fees:', error));
//   };

//   return (
//     <Box maxW="600px" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
//       <Heading as="h1" size="lg" mb={6} textAlign="center">
//         Admin: Fee Structure
//       </Heading>
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={5}>
//           {fees.map((fee, index) => (
//             <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%">
//               <Heading as="h3" size="md" mb={4}>
//                 {fee.timing.charAt(0).toUpperCase() + fee.timing.slice(1)} Shift
//               </Heading>
//               <FormControl mb={4}>
//                 <FormLabel>Fees</FormLabel>
//                 <Input
//                   type="text"
//                   value={fee.fees}
//                   onChange={(e) => handleInputChange(index, 'fees', e.target.value)}
//                   placeholder="Enter fees"
//                   focusBorderColor="teal.400"
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Availability</FormLabel>
//                 <Select
//                   value={fee.availability}
//                   onChange={(e) => handleInputChange(index, 'availability', e.target.value === 'true')}
//                   focusBorderColor="teal.400"
//                 >
//                   <option value="true">Available</option>
//                   <option value="false">Full</option>
//                 </Select>
//               </FormControl>
//             </Box>
//           ))}
//           <Button type="submit" colorScheme="teal" size="md" width="full">
//             Update Fees
//           </Button>
//         </VStack>
//       </form>
//     </Box>
//   );
// }

// export default AdminFeeUpdate;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Select,
  FormControl,
  FormLabel,
  Button,
  VStack,
} from '@chakra-ui/react';

function AdminFeeUpdate() {
  const [fees, setFees] = useState([
    { timing: 'morning', fees: '', availability: true },
    { timing: 'afternoon', fees: '', availability: true },
    { timing: 'evening', fees: '', availability: true },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch existing fee structure from the backend on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/fee') // Assuming this is the API endpoint for fetching all fee structures
      .then((response) => {
        const feeData = response.data;

        // Map over the current fee state and replace values if data exists for that timing
        const updatedFees = fees.map((fee) => {
          const existingFee = feeData.find((f) => f.timing === fee.timing);
          return existingFee
            ? { ...fee, fees: existingFee.fees, availability: existingFee.availability }
            : fee; // If no data exists for that timing, keep the original values
        });

        setFees(updatedFees);
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error fetching fees:', error);
        setLoading(false); // Even if there's an error, stop loading
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Update the state when admin changes inputs
  const handleInputChange = (index, field, value) => {
    const updatedFees = [...fees];
    updatedFees[index][field] = value;
    setFees(updatedFees);
  };

  // Submit the updated fees
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:8080/fee', fees)
      .then((response) => alert('Fees updated successfully!'))
      .catch((error) => console.error('Error updating fees:', error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Admin: Fee Structure
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          {fees.map((fee, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="100%">
              <Heading as="h3" size="md" mb={4}>
                {fee.timing.charAt(0).toUpperCase() + fee.timing.slice(1)} Shift
              </Heading>
              <FormControl mb={4}>
                <FormLabel>Fees</FormLabel>
                <Input
                  type="text"
                  value={fee.fees}
                  onChange={(e) => handleInputChange(index, 'fees', e.target.value)}
                  placeholder="Enter fees"
                  focusBorderColor="teal.400"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Availability</FormLabel>
                <Select
                  value={fee.availability}
                  onChange={(e) =>
                    handleInputChange(index, 'availability', e.target.value === 'true')
                  }
                  focusBorderColor="teal.400"
                >
                  <option value="true">Available</option>
                  <option value="false">Full</option>
                </Select>
              </FormControl>
            </Box>
          ))}
          <Button type="submit" colorScheme="teal" size="md" width="full">
            Update Fees
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AdminFeeUpdate;
