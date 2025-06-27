import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

const HomePage = () => {
  const user = true;
  return (
    <div>
      {user?<HomeScreen/>:<AuthScreen/>}
    </div>
  )
}

export default HomePage
