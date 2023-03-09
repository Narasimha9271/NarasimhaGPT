import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import {
  faVideo,
  faBell,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();

  //TO read cache
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //API CALL

    //Decline API if differnece between 2 key strokes < 200ms

    const timer = setTimeout(() => {
      // Making logic for cache
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    //console.log(json[1]);
    setSuggestions(json[1]);

    //If search query is not present them make an api call and update in my cache
    //for update use dispatch and action
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-4 w-full mb-4 shadow-lg sticky top-0 z-[9999] bg-white">
      {/*First Section*/}
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          alt="hamburger-logo"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
            alt="youtube-logo"
          />
        </a>
      </div>

      {/*Second Section*/}

      <div className="px-10 col-span-10">
        <div>
          <input
            className="w-1/2 px-5 p-2 rounded-l-full border border-black"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 py-2 px-5 rounded-r-full bg-gray-100">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        {showSuggestions && (
          <div className="px-5 py-2 fixed shadow w-[36rem] bg-white border-gray-100  rounded-lg">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="shadow-sm py-2 px-3 hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/*Third Section*/}
      <div className=" flex justify-between">
        <div className="flex flex-col justify-center px-2">
          <FontAwesomeIcon className="" icon={faVideo} />
        </div>
        <div className="flex flex-col justify-center px-2">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <div className="flex flex-col justify-center  mx-2">
          <img
            className="rounded-full h-8"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAZlBMVEX///8AAAD6+vqamprs7Oyfn58ODg7Hx8fMzMx5eXlra2vp6enW1ta5ubkxMTF8fHylpaXc3NxNTU0pKSmDg4Pi4uI6OjqUlJRSUlKtra1lZWVcXFyLi4vy8vJDQ0NycnIiIiIYGBgD4NsoAAAEwElEQVRoge1bWZuiMBAknMolOoKOgsf//5Mr47iGXF1JcN0H65UvqRC609WdJgg++OCD/xZh3JZZ1SRRlDRVVrZx+K94syjf1CnjkNabPMpevYJwsdszLfa7xev4Fys98QOrxSuYi+SLph7xlRQzU5fLlKZ9IF2WM1K3Z5z5jnM7E3WxtaUesZ1l8xMX6hGJN3Vbu3IzVnvufeNOPaLxoI5zP27G8tiVe935cjPWrd24M3/qEZkL9/c83Ix923Pv5uJmbPdGbmv2Wbkt2Wf73g9YfPfF3NyMwWF+PT83Y6C/xzOcLTI67KzzPlPVyBFuz1iiBxBl2ldxM0ZHWI/4TaGmuJ11CwJC2xTwRPVhV5XrdVntDvhmmXUdqhUPGec5cXYAh21N3KC1naUTYw2Ka5PNQVNclEfl4gItW89dIuNzTTIYQoeTPpdZAqNX+rUDeSRb6gYXQD6mHQwuPtUZPODjRxN3EBzpGXS+TufAFyIBK2ir+1KPBCREZeYOgoqeQy0raHshNn0EvfFKiw1dFz0BsH0qV6WHkVFpBH3Qq16hJ0dFCHlETtPLg0JDjesXkAak1ede3veYHMQQ7iCg55GlJJ2TbjDyDTmRnLfS38p4sj5Bn7Gy7dAxCbI35C0kER3SuwVWl+gIsREtLqb9c7Y3r0WLa+lwqvBPFejzIhXFFCBiDhg5ICZFOQNUfzTBUARQnBZ9DYiFbEC4B2AiMTIj6SEZzdG3EFNGJE0CwjmkpCSnpR2EUdnOD6B8S3RaiBxwNtrRFORQdio5qATguGDytmP1CNLVsYxRNDjESBl5xEIfT3YbtMRsdDfwDaRDBsoRRxgULFw7FI9XzFJUy7bePNlugZD6gKaKi9eKpZAKiInnYMXWLyyqWJKYsKs77rPJ+DCjdTcHuRYJeskD3TZrh9sKwqHNtpbFWtlf7a9z0m5/PO47ixveX8gmCyQNc0FOGoB0aSYo0iXQVU6Hw8n2iQCVqwLnU50Uo40VjeSXm+b+JAE8TnVGksWBa/RXxIXZmWOpz0/PG6IrNY+yjkeURfKpjhnKql/l+aqvyqmwLIgTQ13IM+57anElmhm9TxOZDIr7CMnmBwaDitSpf72UAjOlJ/RSTpduasufDt0PuhfRlj91eT2ULIjQqBp9hUEtZ5y4deyG9h1Vsd+RW81uKParrjnAkoAKiihtFP7SBY9pqSSkjTRe8EipVmfl3yIGUWUQyZ7gIp7tXYIFky47CUseH/yOyWenC8e8zZ28uwpDPsQDrVJcyujsZU9w/gY1Sj1Dol04UYELMdDlPd+2oLvAQ8Fd9IFtC3zJHCrD6MGFVrhBi9Pwnce7h5ybW2gRrkmnduwpu20g57VWzVmcjk5doxqnDjyao7YOWx/yUcKrLexkvfXrkw+30Jy1tROQk+Do0IwnSOk0gfc+TCZa0LHzetqAWX9jVefvSWhybcCUWk+7iCy+FtE0hLu3ngZyYTKvDK8/VGKm5NN0G6jajY+JUmGUiZSm+LYbB2r5X/dNVbbxcEPcllXTqzJj/0brQN9inl4vN1w1ac48LebBW5vrR7zxt4IRb/yh4gfv+5XkB+GiN/1E07/wJ5o7/9t+H3qu4D0/Tn3wwQcu+AOPijz5B8KHaAAAAABJRU5ErkJggg=="
          />
        </div>
      </div>
    </div>
  );
};

export default Head;
