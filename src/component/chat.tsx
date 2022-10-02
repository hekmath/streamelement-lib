import React, { useEffect, useRef } from 'react';
import { Box, Flex, Text, Image, ScaleFade, Avatar } from '@chakra-ui/react';
import { Message } from '../store/chat';

export const Chat = React.forwardRef<HTMLDivElement, Message>(
  ({ displayName, words, badges, user }, ref) => {
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!chatRef.current) return;

      chatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, []);

    return (
      <ScaleFade ref={ref} in>
        <Flex
          mt="6"
          position="relative"
          ref={chatRef}
          gap="2"
          padding="1"
          border="3px solid #E27739"
          boxShadow="0px 0px 10px #E27739"
        >
          {user && (
            <Avatar
              src={
                user.profile_image_url?.includes('user-default-pictures')
                  ? ''
                  : user.profile_image_url
              }
              name={user.display_name}
              size="lg"
              border="1px"
              borderColor="white"
            />
          )}

          <Box />
          <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAA5CAYAAAARFYoNAAAACXBIWXMAAGGoAABhqAEdIFWAAAABDElEQVQokV2SwZKDIBBEH2iiUXPZ///KPawRgdlDps1UrJoDPd1vAElmloDM+7MRSMAEdKCO3r0BTY7sjgb0KHSgjcAILC6cIzAAG2BRWH3aocjqjV3C5uA/RZ7ADPxqUwvwAzxzYGzAmsOUB7DIMXnsIcfNHXMOp52BSUIG7hKSxwYgqyshyaF7zTksAEwCfh9dQvdK0XFFzIsYMaDKgf+TFgUcWq/5Hqk5LC5Hihw5BO0x0r4ZVZEOnCqN7d9jWxTULWI04IgMC9ASx5bIKF5n3MeOP7oGvHi/gpI9/1IsOu6Cnr6PHX+n3R2DoGJkMaJwCFpcuCLFL7tGRxJDh7scOosBNZnZwOedpX8NPIc1vHWHpQAAAABJRU5ErkJggg==" />
          <Box>
            <Flex px="3" gap="1" fontSize="xl" alignItems="center">
              <Text
                textShadow="lg"
                textTransform="capitalize"
                color="rgb(184, 43, 168)"
                fontFamily="Edu SA Beginner"
                fontWeight="bold"
              >
                {displayName}
              </Text>
              {badges.map((badge, index) => (
                <Image key={index} src={badge.image_url_1x} alt={badge.title} />
              ))}
            </Flex>
            <Flex
              shadow="lgs"
              lineHeight="tall"
              display="flex"
              alignItems="center"
              fontWeight="bold"
              color="white"
              fontSize="xl"
              borderRadius="3xl"
              p="4"
              flexWrap="wrap"
              gap="1"
            >
              {words.map(({ emote, text }, index) =>
                emote ? (
                  <Box
                    key={index}
                    px="1"
                    display="inline"
                    width="25px"
                    height="25px"
                    minWidth="25px"
                    backgroundImage={emote.url[0]}
                    mx="1"
                  />
                ) : (
                  <Text
                    key={index}
                    fontFamily="Edu SA Beginner"
                    fontWeight="extrabold"
                    fontSize="2xl"
                    wordBreak="break-all"
                    textShadow="md"
                  >
                    {text}
                  </Text>
                )
              )}
            </Flex>
          </Box>
        </Flex>
      </ScaleFade>
    );
  }
);

Chat.displayName = 'Chat';
