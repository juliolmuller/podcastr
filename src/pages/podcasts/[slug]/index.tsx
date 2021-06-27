/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { usePlayer } from '~/hooks'
import api from '~/services/api'
import styles from './styles.module.scss'

import type { GetStaticPaths, GetStaticProps } from 'next'
import type { Podcast } from '~/types'

type PodcastDetailsProps = {
  podcast: Podcast
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<Podcast[]>('/podcasts')
  const paths = data.map((podcast) => ({
    params: {
      slug: podcast.id,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PodcastDetailsProps> = async ({ params }) => {
  const SECONDS_TO_REVALIDATE = 86400 // 24 hours
  const { data } = await api.get<Podcast>(`/podcasts/${params.slug}`)

  return {
    revalidate: SECONDS_TO_REVALIDATE,
    props: {
      podcast: data,
    },
  }
}

function PodcastDetailsPage({ podcast }: PodcastDetailsProps) {
  const { addToPlaylist } = usePlayer<Podcast>()
  const router = useRouter()

  return (
    <article className={styles.container}>
      <Head>
        <title>{podcast.title} | PodShare</title>
      </Head>

      <div className={styles.thumbnail}>
        <button
          type="button"
          title="Voltar"
          onClick={router.back}
        >
          <img src="/img/arrow-left.svg" alt="voltar" />
        </button>
        <Image
          src={podcast.thumbnail}
          alt="capa do podcast"
          objectFit="cover"
          height="160"
          width="700"
        />
        <button type="button" title="Tocar" onClick={() => addToPlaylist(podcast, true)}>
          <img src="/img/play.svg" alt="tocar podcast" />
        </button>
      </div>

      <header>
        <h1>{podcast.title}</h1>
        <span>{podcast.members}</span>
        <span>{podcast.publishedAt}</span>
        <span>{podcast.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: podcast.description }}
      />
    </article>
  )
}

export default PodcastDetailsPage
