import React from 'react'
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels, Heading, Text, Container } from '@chakra-ui/react'
import MedicalRegisteration from "./MedicalRegisteration.jsx"
import OthersRegisteration from "./OthersRegisteration.jsx"

function Registeration() {
  return (
   <Box bgGradient="linear(to-b, gray.50, white)" minH="100vh" py={{ base: 6, md: 10 }}>
     <Container maxW="5xl">
       <Box textAlign="center" mb={6}>
         <Heading size="lg" color="#2a4d69" mb={2}>Create Your Profile</Heading>
         <Text color="gray.600">Choose the appropriate track and complete the guided steps.</Text>
       </Box>

       <Tabs  colorScheme="blue" isFitted>
         <TabList>
           <Tab>Medical Professional</Tab>
           <Tab>Other Professional</Tab>
         </TabList>

         <TabPanels>
           <TabPanel px={0}>
             <MedicalRegisteration/>
           </TabPanel>
           <TabPanel px={0}>
             <OthersRegisteration/>
           </TabPanel>
         </TabPanels>
       </Tabs>
     </Container>
   </Box>
  )
}

export default Registeration
