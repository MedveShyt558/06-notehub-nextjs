"use client";

import css from "./Pagination.module.css";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <p className={css.info}>
        Page {page} of {totalPages}
      </p>

      <button
        className={css.button}
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
