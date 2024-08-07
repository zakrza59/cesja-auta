import Link from 'next/link';

import { CreatePost } from '~/app/_components/create-post';
import { api } from '~/trpc/server';
import { Page } from '~/app/_components/Page';

import styles from './index.module.css';

export default async function Home() {
  return (
    <Page>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Create <span className={styles.pinkSpan}>T3</span> App
        </h1>
        <div className={styles.cardRow}>
          <Link className={styles.card} href="https://create.t3.gg/en/usage/first-steps" target="_blank">
            <h3 className={styles.cardTitle}>First Steps →</h3>
            <div className={styles.cardText}>
              Just the basics - Everything you need to know to set up your database and authentication.
            </div>
          </Link>
          <Link className={styles.card} href="https://create.t3.gg/en/introduction" target="_blank">
            <h3 className={styles.cardTitle}>Documentation →</h3>
            <div className={styles.cardText}>
              Learn more about Create T3 App, the libraries it uses, and how to deploy it.
            </div>
          </Link>
        </div>
        <div className={styles.showcaseContainer}></div>

        <CrudShowcase />
      </div>
    </Page>
  );
}

async function CrudShowcase() {
  const cars = await api.offer.getLatest();

  return (
    <div className={styles.showcaseContainer}>
      {cars.length > 0 ? (
        <ul>
          {cars.map((car) => {
            return <li key={car.id}>{car.title}</li>;
          })}
        </ul>
      ) : (
        <p className={styles.showcaseText}>No cars in db</p>
      )}
      <CreatePost />
    </div>
  );
}
