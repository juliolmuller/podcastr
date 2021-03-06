
export interface RawPodcast {
  id: string
  title: string
  members: string
  thumbnail: string
  description: string
  published_at: string
  file: {
    url: string
    type: string
    duration: number
  }
}

export interface Podcast {
  id: string
  title: string
  members: string
  thumbnail: string
  description: string
  publishedAt: string
  durationAsString: string
  duration: number
  url: string
}
