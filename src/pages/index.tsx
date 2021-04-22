import { GetStaticProps } from 'next'
import Image from 'next/image'
import api from '../services/api'
import { Podcast } from '../types'
import styles from './index.module.scss'

type HomeProps = {
  latestPodcasts: Podcast[]
  additionalPodcasts: Podcast[]
}

function Home({ latestPodcasts, additionalPodcasts }: HomeProps) {
  return (
    <div className={styles.container}>
      <section className={styles.latestPodcasts}>
        <header>
          <h2>Últimos lançamentos</h2>
        </header>
        <ul>
          {latestPodcasts.map((podcast) => (
            <li key={podcast.id}>
              <Image
                src={podcast.thumbnail}
                alt={podcast.title}
                objectFit="cover"
                height="192"
                width="192"
              />

              <div className={styles.podcastDetails}>
                <a href="#">{podcast.title}</a>
                <p title={podcast.members}>{podcast.members}</p>
                <span>{podcast.publishedAt}</span>
                <span>{podcast.durationAsString}</span>
              </div>

              <button type="button" className={styles.playButton}>
                <img src="/img/play-green.svg" alt="reproduzir item" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allPodcasts}>
        <header>
          <h2>Mais podcasts</h2>
        </header>
        <table cellSpacing="0">
          <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Publicado em</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {additionalPodcasts.map((podcast) => (
              <tr key={podcast.id}>
                <td style={{ width: 72 }}>
                  <Image
                    src={podcast.thumbnail}
                    alt={podcast.title}
                    objectFit="cover"
                    height="120"
                    width="120"
                  />
                </td>
                <td><a href="#">{podcast.title}</a></td>
                <td>{podcast.members}</td>
                <td style={{ width: 130 }}>{podcast.publishedAt}</td>
                <td>podcast.durationAsString</td>
                <td>
                  <button type="button" className={styles.playButton}>
                    <img src="/img/play-green.svg" alt="reproduzir item" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
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
    revalidate: SECONDS_TO_REVALIDATE,
    props: {
      latestPodcasts: data.slice(0, 2),
      additionalPodcasts: data.slice(2),
    },
  }
}

export {
  Home as default,
  getStaticProps,
}
