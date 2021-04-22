
export interface RawPodcast {
  id: number
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
  id: number
  title: string
  members: string
  thumbnail: string
  description: string
  publishedAt: string
  durationAsString: string
  duration: number
  url: string
}
