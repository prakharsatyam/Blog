import { Container, PostCard } from "../components";
import appWriteservice from "../appwrite/config";
import { useState, useEffect } from "react";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {  appWriteservice.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });}, []);

  return (
    // <div className="w-full py-8">
    //   <Container>
    //     <div className="flex flex-wrap">
    //       {posts.map((post) => (
    //         <div key={post.$id} className="p-2 w-1/4">
    //           <PostCard {...post} />
    //         </div>
    //       ))}
    //     </div>
    //   </Container>
    // </div>
    <div className="w-full py-8">
  <Container>
    <div className="flex flex-wrap justify-center">
      {posts.map((post) => (
        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  </Container>
</div>

  );
}

export default AllPosts;
