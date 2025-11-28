import { useCallback } from 'react';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AvatarProps {
  userId?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  isHover?: boolean
}

const Avatar = ({
  userId,
  isLarge,
  hasBorder,
  isHover
}: AvatarProps) => {
  const router = useRouter();

  const { data } = useUser(userId);
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      if (!userId) return;
      router.push(`/users/${userId}`);
    },
    [router, userId]
  );
  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full  transition cursor-pointer relative
        ${isHover && "hover:opacity-80"}
      `}
      onClick={onClick}
    >
      <Image
        src={data?.profileImage || '/default.jpeg'}
        alt="Avatar"
        fill

        className="rounded-full object-cover"
        sizes={isLarge ? "128px" : "48px"}
      />
    </div>
  );
};

export default Avatar;
