import React, { useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  ScaleFade,
  Spacer,
  Grid,
  GridItem,
  keyframes,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import { ChatSettings, Message } from '../../store/chat';
import { pronounsList } from '../../store/pronouns';
import { dividerUrl, starsUrl } from './assets';
import { truncateWords } from '../../utils';

const pulse = keyframes`
  from { transform: scale(0.9); }
  to { transform: scale(1.0);  }
`;

const bright = keyframes`
  from { filter: brightness(0.4); }
  to { filter: brightness(1.8); }
`;

interface ChatProps extends Message {
  settings: ChatSettings;
}

export const HolloweenChat = React.forwardRef<HTMLDivElement, ChatProps>(
  ({ displayName, words, badges, pronoun, settings }, ref) => {
    const { wordLength } = settings;

    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!chatRef.current) return;

      chatRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, []);
    const prefersReducedMotion = usePrefersReducedMotion();
    const pulseAnimation = prefersReducedMotion
      ? undefined
      : `${pulse} infinite 3s linear`;

    const brightnessAnimation = prefersReducedMotion
      ? undefined
      : `${bright} infinite 3s linear`;

    const { remainingWords, truncatedWords } = truncateWords(words, wordLength);

    return (
      <ScaleFade ref={ref} in>
        <Grid gridTemplateColumns="40px 1fr 40px" alignItems="center">
          <GridItem />
          <GridItem>
            <Flex gap="1" py="2" fontSize="xl" alignItems="center">
              {badges.map((badge, index) => (
                <Image key={index} src={badge.image_url_1x} alt={badge.title} />
              ))}
              <Text
                textShadow="0 0 4px #E27739,
                            0 0 6px #E27739,
                            0 0 13px #E27739"
                textTransform="uppercase"
                color="#E27739"
                fontFamily="IM Fell English"
                fontWeight="bold"
              >
                {displayName}
              </Text>
              <Spacer />
              {pronoun && (
                <Text
                  textShadow="0 0 4px #E27739,
                            0 0 6px #E27739,
                            0 0 13px #E27739"
                  textTransform="uppercase"
                  color="#E27739"
                  fontFamily="IM Fell English"
                  fontWeight="bold"
                >
                  {
                    pronounsList.find((p) => p.name === pronoun.pronoun_id)
                      ?.display
                  }
                </Text>
              )}
            </Flex>
            <Flex
              ref={chatRef}
              gap="2"
              padding="1"
              border="3px solid #E27739"
              borderRadius="md"
              boxShadow="0px 0px 10px #E27739"
              position="relative"
            >
              <Box>
                <Flex
                  shadow="lgs"
                  lineHeight="tall"
                  display="flex"
                  alignItems="center"
                  fontWeight="bold"
                  color="white"
                  borderRadius="3xl"
                  p="4"
                  flexWrap="wrap"
                  gap="1"
                >
                  {truncatedWords.map(({ emote, text }, index) =>
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
                        fontFamily="IM Fell English"
                        fontWeight="extrabold"
                        fontSize="xl"
                        wordBreak="break-all"
                        textShadow="md"
                        color="rgb(188, 170, 142)"
                      >
                        {index === truncatedWords.length - 1 &&
                        Boolean(remainingWords)
                          ? `${text}...`
                          : text}
                      </Text>
                    )
                  )}
                </Flex>
                <GridItem
                  backgroundImage={starsUrl}
                  width="50px"
                  height="50px"
                  position="absolute"
                  animation={brightnessAnimation}
                  top="50%"
                  left="-50px"
                  transform="translateY(-50%);"
                  css={{ animationDirection: 'alternate' }}
                />
                <GridItem
                  backgroundImage={starsUrl}
                  width="50px"
                  height="50px"
                  animation={brightnessAnimation}
                  position="absolute"
                  top="50%"
                  right="-50px"
                  transform="translateY(-50%);"
                  css={{ animationDirection: 'alternate' }}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem />
        </Grid>
        <Image
          src={dividerUrl}
          mx="auto"
          my="1"
          height="40px"
          animation={pulseAnimation}
          css={{ animationDirection: 'alternate' }}
        />
      </ScaleFade>
    );
  }
);

HolloweenChat.displayName = 'Chat';
