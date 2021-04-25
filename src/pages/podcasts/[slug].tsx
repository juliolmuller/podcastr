import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Podcast } from '../../types'
import { usePlayer } from '../../hooks'
import api from '../../services/api'
import styles from './styles.module.scss'

type PodcastDetailsProps = {
  podcast: Podcast
}

function PodcastDetails({ podcast }: PodcastDetailsProps) {
  const { addToPlaylist } = usePlayer<Podcast>()

  return (
    <article className={styles.container}>
      <Head>
        <title>{podcast.title} | PodShare</title>
      </Head>

      <div className={styles.thumbnail}>
        <Link href="/">
          <button type="button" title="Voltar">
            <img src="/img/arrow-left.svg" alt="voltar" />
          </button>
        </Link>
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

const getStaticPaths: GetStaticPaths = async () => {
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

const getStaticProps: GetStaticProps<PodcastDetailsProps> = async ({ params }) => {
  const SECONDS_TO_REVALIDATE = 86400 // 24 hours
  const { data } = await api.get<Podcast>(`/podcasts/${params.slug}`)

  return {
    revalidate: SECONDS_TO_REVALIDATE,
    props: {
      podcast: data,
    },
  }
}

export {
  PodcastDetails as default,
  getStaticPaths,
  getStaticProps,
}
