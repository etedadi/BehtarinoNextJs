import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import StarRatings from 'react-star-ratings';
import cartIcon from '../../public/icons/shopping-cart.png'
import share from '../../public/icons/share.png'
import styles from '../../styles/Product.module.scss'

export default function Product({product}) {

  const colors = [['#880e4f', '#d50000'], ['#304ffe', '#8c9eff'], ['#f57f17', '#ffff8d'], ['#00acc1', '#1de9b6']]
  const sizes = ['S', 'M', 'L', 'XL']
  const [selectedColor, setSelectedColor] = useState(3)
  return (
    <div className={styles.container}>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div
          className={styles.left}
          style={{
            background: `linear-gradient(0deg, ${colors[selectedColor][0]} 0%, ${colors[selectedColor][1]} 100%)`,
            boxShadow: `-40px 40px 50px ${colors[selectedColor][0]}50 `
          }}
        >
           <img className={styles.productImg} src={product.image} />
        </div>
        <div className={styles.right}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>{product.title}</h2>
            <StarRatings
              rating={product.rating?.rate}
              starRatedColor="#d66767"
              starDimension={15}
              starSpacing={2}
              numberOfStars={5}
              name='rating'
            />
          </div>

          <h5 className={styles.modelName}>{product.category}</h5>
          <div className={styles.price}>
            <strong>${product.price}</strong>
            <strong></strong>
          </div>
          <br/>
          <h5 className={styles.descriptionTitle}>DESCRIPTION</h5>
          <p className={styles.descriptionText}>
            {product.description}
          </p>
          <br />
          <div className={styles.options}>
            <div className={styles.colorBox}>
              <h5 className={styles.descriptionTitle}>Color</h5>
              <br/>
              <div>
                {colors.map((item, index)=>
                  <span
                    key={index}
                    className={styles.colorItem}
                    style={{background: colors[index][0]}}
                    onClick={()=> setSelectedColor(index)}
                  >
                    {selectedColor === index && <span className={styles.active} style={{borderColor: colors[index][0]}} />}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.sizeBox}>
              <h5 className={styles.descriptionTitle}>SIZE</h5>
              <br/>
              <div>
                <select>
                  {sizes.map((item)=>
                    <option key={item}>{item}</option>
                  )}
                </select>
              </div>
            </div>
            <div className={styles.sizeBox}>
              <h5 className={styles.descriptionTitle}>QTY</h5>
              <br/>
              <div>
                <select>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item)=>
                    <option key={item} value={item}>({item})</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <br/>
          <br />
          <br />
          <div className={styles.footer}>
            <div className={styles.addButton}>
              <Image src={cartIcon} width={22}  height={22} />
              <span>ADD TO CART</span>
            </div>
            <Image
              src={share}
              width={32}
              height={32}
              className={styles.shareButton}
            />
          </div>
        </div>
      </main>


    </div>
  )
}

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
  // Call an external API endpoint to get posts
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = products.map((product) => ({
    params: { id: product.id?.toString() },
  }))

  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product = await res.json()
  return {
    // Passed to the page component as props
    props: { product  },
  }
}
