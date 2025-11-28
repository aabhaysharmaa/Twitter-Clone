"use client";
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Modal from './Modal';
import Input from './Input';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    setProfileImage(currentUser?.profileImage || "")
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUserName(currentUser?.username || "")
    setBio(currentUser?.bio || "");
  }, [currentUser])

  const router = useRouter();
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/edit/${currentUser?.id}`, {
        name,
        username,
        bio,
        profileImage,
        coverImage
      });
      mutateFetchedUser();
      mutateCurrentUser()
      toast.success("Updated");
      editModal.onClose();
      router.push(`/users/${currentUser?.id}`);
    } catch (error) {
      toast.error("Something  went Wrong !")
      console.log("Error in Client Site : ", (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [username, name, bio, profileImage, coverImage, editModal, currentUser?.id, mutateFetchedUser, router, mutateCurrentUser]);

  const contentBody = (
    <div className="flex flex-col gap-4">
      <ImageUpload value={profileImage} disabled={isLoading} onChange={(image: string) => setProfileImage(image)} label="Upload profile Image" />
      <ImageUpload value={coverImage} disabled={isLoading} onChange={(image: string) => setCoverImage(image)} label="Upload Cover Image" />
      <Input onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} type='text' placeholder='name' />
      <Input onChange={(e) => setUserName(e.target.value)} value={username} disabled={isLoading} type='text' placeholder='username' />
      <Input onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} type='text' placeholder='Bio' />
    </div>

  )

  return (
    <Modal onSubmit={onSubmit} isOpen={editModal.isOpen} body={contentBody} isLoading={isLoading} disabled={isLoading} actionLabel='Save'  onClose={editModal.onClose} title='Edit your profile' />
  )
}

export default EditModal;