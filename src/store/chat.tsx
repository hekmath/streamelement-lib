import { proxy } from 'valtio';
import tmi from 'tmi.js';

import { parseEmotes, parseBadges } from 'emotettv';
import type { BadgeIDs, BadgeVersion } from 'emotettv/dist/badges/badges.types';
import type { EmotePositions, Word } from 'emotettv/dist/emotes/emotes.types';
import React from 'react';
import { ProunounType } from './pronouns';
import { getTwitchUserDetails } from '../utils';

const BYPASS_USER = ['19264788']; // NightBot

export interface User {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: Date;
}

export interface Message {
  displayName: string;
  words: Word[];
  badges: BadgeVersion[];
  user: Partial<User> | null;
  pronoun: ProunounType | null;
}

export const chat = proxy<{
  messages: Message[];
  connected: boolean;
  ref: React.ElementRef<'div'> | null;
}>({
  messages: [],
  connected: false,
  ref: null,
});

interface ChatSettings {
  withUser?: boolean;
  withPronoun?: boolean;
}

interface InitializeChat {
  channelName: string;
  channelId: string;
  settings: ChatSettings;
}

export const initalizeChat = async ({
  channelName,
  channelId,
  settings = { withPronoun: false, withUser: false },
}: InitializeChat) => {
  const { withPronoun, withUser } = settings;

  const client = new tmi.client({
    connection: {
      reconnect: true,
    },
    channels: [channelName],
  });

  client.on('connected', () => {
    console.log('Successfully Connected!');
    chat.connected = true;
  });

  client.on('message', async (_, tags, message) => {
    const parsedMessage = await parseEmotes(
      message,
      tags.emotes as EmotePositions,
      channelId
    );

    let userPronoun: ProunounType | null = null;

    if (withPronoun) {
      const pronounResponse = await fetch(
        `https://pronouns.alejo.io/api/users/${tags['display-name']}`
      );
      const pronouns = await pronounResponse.json();

      if (pronouns.length > 0) {
        userPronoun = pronouns[0];
      }
    }

    let chatUser: User | null = null;
    if (withUser) {
      try {
        chatUser = await getTwitchUserDetails(tags['display-name'] as string);
      } catch (error) {
        chatUser = null;
      }
    }

    const parsedBadges = await parseBadges(tags.badges as BadgeIDs, channelId);

    const words = parsedMessage.toWords();
    const badges = parsedBadges.toBasicArray();

    if (BYPASS_USER.includes(tags['user-id'] as string)) return;

    chat.messages.push({
      displayName: tags['display-name'] || '',
      words,
      badges,
      user: chatUser,
      pronoun: userPronoun,
    });
  });

  if (!chat.connected) {
    chat.messages = [];
    chat.connected = true;
    client.connect();
  }

  return {
    disconnect: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (chat.messages = []), client.disconnect();
    },
  };
};
