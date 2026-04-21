import type { FriendExchangeConfig, FriendLink, FriendsDataConfig } from "../types/config";
import friendsData from "../data/friends.json";

const rawFriendsData = friendsData as FriendsDataConfig;

export const friendsConfig: FriendLink[] = (rawFriendsData.items ?? []) as FriendLink[];
export const friendExchangeConfig: FriendExchangeConfig = rawFriendsData.exchange ?? {};

export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight);
};

export const getFriendExchangeConfig = (): FriendExchangeConfig => friendExchangeConfig;
