import type { ProfileConfig } from "../types/config";
import profileData from "../data/profile.json";

export const profileConfig: ProfileConfig = {
  avatar: profileData.avatar,
  name: profileData.name,
  bio: profileData.bio,
  links: profileData.links as ProfileConfig["links"],
};
