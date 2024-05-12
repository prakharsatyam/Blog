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
    <div className="w-full py-8">
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {posts.map((post) => (
          <div key={post.$id} className="p-4">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </Container>
  </div>
  

  );
}

export default AllPosts;
