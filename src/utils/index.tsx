import { Word } from 'emotettv/dist/emotes/emotes.types';
import { User } from '../store/chat';

// Import dependencies
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

export async function getTwitchUserDetails(
  channelName: string
): Promise<User | null> {
  let chatUser: User | null = null;

  const { data } = await api.get(
    `https://anime-chat-brown.vercel.app/api/users/${channelName}`
  );

  try {
    const { users } = data;
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

export async function getTwitchUserPronouns(username: string) {
  const { data } = await api.get(
    `https://pronouns.alejo.io/api/users/${username}`
  );
  return data;
}
