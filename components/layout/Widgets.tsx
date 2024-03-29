import React from "react";
import { FollowWidget, TrendingWidget } from "../../models/widgets";

import { SearchIcon } from "@heroicons/react/outline";
import Trending from "./Trending";
import Follow from "./Follow";

type WidgetsProps = {
  trendingResults: TrendingWidget[];
  followResults: FollowWidget[];
};

const Widgets = ({ trendingResults, followResults }: WidgetsProps) => {
  if (!trendingResults || !followResults) return <div>Issues with widgets</div>;

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-twitter-white absolute inset-0 pl-11 border border-transparent w-full focus:border-twitter-blue rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-twitter-white space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12 min-w-[260px] mr-5">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-twitter-blue font-light">
          Show more
        </button>
      </div>

      <div className="text-twitter-white space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12 min-w-[260px] mr-5">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <Follow key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-twitter-blue font-light">
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
