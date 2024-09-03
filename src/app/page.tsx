import { api } from '~/trpc/server';
import { Page } from '~/app/_components/Page';

import styles from './index.module.css';

export default async function Home() {
  return (
    <Page>
      <CrudShowcase />
    </Page>
  );
}

async function CrudShowcase() {
  const offers = await api.offer.getLatest();

  return (
    <div className={styles.showcaseContainer}>
      {offers.length > 0 ? (
        <ul>
          {offers.map((offer) => {
            return (
              <li key={offer.id}>
                {offer.title} - {offer.make.name} - {offer.model.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.showcaseText}>No cars in db</p>
      )}
    </div>
  );
}
