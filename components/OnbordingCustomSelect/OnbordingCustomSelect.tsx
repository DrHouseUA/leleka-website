"use client";

import { useState } from "react";
import { useField } from "formik";
import styles from "./OnbordingCustomSelect.module.css";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

export default function OnbordingCustomSelect({
  label,
  options,
  placeholder = "Select one...",
  ...props
}: CustomSelectProps) {
  const [field, meta, helpers] = useField(props);
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Option) => {
    helpers.setValue(option.value);
    setOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === field.value)?.label || placeholder;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      <div
        className={`${styles.control} ${
          meta.touched && meta.error ? styles.errorInput : ""
        } ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className={styles.customArrow} />
      </div>

      {open && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.option}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {meta.touched && meta.error && (
        <div className={styles.errorText}>{meta.error}</div>
      )}
    </div>
  );
}