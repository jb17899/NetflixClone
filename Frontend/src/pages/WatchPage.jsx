import React, { use, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';
import { set } from 'mongoose';
import { ChevronLeft,ChevronRight} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import ReactPlayer from 'react-player/youtube';
import {LARGE_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL} from '../utils/constants'
import { Link } from 'react-router-dom';
import WatchPageSkeleton from "../components/Skeletons/WatchPageSkeleton"
function formatReleaseDate(date){
  return new Date(date).toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric"
  });
}


const WatchPage = () => {
    const {id} = useParams();
    const [trailers,setTrailers] = useState([]);
    const [trailerIdx,setTrailerIdx] = useState(0);
    const [loading,setLoading] = useState(true);
    const [content,setContent] = useState({});
    const {contentType} = useContentStore();
    const [similarContent,setSimilarContent] = useState([]);
  const sliderRef = useRef(null);
    const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};


    useEffect(()=>{
      const getTrailers = async()=>{
        try{
        const response = await axios.get(`http://localhost:5000/api/v1/${contentType}/${id}/trailers`,{withCredentials:true});
        setTrailers(response.data.trailers);
        }
        catch(err){
          if(!err.message.includes(200)){
            setTrailers([]);
          }
        }
      }
      getTrailers();
    },[contentType,id]);
    useEffect(()=>{
      const getSimilar = async()=>{
        try{
        const response = await axios.get(`http://localhost:5000/api/v1/${contentType}/${id}/similar`,{withCredentials:true});
        // console.log(response.data);
        setSimilarContent(response.data.similar);
        }
        catch(err){
          if(!err.message.includes(200)){
            setSimilarContent([]);
            console.log(err);
          }
        }
      }
      getSimilar();
    },[contentType,id]);
    useEffect(()=>{ 
      const getContent = async()=>{
        try{
        const response = await axios.get(`http://localhost:5000/api/v1/${contentType}/${id}/details`,{withCredentials:true});
        setContent(response.data.content);
        setLoading(false);
        }
        catch(err){
          if(!err.message.includes(200)){
            setContent(null);

        setLoading(false);
          }
        }
      }
      getContent();
    },[contentType,id]);

    function handlePrev(){
    if(trailerIdx>0){
      setTrailerIdx(trailerIdx-1);} 
    }
    function handleNext(){
      if(trailerIdx<trailers.length-1){
        setTrailerIdx(trailerIdx+1);
      }
    }
    if(loading){
      return (
        <div className='min-h-screen bg-black p-10'>
          <WatchPageSkeleton/>
        </div>
      )
    }
    if (!content || Object.keys(content).length === 0) {
    return (
      <div className='bg-black text-white h-screen'>
        <div className='max-w-6xl mx-auto'>
          <Navbar />
          <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
            <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar/>
        {trailers.length>0 &&
        <div className='flex justify-between items-center mb-4'>
        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer ${trailerIdx===0?'cursor-not-allowed opacity-50':''}`} disabled={trailerIdx==0} onClick={handlePrev}>
         <ChevronLeft size={24}/> 
        </button>
        <button className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer ${trailerIdx===trailers.length-1?'cursor-not-allowed opacity-50':''}`} disabled={trailerIdx==trailers.length-1} onClick={handleNext}>
         <ChevronRight size={24}/> 
        </button>
      </div>}
      <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
        {trailers.length>0 &&
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailers[trailerIdx].key}`}
          width='100%'
          height='100%'
          controls={true}
          playing={true}
          className='rounded-lg'
        />
        }
      {trailers?.length==0 &&
        <div className='text-xl tex-center mt-5 aspect-video flex justify-center items-center'>
          No Trailer Available for 
          <h1 className='font-bold text-red-600'>{content?.title||content?.name}</h1>
        </div>
        }
      </div>
      <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
        <div className='mb-4 text-lg'>
          <h2 className='text-5xl font-bold text-balance'>{content?.title||content?.name}</h2>
          <p className='mt-2 text-lg'>
            {formatReleaseDate(content?.release_date||content?.first_air_date)}|{" "}
            {content?.adult ? (
              <span className='text-red-600'>18+</span>
            ) : (
              <span className='text-green-600'>PG-13</span>
            )}{" "}
          </p>
          <p className='mt-4 text-lg'>{content?.overview}</p>
        </div>
        <img src={LARGE_IMAGE_BASE_URL+content.poster_path} alt="" className='max-h-[600px] rounded-md'/>
      </div>
      {similarContent.length>0&&
      <div className='mt-12 max-w-5xl mx-auto relative'>
        <h3 className='text-3xl font-bold mb-4'>
          Similar Movies/TV Shows
        </h3>
        <div className='flex overflow-x-scroll gap-4 pb-4 group' ref={sliderRef}         style={{
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}>
          {similarContent.map((content) => {
            if(content.poster_path == null)return null;
            return (
            <Link key={content.id} to={`/watch/${content.id}`} className="w-52 flex-none">
              <img src={SMALL_IMAGE_BASE_URL+content.poster_path}
                alt="poster-path"
                className='w-full h-auto rounded-md'/>
              <h4 className='mt-2 text-lg font-semibold'>{content.title||content.name}</h4>
            </Link>
            );
})}
        </div>
                  <button
                    className='absolute top-1/2 -translate-y-[30px] left-2 md:left-14 flex items-center justify-center
              size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 cursor-pointer'
                    onClick={scrollLeft}>
                    <ChevronLeft size={24} />
                  </button>
        
                  <button
                    className='absolute top-1/2 -translate-y-1/2 right-2 md:right-14 flex items-center justify-center
              size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 cursor-pointer
              '
                    onClick={scrollRight}
                  >
                    <ChevronRight size={24} />
                  </button>
      </div>
      }

    </div>
  </div>
  )
}

export default WatchPage
