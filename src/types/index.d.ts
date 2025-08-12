export interface RawPodcast {
  description: string;
  file: {
    duration: number;
    type: string;
    url: string;
  };
  id: string;
  members: string;
  published_at: string;
  thumbnail: string;
  title: string;
}

export interface Podcast {
  description: string;
  duration: number;
  durationAsString: string;
  id: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  title: string;
  url: string;
}
