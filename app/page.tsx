import Form from '@/components/Form';
import Header from '@/components/Header';
import PostFeed from '@/components/PostFeed';

import React from 'react'

const Home = () => {
  return (
    <>
      <Header showBackArrow label='Home' />
      <Form placeholder={`What's happening?`} />
      <PostFeed/>
    </>
  )
}

export default Home;
