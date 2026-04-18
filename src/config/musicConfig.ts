import musicPlayerData from "../data/music-player.json";
import type { MusicPlayerConfig } from "../types/config";

export const musicPlayerConfig: MusicPlayerConfig =
  musicPlayerData as MusicPlayerConfig;
