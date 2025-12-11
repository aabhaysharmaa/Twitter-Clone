"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser"
import Button from "./Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
interface FormProps {
  postId?: string
  placeholder: string
  isComment?: boolean;
}

const Form = ({ postId, placeholder, isComment }: FormProps) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const { mutate: mutatePost } = usePosts();
  const registerModal = useRegisterModal();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPost = useCallback(async () => {
    const url = isComment ? `/api/comments/${postId}` : "/api/posts"
    setIsLoading(true)
    try {
     await  axios.post(url, { content })
      toast.success("Tweet Created");
      setContent("")
      mutatePost();
    } catch (error) {
      console.log("Error in creating a Post", (error as Error).message)
      toast.error("Something Went Wrong")
    } finally {
      setIsLoading(false)
    }
  }, [isComment, postId, content, mutatePost])


  return (
    <div className="border-b  border-neutral-800 px-5 py-2 ">
      {currentUser ? (
        <div className="flex  gap-4 flex-start">
          <div className="mt-1">
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea className=" peer w-full mt-2  p-3 text-[20px] placeholder-neutral-500 bg-transparent overflow-hidden outline-none disabled:opacity-80 resize-none "
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              style={{ overflow: "hidden" }}
              placeholder={placeholder} disabled={isLoading}
            />
            <hr className="w-full peer-hover:opacity-100 opacity-0  text-neutral-800 transition" />
            <div className={`flex justify-end mt-4`}>
              <Button label="Tweet" disabled={isLoading || !content} onClick={createPost} />
            </div>
          </div>

        </div>) :
        (<div className="py-8 ">
          <h1 className="text-center text-2xl font-bold mb-4">Welcome To Twitter </h1>
          <div className="gap-4 flex  justify-center items-center">
            <Button label="Login" onClick={() => loginModal.onOpen()} />
            <Button label="Register" secondary onClick={() => registerModal.onOpen()} />
          </div>
        </div>)}
    </div>
  )
}

export default Form