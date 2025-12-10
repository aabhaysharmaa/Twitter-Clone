"use client";

import Image from "next/image";
import Avatar from "./Avatar";
import useUser from "@/hooks/useUser";

interface UserHeroProps {
  userId: string;
}




const UserHero = ({ userId }: UserHeroProps) => {

  const { data: user } = useUser(userId)

  return (
    <div className="bg-neutral-700 h-50 relative">
      <Image
        src={user?.coverImage || "/images/4.jpeg"}
        alt="Hero Image"
        fill
        className="object-cover"
      />
      <div className="absolute px-5 pb-5 -bottom-20">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;
