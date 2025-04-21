import { type Podcast, type RawPodcast } from '../../types';
import { convertDateToFriendlyString, convertSecondsToTimeString } from '../../utils/date-time';

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
  };
}

export default transformPodcast;
