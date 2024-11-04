import React, { useEffect, useState } from 'react';
import { useCreateBookingMutation } from '../store/storeApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const [booking, { isLoading, isError, error, isSuccess }] = useCreateBookingMutation();
  const [bookingData, setBookingData] = useState(null); // Store booking data securely
  const navigate = useNavigate();

  useEffect(() => {
    // Function to safely retrieve and validate booking data from localStorage
    const retrieveBookingData = () => {
      try {
        const storedData = localStorage.getItem('bookingData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData && parsedData.email && parsedData.phone) { // Add more validation checks if needed
            setBookingData(parsedData);
          } else {
            throw new Error('Invalid booking data');
          }
        } else {
          throw new Error('No booking data found');
        }
      } catch (err) {
        toast.error('Error processing booking, redirecting...');
        navigate('/');
      }
    };

    retrieveBookingData();
  }, [navigate]);

  useEffect(() => {
    // Function to create booking after payment confirmation
    const createBooking = async () => {
      if (!bookingData) return; // Ensure bookingData is available before proceeding

      try {
        await booking(bookingData).unwrap(); // Make the booking API call
        toast.success('Booking created successfully', {
          position: 'top-center',
        });
        localStorage.removeItem('bookingData'); // Clear booking data after successful booking
        navigate('/'); // Navigate back to the home page after success
      } catch (err) {
        toast.error('Error creating booking, please try again');
      }
    };

    if (bookingData) {
      createBooking();
    }
  }, [bookingData, booking, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'An error occurred during booking');
      localStorage.removeItem('bookingData'); // Clear booking data if there's an error
      navigate('/'); // Redirect to home page in case of error
    }
  }, [isError, error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Processing Your Booking...</h1>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Booking created successfully!</p>}
    </div>
  );
};

export default Success;
