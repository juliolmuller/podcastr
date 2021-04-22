import { GetStaticProps } from 'next'
import api from '../services/api'
import { Podcast } from '../types'

type HomeProps = {
  podcasts: Podcast[]
}

function Home({ podcasts }: HomeProps) {
  return (
    <>
      <h1>Hello, there!</h1>
      {podcasts.map((podcast) => (
        <p key={podcast.id}>{podcast.publishedAt} {podcast.durationAsString}</p>
      ))}
    </>
  )
}

const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const SECONDS_TO_REVALIDATE = 300
  const { data } = await api.get<Podcast[]>('/podcasts', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  return {
    props: { podcasts: data },
    revalidate: SECONDS_TO_REVALIDATE,
  }
}

export {
  Home as default,
  getStaticProps,
}
