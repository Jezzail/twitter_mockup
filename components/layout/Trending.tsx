import React from "react";

import Image from "next/image";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { TrendingWidget } from "../../models/widgets";

type TrendingProps = {
  result: TrendingWidget;
};

const Trending = ({ result }: TrendingProps) => {
  if (!result) return <div>Issue with Trending</div>;

  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {result.img ? (
        <div className="min-w-[70px]">
          <Image
            src={result.img}
            width={70}
            height={70}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      ) : (
        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-twitter-blue" />
        </div>
      )}
    </div>
  );
};

export default Trending;
