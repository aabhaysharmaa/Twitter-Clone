"use client";

import useEditModal from "@/hooks/useEditModal";
import Modal from "./Modal";
import Input from "./Input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import ImageUpload from "./imageUpload";
import axios from "axios";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
const EditModal = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [profileImage, setProfilePic] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const editModal = useEditModal();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateUser } = useUser(currentUser?.id);
  useEffect(() => {
    setCoverImage(fetchedUser?.coverImage || "")
    setProfilePic(fetchedUser?.profileImage || "")
    setName(fetchedUser?.name || "")
    setUsername(fetchedUser?.username || "")
    setBio(fetchedUser?.bio || "")
  }, [fetchedUser])

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      await axios.patch(`/api/edit/${fetchedUser?.id}`, {
        name,
        username,
        profileImage,
        coverImage,
        bio
      })
      mutateUser();
      mutateCurrentUser();
      toast.success("Updated")
      editModal.onClose();
    } catch (error) {
      console.log("Error in onSubmit EditModal :", (error as Error).message)
      toast.error("Something Went Wrong!")
      editModal.onClose();
    } finally {
      setIsLoading(false)
    }
  }
  const bodyContent = (
    <div className="gap-4 flex flex-col" >
      <ImageUpload value={profileImage} label="Upload Profile Image" disabled={isLoading} onChange={(image: string) => setProfilePic(image)} />
      <ImageUpload value={coverImage} label="Upload Cover Image " disabled={isLoading} onChange={(image: string) => setCoverImage(image)} />
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
    </div>
  )
  return (
    <Modal onSubmit={onSubmit} isOpen={editModal.isOpen} isLoading={isLoading} body={bodyContent} onClose={editModal.onClose} actionLabel="Save" title={`Edit`} />
  )
}

export default EditModal