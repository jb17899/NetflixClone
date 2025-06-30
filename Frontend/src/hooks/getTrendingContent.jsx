import React,{use, useEffect,useState} from 'react'
import {useContentStore} from '../store/content';
import axios from 'axios';

const getTrendingContent = () => {
   const [trendingContent, setTrendingContent] = useState(null);
  const {contentType} = useContentStore();
  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
      const response = await axios.get(`/api/v1/${contentType}/trending`, {
        withCredentials: true
      });
        setTrendingContent(response.data);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };
    fetchTrendingContent();
  }, [contentType]);
return trendingContent;
}

export default getTrendingContent
