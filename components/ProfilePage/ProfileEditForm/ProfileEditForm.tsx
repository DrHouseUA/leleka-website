"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./ProfileEditForm.module.css";
import { useId } from "react";

export type Gender = "Чоловіча" | "Жіноча" | "";

export interface ProfileFormValues {
  name: string;
  email: string;
  gender: Gender;
  dueDate: string;
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
  const handleSubmit = () => {
    console.log("send form values");
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
            <Field
              as="input"
              name="name"
              type="text"
              placeholder="Ім'я зареєстрованого користувача"
              className={styles.profileinput}
              id={`${fieldId}-username`}
            />
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
            <Field
              as="input"
              name="email"
              type="email"
              placeholder="Пошта зареєстрованого користувача"
              className={styles.profileinput}
              id={`${fieldId}-useremail`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.profileerror}
            />
          </div>

          <div className={styles.profilefield}>
            <label htmlFor="gender" className={styles.profilelabel}>
              Стать дитини
            </label>
            <Field
              name="gender"
              as="select"
              className={styles.profileselect}
              id={`${fieldId}-babyGender`}
            >
              <option value="">Оберіть стать</option>
              <option value="Чоловіча">Хлопчик</option>
              <option value="Жіноча">Дівчинка</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              className={styles.profileerror}
            />
          </div>

          <div className={styles.profilefield}>
            <label htmlFor="dueDate" className={styles.profilelabel}>
              Планова дата пологів
            </label>
            <Field
              name="dueDate"
              type="date"
              className={styles.profileinput}
              id={`${fieldId}-userDate`}
            />
            <ErrorMessage
              name="dueDate"
              component="div"
              className={styles.profileerror}
            />
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
