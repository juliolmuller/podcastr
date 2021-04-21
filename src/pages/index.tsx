import querystring from 'querystring'
import { GetStaticProps } from 'next'

type HomeProps = {
  podcasts: Podcast[]
}

function Home({ podcasts }: HomeProps) {
  return (
    <>
      <h1>Hello, there!</h1>
      {podcasts.map((podcast) => (
        <p>{podcast.title}</p>
      ))}
    </>
  )
}

const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const SECONDS_TO_REVALIDATE = 300
  const params = querystring.stringify({
    _limit: 12,
    _sort: 'published_at',
    _order: 'desc',
  })
  const response = await fetch(`${process.env.NEXT_PUBLIC_PODCAST_API}/podcasts?${params}`)
  const podcasts = await response.json()

  return {
    props: { podcasts },
    revalidate: SECONDS_TO_REVALIDATE,
  }
}

export {
  Home as default,
  getStaticProps,
}
