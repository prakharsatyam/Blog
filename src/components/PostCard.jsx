/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-36 flex flex-wrap  bg-gray-100 rounded-xl ">
        <div className="w-36 justify-center mb-4">
          <img src={appwriteService.getFilePreview(featuredImage)}
           alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="flex flex-shrink text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
