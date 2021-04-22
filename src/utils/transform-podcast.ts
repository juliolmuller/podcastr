import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RawPodcast, Podcast } from '../types'

const SECONDS_IN_A_MINUTE = 60
const SECONDS_IN_AN_HOUR = 3600

function convertSecondsToTimeString(numSeconds: number) {
  const hours = Math.floor(numSeconds / SECONDS_IN_AN_HOUR)
  const minutes = Math.floor((numSeconds % SECONDS_IN_AN_HOUR) / SECONDS_IN_A_MINUTE)
  const seconds = numSeconds % SECONDS_IN_A_MINUTE

  const paddedMinutes = minutes.toString().padStart(2, '0')
  const paddedSeconds = seconds.toString().padStart(2, '0')

  return `${hours}:${paddedMinutes}:${paddedSeconds}`
}

function convertDateToFriendlyString(isoDate: string) {
  return format(parseISO(isoDate), 'd MMM yy', {
    locale: ptBR,
  })
}

function transformPodcast(rawPodcast: RawPodcast): Podcast {
  return {
    id: rawPodcast.id,
    title: rawPodcast.title,
    members: rawPodcast.members,
    thumbnail: rawPodcast.thumbnail,
    description: rawPodcast.description,
    publishedAt: convertDateToFriendlyString(rawPodcast.published_at),
    durationAsString: convertSecondsToTimeString(rawPodcast.file.duration),
    duration: rawPodcast.file.duration,
    url: rawPodcast.file.url,
  }
}

export default transformPodcast
