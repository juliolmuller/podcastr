import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import styles from './styles.module.scss'

function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMM', { locale: ptBR })

  return (
    <header className={styles.container}>
      <img src="/img/logo.svg" alt="logo Podcastr" />

      <p>O melhor para vc ouvir, sempre!</p>

      <span>{currentDate}</span>
    </header>
  )
}

export default Header
