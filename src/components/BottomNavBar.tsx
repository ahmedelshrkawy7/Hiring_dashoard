import React, { useState, useEffect } from 'react'
import logo from '/images/SH_LOGO.webp'
function BottomNavBar() {
  const [state, setState] = useState('')

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <>
      <div className='fixed bottom-0 left-0 left-1/2 mx-auto inline-flex w-[97vw] -translate-x-1/2 transform justify-between rounded-3xl bg-background'>
        <a
          aria-current='page'
          className='inline-flex flex-grow flex-col items-center px-4 py-3 text-xs font-medium text-white'
          href='#'
        >
          <svg
            className='h-7 w-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
          <span className='sr-only'>Home</span>
        </a>
        <a
          className='inline-flex flex-grow flex-col items-center px-4 py-3 text-xs font-medium text-blue-400'
          href='#'
        >
          <svg
            className='h-7 w-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
              clipRule='evenodd'
            />
          </svg>
        </a>
        <span className='sr-only'>Upload</span>
        <button className='relative inline-flex flex-grow flex-col items-center px-6 py-3 text-xs font-medium text-white'>
          <div className='absolute bottom-5 rounded-full border-4 border-white bg-background p-3'>
            <img src={logo} alt='logo' className='h-7 w-7 object-cover' loading='lazy' />
          </div>
          <span className='sr-only'>Chat</span>
        </button>
        <a
          className='inline-flex flex-grow flex-col items-center px-4 py-3 text-xs font-medium text-blue-400'
          href='#'
        >
          <svg
            className='h-7 w-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </a>
        <a
          className='inline-flex flex-grow flex-col items-center px-4 py-3 text-xs font-medium text-blue-400'
          href='#'
        >
          <svg
            className='h-7 w-7'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Profile</span>
        </a>
      </div>{' '}
    </>
  )
}

export default BottomNavBar
