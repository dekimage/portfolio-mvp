"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ChevronLeft } from "lucide-react";

import roomImg1 from "./assets/room-1.png";

import bookIcon from "./assets/bookIcon.png";

import Image from "next/image";
import { items, rooms } from "./data";

const StoryPage = ({ room }) => {
  const changePage = (page) => {
    console.log(page);
  };
  const { name, description, options, page } = room;
  return (
    <div>
      <Card className="w-[90%]  min-h-[70vh] m-8 flex flex-col">
        <div className="w-full h-full flex flex-grow">
          <div className="w-1/2 flex border p-8 flex flex-col">
            <Button className="w-fit mb-4" variant="outline">
              <ChevronLeft size={20} />
              Back
            </Button>
            <div className="flex gap-1 text-2xl">
              <Image src={bookIcon} alt="book" height={24} width={24} />
              {page}
            </div>
            <div className="text-2xl mb-4 flex gap-2">{name}</div>

            <div className="text-sm mb-12">{description}</div>

            <div className="flex flex-col gap-8">
              {options.map((option, index) => (
                <div
                  className="flex border rounded  items-center justify-between cursor-pointer hover:shadow-lg transition duration-300 ease-in-out"
                  key={index}
                  onClick={() => changePage(option.page)}
                >
                  <div className="bg-yellow-200 w-6 h-full min-h-[60px]"></div>
                  <div className="flex w-full pl-2">{option.label}</div>
                  <div className="flex gap-1 bg-yellow-200 h-full w-24 justify-center items-center px-2">
                    {/* <BookOpen /> */}
                    <Image src={bookIcon} alt="book" height={20} width={20} />
                    {option.page}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <Image src={roomImg1} alt="item" height={600} width={600} />
          </div>
        </div>

        <div className="w-full h-1/4 flex items-center border gap-2 p-4">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="w-20 h-20 bg-slate-200 cursor-pointer">
              <Image
                src={items[index].img}
                alt="item"
                height={100}
                width={100}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const StoryRpgPage = () => {
  return <StoryPage room={rooms[0]} />;
};

export default StoryRpgPage;
