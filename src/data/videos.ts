export type EmotionCategory =
  | "joy"
  | "stress"
  | "calm"
  | "sadness"
  | "neutral";

export interface VideoPrompt {
  id: string;
  category: EmotionCategory;
  videoId: string; // The raw YouTube ID
  title: string;
}

export const videoPrompts: VideoPrompt[] = [
  {
    id: "v1_neutral",
    category: "neutral",
    title: "Everyday Scene",
    videoId: "aqz-KE-bpKQ", // Placeholder neutral
  },
  {
    id: "v2_joy",
    category: "joy",
    title: "Uplifting Reaction",
    videoId: "nRDysNZdMvU",
  },
  {
    id: "v3_stress",
    category: "stress",
    title: "Tense Situation",
    videoId: "lBINz0kl0uo",
  },
  {
    id: "v4_calm",
    category: "calm",
    title: "Relaxing Scenery",
    videoId: "vI0rbM7mGqs",
  },
  {
    id: "v5_sadness",
    category: "sadness",
    title: "Somber Moment",
    videoId: "KAu6YZ2jEk4",
  },
];
