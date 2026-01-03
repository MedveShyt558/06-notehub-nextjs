"use client";

import css from "./SearchBox.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className={css.search}>
      <input
        className={css.input}
        type="text"
        value={value}
        placeholder="Search notes..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
