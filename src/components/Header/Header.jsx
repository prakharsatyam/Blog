
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Header() {
 
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const buttonclick= (name)=>setActiveButton(name)
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow bg-gradient-to-t text-white from-zinc-900 to-transparent rounded-3xl ">
  <Container>
    <nav className=" flex flex-col items-center justify-between">
      <div className="flex items-center py-2">
        
          <Link to="/">
            <Logo width="70px" />
          </Link>
      </div>
      <ul className="flex flex-wrap items-center justify-center ">
        {navItems.map((item) =>
          item.active ? (
            <li className="ml-4 hover:bg-gradient-to-b hover:from-[#784180] hover:to-transparent rounded-full" key={item.name}>
              <button
                onClick={() => {navigate(item.slug); buttonclick(item.name);}}
                className={`  hover:animate-pulse   px-6 py-2 duration-200 rounded-full ${activeButton===item.name?'bg-gradient-to-r from-pink-500 to-yellow-500': null}`}
              >
                {item.name}
              </button>
            </li >
          ) : null
        )}
        {authStatus && (
          <li className="ml-4">
            <LogoutBtn />
          </li>
        )}
      </ul>
    </nav>
  </Container>
</header>

  );
}

export default Header;

// import React from 'react'
// import {Container, Logo, LogoutBtn} from '../index'
// import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   console.log(authStatus);
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   ]


//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px'   />

//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header








 // <header className="py-3 shadow bg-gray-500 w-full max-w-full ">
    //   <Container>
    //     <nav className="flex">
    //       <div className="mr-4">
    //         <Link to="/">
    //           <Logo width="70px" />
    //         </Link>
    //       </div>
    //       <ul className="flex ml-auto">
    //         {navItems.map((item) =>
    //           item.active ? (
    //             <li  key={item.name}>
    //               <button
    //                 onClick={() => {navigate(item.slug); buttonclick(item.name);}}
    //                 className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${activeButton===item.name?'bg-slate-400': null}`}
    //               >
    //                 {item.name}
    //               </button>
    //             </li>
    //           ) : null
    //         )}
    //         {authStatus && (
    //           <li >
    //             <LogoutBtn/>
    //           </li>
    //         )}
    //       </ul>
    //     </nav>
    //   </Container>
    // </header>