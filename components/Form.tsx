import useCurrentUser from '@/hooks/useCurrentUser';
import LoginModalStore from '@/hooks/useloginModal';
import usePosts from '@/hooks/usePosts';
import RegisterModalStore from '@/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';
interface FormProps {
  placeholder: string
  isComment?: boolean,
  postId?: string,
}
const Form = ({ placeholder, postId, isComment }: FormProps) => {
  const loginModal = LoginModalStore();
  const registerModal = RegisterModalStore();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    const url = isComment ? `/api/comments/${postId}` : "api/posts";
    try {
      setIsLoading(true)
      await axios.post(url, { content })
      toast.success("Tweet created")
      setContent("")
      mutatePosts()
    } catch (error) {
      console.log((error as Error).message)
      toast.error("Something Went Wrong!")
    } finally {
      setIsLoading(false)
    }
  }, [mutatePosts, content, isComment, postId])
  return (
    <div className='border-b border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className=" flex flex-start gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              placeholder={placeholder}
              disabled={isLoading}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="peer w-full mt-2 p-3 text-[20px]  text-white placeholder-neutral-500 bg-transparent overflow-hidden outline-none disabled:opacity-80 resize-none"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              style={{ overflow: "hidden" }}
            />
            <hr className='text-neutral-800 opacity-0 peer-hover:opacity-100 w-full transition' />
            <div className="flex  flex-row items-center justify-end   mt-4 ">
              <Button label='Tweet' disabled={isLoading || !content} onClick={onSubmit} ></Button>
            </div>
          </div>
        </div>

      ) : (
        <div className="py-8">
          <h1 className='text-center text-2xl mb-4 font-bold '>Welcome To Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button secondary label='register' onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
