"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import styles from "./ProfileEditForm.module.css";
import { useId } from "react";
import Select from "@/components/SelectComponent/Select";

export type Gender = "Чоловіча" | "Жіноча" | "";

export interface ProfileFormValues {
  name: string;
  email: string;
  gender: Gender;
  dueDate: string;
}

interface GenderOption {
  value: Exclude<Gender, "">; // тільки "Чоловіча" або "Жіноча"
  label: string;
}

export const profileValidationSchema = Yup.object({
  name: Yup.string().required("Ім’я є обов’язковим"),
  email: Yup.string()
    .email("Некоректна пошта")
    .required("Пошта є обов’язковою"),
  gender: Yup.string()
    .oneOf(["Чоловіча", "Жіноча"], "Оберіть стать")
    .required("Оберіть стать"),
  dueDate: Yup.string().required("Оберіть дату"),
});

export default function ProfileEditForm() {
  const fieldId = useId();
  const handleSubmit = (values: ProfileFormValues) => {
    console.log("send form values", values);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", gender: "", dueDate: "" }}
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting }) => (
        <Form className={styles.profileform}>
          <div className={styles.profilefield}>
            <label htmlFor="name" className={styles.profilelabel}>
              Ім’я
            </label>
            <Field name="name">
              {({ field, meta }: FieldProps<string, ProfileFormValues>) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Ім'я зареєстрованого користувача"
                  id={`${fieldId}-username`}
                  className={`${styles.profileinput} ${
                    meta.touched && meta.error ? styles.inputError : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.profilefield}>
            <label htmlFor="email" className={styles.profilelabel}>
              Пошта
            </label>
            <Field name="email">
              {({ field, meta }: FieldProps<string, ProfileFormValues>) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Пошта зареєстрованого користувача"
                  id={`${fieldId}-useremail`}
                  className={`${styles.profileinput} ${
                    meta.touched && meta.error ? styles.inputError : ""
                  }`}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.profilefield}>
            <label htmlFor="gender" className={styles.profilelabel}>
              Стать дитини
            </label>

            <Field name="gender">
              {({
                field,
                form,
                meta,
              }: FieldProps<Gender, ProfileFormValues>) => {
                const options: GenderOption[] = [
                  { value: "Чоловіча", label: "Хлопчик" },
                  { value: "Жіноча", label: "Дівчинка" },
                ];

                const loadOptions = (
                  _inputValue: string,
                  callback: (options: GenderOption[]) => void
                ) => {
                  callback(options);
                };

                const selectedOption =
                  options.find((opt) => opt.value === field.value) || null;

                return (
                  <Select
                    placeholder="Оберіть стать"
                    name={field.name}
                    loadOptions={loadOptions}
                    value={selectedOption}
                    closeMenuOnSelect
                    onChange={(option) =>
                      form.setFieldValue(field.name, option?.value)
                    }
                    onBlur={() => form.setFieldTouched(field.name)}
                    hasError={meta.touched && !!meta.error}
                  />
                );
              }}
            </Field>

            <ErrorMessage
              name="gender"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.profilefield}>
            <label htmlFor="dueDate" className={styles.profilelabel}>
              Планова дата пологів
            </label>
            <Field name="dueDate">
              {({ field, meta }: FieldProps<string, ProfileFormValues>) => (
                <input
                  {...field}
                  type="date"
                  id={`${fieldId}-userDate`}
                  className={`${styles.profileselectDate} ${
                    meta.touched && meta.error ? styles.inputError : ""
                  }`}
                />
              )}
            </Field>
          </div>

          <div className={styles.profileactions}>
            <button
              type="button"
              onClick={() => resetForm()}
              className={styles.profilecancel}
            >
              Відмінити зміни
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.profilesave}
            >
              Зберегти зміни
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
