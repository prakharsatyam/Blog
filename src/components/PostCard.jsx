/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
 function PostCard({ $id, title, featuredImage }) {
 let mart =  appwriteService.getFilePreview(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-auto flex flex-wrap  bg-gradient-to-br from-purple-500 to-transparent border-y-4 border-indigo-500 text-white rounded-xl ">
        <div className="w-auto justify-center mb-4">
          <img src={mart}
           alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className=" flex flex-shrink text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;


