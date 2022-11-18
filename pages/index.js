import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.scss'

export default function Home({products}) {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Behtarino</title>
        <meta name="description" content="Behtarino Challenge Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {products.map((item)=>
        <div
          key={item.id}
          className={styles.item}
          onClick={() => router.push('/products/' + item.id)}
        >
          {item.title}
        </div>
        )}

      </main>


    </div>
  )
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()
  return {
    // Passed to the page component as props
    props: { products },
  }
}
