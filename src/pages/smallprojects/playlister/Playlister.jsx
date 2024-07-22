import { useForm } from "react-hook-form";
import Video from "./Video.jsx";
import fetchPlaylistItems from "./fetchItems.js";
import { useEffect, useState } from "react";

function Playlister() {
  const apikey = "AIzaSyCaX2SsKLtQ98ChOEoQF_Wb6m_JcPzksmA";
  const [nextPageToken, setnextPageToken] = useState("");
  const [videos, setVideos] = useState([]);
  const [playlist, setplaylist] = useState('')
  const { register, handleSubmit } = useForm();
  const onSub = (data) => {setplaylist(data.id.slice(data.id.indexOf('=') + 1))
    
  };

  useEffect(() => {
    (async () => {
      let response = await fetchPlaylistItems(
        apikey,
        playlist,
        nextPageToken,
      );
      setVideos(response.items);
      setnextPageToken(response.nextPageToken);
    })();
  }, [apikey, playlist]);

  async function nextPage() {
    let result = await fetchPlaylistItems(apikey, playlist, nextPageToken);
    setVideos(videos.concat(result.items));
    setnextPageToken(result.nextPageToken);
  }

  return (
    <div className="min-h-screen  text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800/400 shadow-md rounded-lg p-6">
        <div className="mb-6">
          <form onSubmit={handleSubmit(onSub)} className="flex space-x-4">
            <input
              placeholder="Enter your playlist link"
              {...register("id")}
              className="border rounded p-2 flex-1 bg-gray-700 text-gray-200 "
            />
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              Submit
            </button>
          </form>
        </div>


        <div className="space-y-4">
          {videos.map((video) => (
            <Video key={video.id} video={video} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 ml-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            onClick={nextPage}
          >
            Load more 
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playlister;
