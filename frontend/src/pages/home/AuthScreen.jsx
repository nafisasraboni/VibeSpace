import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from 'react-icons/fi';

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email="+email);
  }

  return (
    <div>
      <div className='hero-bg relative'>
        {/* Navbar */}
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
          <img src='/VibeSpace-logo.png' alt='VibeSpace Logo' className='w-24 md:w-40' />
          <Link to={"/login"} className='text-white bg-red-600 py-1 px-2 rounded'>
            Sign In
          </Link>
        </header>

        {/* Hero section */}
        <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, TV shows, and more</h1>
          <p className='text-lg mb-4'>Watch Anywhere. Cancel anytime.</p>
          <p className='mb-4'>Ready to watch? Enter your Email to create or restart your membership.</p>

          <div className='flex justify-center items-center w-full px-4'>
            <form className='flex flex-col md:flex-row gap-4 w-full max-w-2xl' onSubmit={handleFormSubmit}>
              <input
                type='email'
                className='flex-1 px-4 py-3 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='bg-red-600 text-white text-lg lg:text-xl px-4 py-3 rounded-md flex items-center whitespace-nowrap hover:bg-red-700 transition'>
                Get Started
                <FiChevronRight className='ml-2 w-6 h-6' />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 1st section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Enjoy on your TV</h2>
            <p className='text-lg md:text-xl'>
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </div>
          {/* right side */}
          <div className='flex-1 relative'>
            <img src='/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
            <video
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src='/hero-vid.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

      {/* 2nd section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1'>
            <div className='relative'>
              <img src="/stranger-things-lg.png" alt="Stranger Things img" className='mt-4' />

              <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                <img src='/stranger-things-sm.png' alt='image' className='h-full' />
                <div className='flex justify-between items-center w-full'>
                  <div className='flex flex-col gap-0'>
                    <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                    <span className='text-sm text-blue-500'>Downloading....</span>
                  </div>
                  <img src='/download-icon.gif' alt='' className='h-12' />
                </div>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className='flex-1 md:text-left text-center'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>
              Download your shows to watch offline
            </h2>
            <p className='text-lg md:text-xl'>
              Save your favourites easily and always have something to watch.
            </p>
            
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />
    
    {/* 3rd section */}
      <div className='py-10 bg-black text-white'>
        <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
          {/* left side */}
          <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
            <p className='text-lg md:text-xl'>
              Stream unlimited movies and tv shows on your phone, tablet, laptop, PC & TV.
            </p>
          </div>

          {/* right side */}
          <div className='flex-1 relative overflow-hidden'>
            <img src='/device-pile.png' alt='Device image' className='mt-4 z-20 relative' />
            <video
              className='absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]'
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src='/video-devices.m4v' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

    {/* 4th section */}

    <div className='py-10 bg-black text-white'>
      <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>

        {/* left side */}

      <div className='flex-1 relative'>
        <img src='/kids.png' alt='Enjoy on your TV' className='mt-4'/>
      </div>
      {/* right side */}
        <div className='flex-1 text-center md:text-left'>
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Create profile for kids</h2>
            <p className='text-lg md:text-xl'>
              Send kids on adventure with their favourite characters in a space made just for them-free
              with your membership.
            </p>
          </div>

      </div>
    </div>

    {/* separator */}
      <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

    </div>
  );
};

export default AuthScreen;
