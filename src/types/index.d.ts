
declare interface Podcast {
  id: number
  title: string
  members: string
  published_at: Date
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: number
  }
}
