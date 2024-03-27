import {useEffect,useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'
function Home() {
    const [posts, setposts] = useState([])
    
    useEffect(() => {
    appwriteService.getPosts().then((posts)=>{
        if (posts) {
            setposts(posts.documents)
        }
    })},[])
    if (posts.length===0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className=' text-2xl text-white font-bold hover:text-gray-500 animate-bounce'>
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  return (
<div className="py-8">
  <Container>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post.$id} className="p-4">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  </Container>
</div>

  )
}

export default Home

//     <div className='w-full py-8'>
//     <Container>
//         <div className='flex flex-wrap'>
//             {posts.map((post) => (
//                 <div key={post.$id} className='p-2 w-1/4'>
//                     <PostCard {...post} />
//                 </div>
//             ))}
//         </div>
//     </Container>
// </div>


/* <div className='w-full py-8'>
  <Container>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4'>
      {posts.map((post) => (
        <div key={post.$id} className='p-2  hover:transition delay-150 duration-300 ease-in-out'>
          <PostCard {...post} />
        </div>
      ))}
    </div>
  </Container>
</div> */

// https://www.youtube.com/watch?v=rqJDO3TWnac