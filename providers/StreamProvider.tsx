import createContextHook from "@nkzw/create-context-hook";
import { useState } from "react";

interface Stream {
  id: string;
  title: string;
  streamer: string;
  category: string;
  viewers: string;
  thumbnail: string;
  isLive: boolean;
  isCoHost: boolean;
  description: string;
}

interface Category {
  id: string;
  name: string;
  streamCount: number;
  colors: string[];
}

export const [StreamProvider, useStreams] = createContextHook(() => {
  const gen = (cat: string, count: number, prefix: string): Stream[] => {
    const items: Stream[] = [];
    for (let i = 1; i <= count; i++) {
      const id = `${prefix}-${i}`;
      items.push({
        id,
        title: `${cat} Stream #${i}`,
        streamer: `${cat.replace(/\s+/g, '')}Host${i}`,
        category: cat,
        viewers: `${(Math.random() * 20 + 1).toFixed(1)}K`,
        thumbnail: `https://picsum.photos/seed/${encodeURIComponent(prefix + '-' + i)}/400/225`,
        isLive: true,
        isCoHost: Math.random() > 0.7,
        description: `Hanging out in ${cat}. Episode ${i}. Join the fun!`,
      });
    }
    return items;
  };

  const base: Stream[] = [
    ...gen('Gaming', 10, 'game'),
    ...gen('Just chatting', 10, 'chat'),
    ...gen('IRL', 10, 'irl'),
    ...gen('Action', 10, 'action'),
  ];

  const [liveStreams] = useState<Stream[]>(base);

  const [categories] = useState<Category[]>([
    { id: '1', name: 'Gaming', streamCount: 234, colors: ['#ff006e', '#8338ec'] },
    { id: '2', name: 'Just chatting', streamCount: 189, colors: ['#3a86ff', '#8338ec'] },
    { id: '3', name: 'IRL', streamCount: 120, colors: ['#06ffa5', '#00b4d8'] },
    { id: '4', name: 'Action', streamCount: 98, colors: ['#ffbe0b', '#fb5607'] },
  ]);

  const [trendingTags] = useState<string[]>([
    "gaming",
    "chatting",
    "music",
    "art",
    "cooking",
    "sports",
    "education",
    "technology",
    "fitness",
    "travel",
  ]);

  const getStreamById = (id: string) => {
    return liveStreams.find((stream) => stream.id === id);
  };

  return {
    liveStreams,
    categories,
    trendingTags,
    getStreamById,
  };
});