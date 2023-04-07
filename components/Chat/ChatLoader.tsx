import { IconDots, IconRobot} from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group border-b border-black/10 bg-gray-50 text-gray-800 dark:border-gray-900/50 dark:bg-[#141c32] dark:text-gray-100"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="flex gap-4 p-4 m-auto text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <IconRobot size={30} style={{ color: 'white', backgroundColor: '#0aa62a', borderRadius: '6px'}}/>
        <IconDots className="animate-pulse" />
      </div>
    </div>
  );
};
