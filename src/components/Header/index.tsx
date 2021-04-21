import styles from './styles.module.scss'

function Header() {
  return (
    <header className={styles.container}>
      <img src="/img/logo.svg" alt="logo PodShare" />

      <p>O melhor para vc ouvir, sempre!</p>

      <span>Qui, 8 de abril</span>
    </header>
  )
}

export default Header
