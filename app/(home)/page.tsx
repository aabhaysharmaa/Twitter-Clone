"use client";
import Form from "@/components/Form";
import Header from "@/components/Header"
import PostFeed from "@/components/PostFeed";



const Home = () => {
  return (
    <>
      <Header label="Home" showBackArrow />
      <Form placeholder="What's happening?" />
      <PostFeed  />
    </>
  )
}

export default Home