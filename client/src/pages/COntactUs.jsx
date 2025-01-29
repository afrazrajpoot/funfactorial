import React from 'react';
import { useForm } from 'react-hook-form';
import { useContactUseMutation } from '../store/storeApi';
import Header from '../components/Header';
import { toast } from 'sonner';

const ContactUs = () => {
  const [contactUs, { isLoading, isError, error }] = useContactUseMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', phone: '', message: '' }
  });

  const onSubmit = async (data) => {
    try {
      await contactUs(data).unwrap();
      toast.success('Message sent successfully!',{
        position: 'top-center',
        duration: 3000,
        
      });
      reset();
    } catch (err) {
      console.error('API Error:', err);
    }
  };

  const contactData = [
    // { title: 'Address:', info: '123 Business St', link: '#', icon: '🏢' },
    { title: 'Email:', info: 'info@funrides.co.uk', link: 'mailto:contact@example.com', icon: '✉️' },
    { title: 'Phone:', info: '07815 935423', link: 'tel:+15551234567', icon: '📞' }
  ];

  return (
  <>
  <Header />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-900 mb-12 animate-fade-in">
          Get in Touch
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-purple-900 mb-8">Contact Information</h2>
            <ul className="space-y-6">
              {contactData.map((elem, ind) => (
                <li key={ind} className="flex items-center space-x-4 group">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                    {elem.icon}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-700">{elem.title}</span>
                    <a href={elem.link} 
                       className="ml-2 text-purple-600 hover:text-purple-800 transition-colors duration-300">
                      {elem.info}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 p-4 bg-purple-50 rounded-lg text-purple-900 font-medium">
              We operate 7 days a week, 365 days a year.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-purple-900 mb-8 text-center">Quick Enquiry Form</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="group">
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                  placeholder="Your Name"
                />
                {errors.name && 
                  <p className="mt-1 text-red-500 text-sm animate-fade-in">{errors.name.message}</p>
                }
              </div>

              <div className="group">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                  placeholder="Your Email"
                />
                {errors.email && 
                  <p className="mt-1 text-red-500 text-sm animate-fade-in">{errors.email.message}</p>
                }
              </div>

              <div className="group">
                <input
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300 group-hover:border-purple-300"
                  placeholder="Your Phone"
                />
                {errors.phone && 
                  <p className="mt-1 text-red-500 text-sm animate-fade-in">{errors.phone.message}</p>
                }
              </div>

              <div className="group">
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 
                           focus:border-transparent transition-all duration-300 group-hover:border-purple-300 resize-none"
                  placeholder="Your Message"
                />
                {errors.message && 
                  <p className="mt-1 text-red-500 text-sm animate-fade-in">{errors.message.message}</p>
                }
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-900 to-purple-600 text-white rounded-lg font-semibold 
                           hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 
                           disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  ) : null}
                  Send Message
                </button>
              </div>
            </form>

            {isError && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg animate-fade-in">
                {error?.data?.message || 'An error occurred while sending your message.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ContactUs;