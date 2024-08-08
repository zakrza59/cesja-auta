'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '~/trpc/react';
import styles from '../index.module.css';

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState('');

  const { mutate, isPending } = api.offer.addOffer.useMutation({
    onSuccess: () => {
      router.refresh();
      setName('');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ title: name });
      }}
      className={styles.form}
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton} disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
