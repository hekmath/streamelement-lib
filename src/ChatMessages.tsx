import { Box } from '@chakra-ui/react';
import { useSnapshot } from 'valtio';
import { chat, Message } from './store/chat';
import { HolloweenChat } from './component/chats/holloween';

export const ChatMessages = () => {
  const snap = useSnapshot(chat);
  const { settings, messages } = snap;

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
      {messages.map((message, index) => (
        <HolloweenChat
          settings={settings}
          key={index}
          {...(message as Message)}
        />
      ))}
    </Box>
  );
};
