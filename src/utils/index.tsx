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
