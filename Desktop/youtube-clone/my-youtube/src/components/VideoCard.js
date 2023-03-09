import React from "react";

const VideoCard = ({ info }) => {
  console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-72 shadow-md h-1/4  cursor-pointer ">
      <img className="rounded-xl" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-semibold py-2">{title}</li>
        <li className="text-xs text-gray-600 px-2">{channelTitle} </li>
        <li className="px-2 text-xs text-gray-500">
          {statistics.viewCount} views
        </li>
      </ul>
    </div>
  );
};

export default VideoCard;
