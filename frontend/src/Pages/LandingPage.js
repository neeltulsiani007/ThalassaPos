// src/RestaurantLandingPage.js

import React, { useState , useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import r1 from '../images/r1.jpeg';
import r2 from '../images/r2.jpeg';
import r3 from '../images/r3.jpeg';
import r4 from '../images/r4.jpeg';
import r5 from '../images/r5.jpeg';
import r6 from '../images/r6.jpeg';
import f1 from '../images/f1.jpeg'
import f2 from '../images/f2.jpeg'
import f3 from '../images/f3.jpeg'
import a1 from '../images/about.jpeg'


function RestaurantLandingPage() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };
    const navigate = useNavigate()

  const homeRef = useRef(null); 
  const menuRef = useRef(null); 
  const contactRef = useRef(null); 
  const galleryRef = useRef(null);
  const aboutRef = useRef(null);

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

    return (
        <div className="min-h-screen font-sans">
<nav class="bg-white  w-full h-20 border-gray-200 ">
  <div ref={homeRef} class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={a1} class="h-12 w-12 rounded-full" alt="Flowbite Logo" />
        <span class="self-center text-3xl font-semibold whitespace-nowrap ">Thalassa</span>
    </a>
    <button  data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
        <span class="sr-only">Open main menu</span>
        <svg onClick={toggleNavbar} class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class={` ${isNavbarOpen &&'hidden'} w-full md:block md:w-auto id="navbar-default `}>
      <ul class={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white  `}>
      <li>
      <span onClick={()=>{handleScroll(homeRef.current)}} class="block cursor-pointer py-2 px-3 hover:text-gray-900 rounded text-gray-500 md:hover:bg-transparent md:border-0  md:p-0 ">Home</span>
        </li>
        <li>
        <span onClick={()=>{handleScroll(aboutRef.current)}} class="block cursor-pointer py-2 px-3 hover:text-gray-900 rounded text-gray-500 md:hover:bg-transparent md:border-0  md:p-0 ">About</span>
        </li>
        <li>
        <span onClick={()=>{handleScroll(menuRef.current)}} class="block cursor-pointer py-2 px-3 hover:text-gray-900 rounded text-gray-500 md:hover:bg-transparent md:border-0  md:p-0 ">Menu</span>
        </li>
        <li>
        <span onClick={()=>{handleScroll(galleryRef.current)}} class="block cursor-pointer py-2 px-3 hover:text-gray-900 rounded text-gray-500 md:hover:bg-transparent md:border-0  md:p-0 ">Gallery</span>
        </li>
        <li>
          <span onClick={()=>{handleScroll(contactRef.current)}} class="block cursor-pointer py-2 px-3 hover:text-gray-900 rounded text-gray-500 md:hover:bg-transparent md:border-0  md:p-0 ">Contact</span>
        </li>
      </ul>
    </div>
  </div>
</nav>


            {/* Hero Section */}
            <section className="bg-gray-800 text-white">
                <div className="container mx-auto px-6 py-16">
                    <h1 className="text-4xl font-semibold mb-4">Welcome to Thalassa !</h1>
                    <p className="text-lg mb-8">
                        It's not just a restaurant . It's an experience .
                    </p>
                    <button
                    onClick={()=>{navigate('/login')}}
                        className="bg-white hover:text-white hover:bg-gray-800 text-gray-800 px-6 py-3 rounded-full text-2xl w-48 font-semibold transition-all duration-300 ease-in-out focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-gray-700"
                        >Login
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="container mx-auto px-6 py-16 ">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-20  ">
                        <h2 className="text-3xl font-semibold mb-4 ">About Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                        Hugging a bend in Vaddy, Siolim, Thalassa is a beautiful outdoor waterfront space that instantly reminds you of the mediterranean. Needless to say, Thalassa gets a ringside view to some of the most stunning Goan sunsets. Grecian aesthetics and hospitality are visible in every bit of this lovely property in white décor.
                        Terrazzo flooring, cane seating and rustic wooden furniture against the azure blue of water and skies make this a gorgeous place, day or night. The generous acreage gives it a leisurely feel even as it provides a coziness to those seeking it.
                        Thalassa provides a fabulous backdrop for those Instagram-worthy holiday pictures and it is a go-to destination for those visiting Goa. Artists and artisans are supported and they run many shops within the compound showcasing their beautiful creations ranging from clothing, jewellery, footwear, home décor & more…
                         </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img 
                            src={a1}
                            alt="About" 
                            className="w-full rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                        />
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section ref={menuRef} className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold mb-8">Our Menu</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="menu-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                            <img 
                                src={f1}
                                alt="Menu Item 1" 
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Appetizers</h3>
                               
                                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                                View
                                </button>
                            </div>
                        </div>
                        <div className="menu-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                            <img 
                                src={f2} 
                                alt="Menu Item 2" 
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Beverages</h3>
                               
                                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                                View
                                </button>
                            </div>
                        </div>
                        <div className="menu-item bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                            <img 
                                src={f3} 
                                alt="Menu Item 3" 
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">Seafood</h3>
                               
                                <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out">
                                View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section ref={galleryRef} className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold mb-8">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    <img 
                        src={r1} 
                        alt="Gallery Image 1" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                    <img 
                        src={r2}  
                        alt="Gallery Image 2" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                    <img 
                        src={r3}  
                        alt="Gallery Image 3" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                    <img 
                        src={r4}  
                        alt="Gallery Image 4" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                    <img 
                        src={r5}  
                        alt="Gallery Image 5" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                    <img 
                        src={r6}  
                        alt="Gallery Image 6" 
                        className="rounded-lg  h-full w-full shadow-md hover:shadow-xl transition duration-300 ease-in-out"
                    />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-800 text-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-semibold mb-8">Testimonials</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <div className="testimonial bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                                <p className="text-gray-600">
                                "Delicious food and great service! Highly recommend the pasta and tiramisu. The ambiance was cozy and welcoming. Can't wait to visit again!"
                                </p>
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">John Doe</h3>
                                    <p className="text-gray-600">Emily S.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-4 mb-8">
                            <div className="testimonial bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                                <p className="text-gray-600">
                                "Lovely ambiance and friendly staff. The steak was cooked to perfection! Had a wonderful dining experience overall."
                                </p>
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold">Jane Doe</h3>
                                    <p className="text-gray-600">Mark S.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-20 md:mt-32">
                     <p className="text-gray-600 leading-relaxed">
                        For reservations & inquiries
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                        Operating hours : 11:00 a.m 2:00 a.m
                        </p>
                        <div className="mt-4">
                            <p className="text-gray-600">Email: neeltulsiani007@gmail.com</p>
                            <p className="text-gray-600">Phone: +919619035651</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form className="bg-white rounded-lg shadow-md p-6">
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="w-full p-2 border rounded-md" 
                                    placeholder="Enter your name" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="w-full p-2 border rounded-md" 
                                    placeholder="Enter your email" 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea 
                                    id="message" 
                                    className="w-full p-2 border rounded-md h-32" 
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <h3 className="text-xl font-semibold mb-4">Thalassa</h3>
                            <p className="text-gray-600">
                            Thalassa Serves as a one stop destination for your holidays. It's not just a restaurant, it is an experience.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                            <ul>
                                
                                <li><Link to="/menu" className="text-gray-600 hover:text-white transition duration-300 ease-in-out">Aarushi Bharti</Link></li>
                                <li><Link to="/contact" className="text-gray-600 hover:text-white transition duration-300 ease-in-out">Shrey Raj</Link></li>
                                <li><Link to="/about" className="text-gray-600 hover:text-white transition duration-300 ease-in-out">Neel Tulsiani</Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default RestaurantLandingPage;
