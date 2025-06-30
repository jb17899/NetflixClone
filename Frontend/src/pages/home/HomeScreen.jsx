import React,{useState,useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useAuthStore } from '../../store/authUser';
import { Link } from 'react-router-dom';
import { Play,Info, Import } from 'lucide-react';
import getTrendingContent from '../../hooks/getTrendingContent';
import { LARGE_IMAGE_BASE_URL,MOVIE_CATEGORIES,SMALL_IMAGE_BASE_URL, TV_CATEGORIES } from '../../utils/constants';
import { useContentStore } from '../../store/content';
import MovieSlider from '../../components/MovieSlider';
const HomeScreen = () => {
  const {logout} = useAuthStore();
  const trendingContent = getTrendingContent();
  const contentType = useContentStore();
  const [imageLoading, setImageLoading] = useState(true);
// console.log(tvArray);
if(!trendingContent ) {
  return (
    <div className='h-screen text-white relative'>
      <Navbar/>
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center -z-10 shimmer'/>
    </div>
  )
}
  return (
    <>
    <div className="relative h-screen text-white">
      <Navbar />
      {setImageLoading &&(
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center -z-10 shimmer'/>
      )};
      <img
        src={LARGE_IMAGE_BASE_URL + trendingContent?.content?.backdrop_path || "https://image.tmdb.org/t/p/original/8uO6d3k1b2a5c4e7f9e5b5f5f5f5f5f5.jpg"}
        alt="movie1"
        className="absolute top-0 left-0 w-full h-full object-cover"
        aria-hidden="true"
        onLoad={() => setImageLoading(false)}
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-t from-black/20 via-black/40 to-black/60"
        aria-hidden="true"
      />
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-10 lg:px-32'>
        <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true" />
        <div className='max-w-3xl'>
          <h1 className='mt-4 text-6xl font-extrabold text-balance text-white'>{trendingContent?.content?.original_title||trendingContent?.content?.name}</h1>
          <p className='mt-2 text-lg'>
            {trendingContent?.content?.release_date?.trim().slice(0,4)||2025} |{trendingContent?.content?.adult? "18+": "13+"}
          </p>
          <p className='mt-4 text-lg'>
            {trendingContent?.content?.overview?.substring(0,(trendingContent?.content?.overview.indexOf(".")<200)?trendingContent?.content?.overview.indexOf(".")+1:200)+"..." || "No description available for this movie."}
          </p>
        </div>
        <div className='flex mt-6'>
          <Link to={`/watch/${trendingContent?.content?.id}`} 
          className='bg-white text-black px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition-colors duration-300 mr-4'>
          <Play className='size-6 mr-2 fill-black'/>
          Play
          </Link>
          <Link to={`/info/${trendingContent?.content?.id}`}
          className='bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition-colors duration-300 mr-4'>
          <Info className='size-6 mr-2'/>
          More Info
          </Link>
        </div>
      </div>
    </div>
    <div className='flex flex-col gap-10 bg-black py-10'>
      {contentType.contentType === "movie"?
      MOVIE_CATEGORIES.map((category)=>{
        return <MovieSlider key={category} category={category} />
      })
        :
      TV_CATEGORIES.map((category)=>{
        return <MovieSlider key={category} category={category} />
      })
      }


    </div>
    </>
  )
}

export default HomeScreen
