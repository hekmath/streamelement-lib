import { useEffect, useRef } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { initalizeChat } from './store/chat';
import { extendTheme } from '@chakra-ui/react';
import { ChatMessages } from './ChatMessages';
import { getTwitchUserDetails } from './utils';

export const theme = extendTheme({
  components: {
    Divider: {
      defaultProps: { size: 'md' },
      sizes: {
        lg: { borderWidth: '4px' },
        md: { borderWidth: '2px' },
        sm: { borderWidth: '1px' },
      },
    },
  },
});

const App = () => {
  const socketRef = useRef<Function | null>(null);

  useEffect(() => {
    // window.addEventListener('onWidgetLoad', async function (obj: any) {
    //   const fieldData = obj.detail.fieldData;
    //   const channelName = fieldData.channelName ?? 'hollo_o';
    //   const channelId = fieldData.userId ?? '229334537';
    //   const { disconnect } = await initalizeChat({
    //     channelName,
    //     channelId,
    //   });
    //   socketRef.current = disconnect;
    // });

    // DEBUG
    async function connectToStream() {
      const twitchUser = await getTwitchUserDetails('sweetdreams');

      const { disconnect } = await initalizeChat({
        channelId: twitchUser ? twitchUser.id : '229334537',
        channelName: 'sweetdreams',
        settings: { withPronoun: true, withUser: false },
      });
      socketRef.current = disconnect;
    }

    if (socketRef.current === null) {
      connectToStream();
    }
    // END DEBUG

    return () => {
      const disconnect = socketRef.current;
      if (!disconnect) return;
      disconnect();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ChatMessages />
    </ChakraProvider>
  );
};

export default App;
