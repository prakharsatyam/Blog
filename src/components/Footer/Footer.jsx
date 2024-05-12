// eslint-disable-next-line no-unused-vars
import React from 'react'
function Footer() {
  return (
    <section className="bg-gradient-to-b from-zinc-900 to-transparent py-10 rounded-2xl " style={{ pointerEvents: 'none'}}>
      <div className='text-center text-white py-5 font-bold ' style={{ cursor: 'none', pointerEvents: 'none'}}>The pictures would start loading only afer you have logged in once through your device</div>
    <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 justify-around">

            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
                <h3 className="text-white text-lg font-semibold mb-4">Contact Me</h3>
                <p className="text-gray-400">Modern Boys Hostel, Kolkata, India</p>
                <p><a href="mailto:prakhar.2k17@gmail.com" className='text-white'>prakhar.2k17@gmail.com</a></p>
                <p><a href="tel:+919507819554" className='text-white'>+91 950-781-9554</a></p>
            </div>
            
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8 md:mb-0">
                <h3 className="text-white text-lg font-semibold mb-4">Socials</h3>
                <p className="text-gray-400">FInd out more on</p>
                <p><a href="https://github.com/prakharsatyam/prakharsatyam" className='text-white'>GitHub</a></p>
                <p><a href="https://www.linkedin.com/in/prakhar-satyam-02a972157/" className='text-white'>LinkedIn</a></p>
            </div>
        </div>
        
        <p className="text-center text-gray-400 mt-8">&copy; 2024. Made by Prakhar</p>
    </div>
</section>

  )
}

export default Footer