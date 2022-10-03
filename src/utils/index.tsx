import { Word } from 'emotettv/dist/emotes/emotes.types';
import { User } from '../store/chat';

export async function getTwitchUserDetails(
  channelName: string
): Promise<User | null> {
  let chatUser: User | null = null;

  const userResponse = await fetch(
    `https://anime-chat-brown.vercel.app/api/users/${channelName}`
  );

  try {
    const { users } = await userResponse.json();
    chatUser = users[0];
  } catch (error) {
    chatUser = null;
  }

  return chatUser;
}

export function truncateWords(words: Word[], limit: number = 30) {
  const truncatedWords = words.slice(0, limit);
  const remainingWords = words.length - truncatedWords.length;

  return { truncatedWords, remainingWords };
}
