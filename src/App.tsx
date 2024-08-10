import React, { useEffect, useState, useCallback } from 'react';
import { FaCalendar, FaClock, FaUsers, FaGift, FaExclamationTriangle, FaHeart, FaPlus, FaHandsHelping } from 'react-icons/fa';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Center,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Container,
  useDisclosure,
  Icon,
  useColorModeValue,
  Avatar,
  SimpleGrid,
  Spinner,
  Textarea,
  GridItem,
  theme,
  extendTheme
} from '@chakra-ui/react';
import './index.css';

const customTheme = extendTheme({
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#38B2AC',
      700: '#2C7A7B',
    },
    groups: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      500: '#3182CE',
      700: '#2C5282',
    },
    offerings: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      500: '#38A169',
      700: '#276749',
    },
    emergency: {
      50: '#FFF5F5',
      100: '#FED7D7',
      500: '#E53E3E',
      700: '#C53030',
    },
    needs: {
      50: '#FAF5FF',
      100: '#E9D8FD',
      500: '#805AD5',
      700: '#553C9A',
    },
  },
});

type EventFormChangeHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const NeighborhoodDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [googleCalendarUrl] = useState('https://calendar.google.com/calendar/embed?src=example%40gmail.com');
  const [groups, setGroups] = useState<Array<{ name: string; schedule: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const [eventForm, setEventForm] = useState({
    name: '',
    date: '',
    time: '',
    description: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleEventFormChange: EventFormChangeHandler = (e) => {
    const { name, value } = e.target;
    setEventForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  useEffect(() => {
    // Simulating API call to fetch groups data
    setTimeout(() => {
      setGroups([
        { name: 'Gardening Club', schedule: 'Meets every Saturday at 10am' },
        { name: 'Neighborhood Council', schedule: 'Meets every 2nd Tuesday of the month' },
        { name: 'Book Club', schedule: 'Meets every 1st Friday of the month' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const { name, date, time } = eventForm;
    setIsFormValid(name.trim() !== '' && date !== '' && time !== '');
  }, [eventForm]);

  const handleAddEvent = useCallback(() => {
    if (!isFormValid) return;

    // Logic to add event to Google Calendar
    // Update googleCalendarUrl state
    console.log('Adding event:', eventForm);
    // Here you would typically make an API call to add the event

    onClose();
    setEventForm({
      name: '',
      date: '',
      time: '',
      description: ''
    });
    toast({
      title: "Event added",
      description: "Your event has been added to the calendar.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [eventForm, isFormValid, onClose, setEventForm, toast]);

  return (
    <ChakraProvider theme={customTheme}>
      <Box minHeight="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
        <Box as="header" bg={useColorModeValue("brand.700", "brand.800")} color="white" py={5} px={8} boxShadow="lg">
          <Container maxW="container.xl">
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">Neighborhood Dashboard</Heading>
              <Flex alignItems="center" gap={6}>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme="brand"
                  variant="solid"
                  onClick={onOpen}
                  size="lg"
                  fontWeight="bold"
                  px={8}
                  bg="white"
                  color="brand.700"
                  _hover={{ bg: "brand.50", transform: "translateY(-2px)", boxShadow: "md" }}
                  transition="all 0.3s"
                >
                  Add Event
                </Button>
                <Avatar size="lg" name="JD" bg="brand.100" color="brand.700" />
              </Flex>
            </Flex>
          </Container>
        </Box>

        <Container maxW="container.xl" py={8}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="md" className="dashboard-section" transition="all 0.3s" _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}>
                <Flex justifyContent="space-between" alignItems="center" p={6} borderBottomWidth="1px" bg="brand.50">
                  <Heading as="h3" size="lg" color="brand.700" fontWeight="bold">Community Calendar</Heading>
                  <Flex>
                    <IconButton
                      aria-label="View Calendar"
                      icon={<FaCalendar />}
                      size="md"
                      variant="ghost"
                      mr={3}
                      as="a"
                      href={googleCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="brand.600"
                      _hover={{ bg: "brand.100" }}
                    />
                    <Button
                      leftIcon={<FaPlus />}
                      colorScheme="brand"
                      size="md"
                      onClick={onOpen}
                      _hover={{ bg: "brand.700" }}
                      fontWeight="semibold"
                    >
                      Add Event
                    </Button>
                  </Flex>
                </Flex>
                <Box p={6} className="calendar-container" height={{ base: "350px", md: "450px", lg: "550px" }} bg="white">
                  {isLoading ? (
                    <Center height="100%">
                      <Spinner color="brand.500" size="xl" thickness="4px" />
                    </Center>
                  ) : (
                    <iframe
                      src={`${googleCalendarUrl}&output=embed`}
                      title="Community Calendar"
                      className="calendar-iframe"
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                    ></iframe>
                  )}
                </Box>
              </Box>
            </GridItem>

            {[
              { title: "Groups and Committees", icon: FaUsers, data: groups, color: "groups" },
              { title: "Offerings", icon: FaGift, data: [
                { name: 'Free Gardening Tools', description: 'Donated by the local hardware store' },
                { name: 'Neighborhood Yard Sale', description: 'This Saturday at 8am' },
                { name: 'Free Tech Support', description: 'Every Wednesday at 7pm' }
              ], color: "offerings" },
              { title: "Emergency Preparedness", icon: FaExclamationTriangle, data: [
                { name: 'Earthquake Preparedness', description: 'Tips and resources for being prepared' },
                { name: 'Wildfire Safety', description: 'Evacuation routes and emergency contacts' },
                { name: 'Flood Preparedness', description: 'What to do before, during, and after a flood' }
              ], color: "emergency" },
              { title: "Needs and Wants", icon: FaHandsHelping, data: [
                { name: 'Need Lawn Mower', description: 'My lawn mower is broken, anyone have one I can borrow?' },
                { name: 'Want Gardening Tools', description: 'Looking to start a small garden, need some basic tools.' },
                { name: 'Need Handyman', description: 'Looking for someone to help with a few small home repairs.' }
              ], color: "needs" }
            ].map((section, sectionIndex) => (
              <Box key={sectionIndex} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="md" className="dashboard-section" transition="all 0.3s" _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}>
                <Flex justifyContent="space-between" alignItems="center" p={6} borderBottomWidth="1px" bg={`${section.color}.50`}>
                  <Flex alignItems="center">
                    <Icon as={section.icon} boxSize={6} color={`${section.color}.600`} mr={3} />
                    <Heading as="h2" size="lg" color={`${section.color}.700`} fontWeight="bold">{section.title}</Heading>
                  </Flex>
                  <Button as="a" href="#" variant="outline" colorScheme={section.color} size="sm" fontWeight="semibold">View All</Button>
                </Flex>
                <Box p={6} minHeight="320px">
                  {section.data.length === 0 ? (
                    <Center height="100%">
                      <Spinner color={`${section.color}.500`} size="xl" thickness="4px" />
                    </Center>
                  ) : (
                    <VStack spacing={4} align="stretch">
                      {section.data.map((item: any, index: number) => (
                        <Flex key={index} alignItems="center" p={4} borderWidth="1px" borderRadius="md" _hover={{ bg: `${section.color}.50`, transform: "translateY(-2px)" }} transition="all 0.2s">
                          <Center w={12} h={12} bg={`${section.color}.100`} color={`${section.color}.600`} borderRadius="full" mr={4}>
                            {section.title === "Groups and Committees" ? (
                              <Text fontWeight="bold" fontSize="lg">
                                {item.name.split(' ').map((word: string) => word[0]).join('')}
                              </Text>
                            ) : (
                              <Icon as={section.icon} boxSize={6} />
                            )}
                          </Center>
                          <Box>
                            <Text fontWeight="semibold" fontSize="md" color={`${section.color}.700`} mb={1}>{item.name}</Text>
                            <Text fontSize="sm" color="gray.600">{item.schedule || item.description}</Text>
                          </Box>
                        </Flex>
                      ))}
                    </VStack>
                  )}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        {/* Add Event Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Event Name</FormLabel>
                  <Input
                    placeholder="Enter event name"
                    value={eventForm.name}
                    onChange={handleEventFormChange}
                    name="name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    value={eventForm.date}
                    onChange={handleEventFormChange}
                    name="date"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <Input
                    type="time"
                    value={eventForm.time}
                    onChange={handleEventFormChange}
                    name="time"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter event description"
                    value={eventForm.description}
                    onChange={handleEventFormChange}
                    name="description"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={handleAddEvent} isDisabled={!isFormValid}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default NeighborhoodDashboard;
