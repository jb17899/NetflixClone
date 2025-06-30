import React,{ useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = (props) => {
  const [content, setContent] = React.useState([]);
  const {contentType} = useContentStore();
  const [showArrow, setShowArrow] = React.useState(false);
    useEffect(() => {
    const getContent = async () => {
    try{
      const res = await axios.get(`/api/v1/${contentType}/${props.category}`,{
        withCredentials: true
      });
      setContent(res.data.content);
    }
    catch(err){
      console.error("Error fetching content:", err);
    }
  }
    getContent();
  },[contentType, props.category]);
  const sliderRef = useRef(null);
  const formattedType = contentType == 'movie' ? 'Movies' : 'TV Shows';
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

  return (
    <div
      className='bg-black text-white relative px-5 md:px-20'
      onMouseEnter={() => setShowArrow(true)}
      onMouseLeave={() => setShowArrow(false)}
    >
      <h2 className='mb-4 text-2xl font-bold'>
        {props.category} {formattedType}
      </h2>

      <div
        className='flex space-x-4 overflow-x-scroll scrollbar-hide'
        ref={sliderRef}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
      >
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
            <div className='rounded-lg overflow-hidden'>
              {item.backdrop_path ? (
                <img
                  src={SMALL_IMAGE_BASE_URL + item.backdrop_path}
                  alt='Movie image'
                  className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                
                />
              ) : (
                <div className='w-full h-[140px] bg-gray-800 flex items-center justify-center'>
                  <span className='text-gray-400 text-sm'>No Image</span>
                </div>
              )}
            </div>
            <p className='mt-2 text-center'>{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrow && (
        <>
          <button
            className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
      size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 cursor-pointer
      '
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
      size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 cursor-pointer
      '
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
export default MovieSlider;
