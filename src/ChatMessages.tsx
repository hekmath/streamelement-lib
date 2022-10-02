import { Box } from '@chakra-ui/react';
import { useSnapshot } from 'valtio';
import { chat, Message } from './store/chat';
import { HolloweenChat } from './component/chats/holloween';

export const ChatMessages = () => {
  const snap = useSnapshot(chat);

  return (
    <Box
      width="692px"
      maxWidth="600px"
      height="lg"
      maxH="lg"
      overflowY="scroll"
      overflowX="hidden"
      p="5"
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        '&::-webkit-scrollbar-track': {
          width: '0px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'none',
          borderRadius: 'none',
        },
      }}
    >
      {snap.messages.map((message, index) => (
        <HolloweenChat key={index} {...(message as Message)} />
      ))}
    </Box>
  );
};
