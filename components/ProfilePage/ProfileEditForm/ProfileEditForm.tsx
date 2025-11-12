"use client";

import * as Yup from "yup";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from "formik";
import styles from "./ProfileEditForm.module.css";
import { useId, useMemo, useState, useRef, useEffect } from "react";
import Select from "@/components/SelectComponent/Select";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/clientApi";
import { UserData } from "@/types/user";


export type Gender = "Чоловіча" | "Жіноча" | "Невідомо" | "";

export interface ProfileFormValues {
  name: string;
  email: string;
  babyGender: Gender;
  dueDate: string;
}

interface GenderOption {
  value: Exclude<Gender, "">;
  label: string;
}

export const profileValidationSchema = Yup.object({
  name: Yup.string().required("Ім’я є обов’язковим"),
  email: Yup.string()
    .email("Некоректна пошта")
    .required("Пошта є обов’язковою"),
  babyGender: Yup.string()
    .oneOf(["Чоловіча", "Жіноча", "Невідомо", ""], "Оберіть стать")
    .required("Оберіть стать"),
  dueDate: Yup.string().required("Оберіть дату"),
});

export default function ProfileEditForm() {


  const fieldId = useId();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

const iziToastRef = useRef<any | null>(null);

useEffect(() => {
  // Завантажити CSS один раз на клієнті
  import("izitoast/dist/css/iziToast.min.css").catch(() => {});
  // Динамічно імпортувати модуль і зберегти його в ref
  import("izitoast")
    .then((mod) => {
      iziToastRef.current = mod.default || mod;
    })
    .catch(() => {
      iziToastRef.current = null;
    });
}, []);



  // Опції для селекту — детерміновані і стабільні
  const genderOptions: GenderOption[] = useMemo(
    () => [
      { value: "Чоловіча", label: "Хлопчик" },
      { value: "Жіноча", label: "Дівчинка" },
      { value: "Невідомо", label: "Ще не знаю" },
    ],
    []
  );

  // Стабільні initialValues, використовують дані user якщо є
  const initialValues = useMemo<ProfileFormValues>(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
      babyGender:
        (user?.babyGender === "boy" && "Чоловіча") ||
        (user?.babyGender === "girl" && "Жіноча") ||
        (user?.babyGender === "unknown" && "Невідомо") ||
        "",
      dueDate: user?.dueDate ?? "",
    }),
    [user]
  );

  const mapBabyGenderToBackend = (g: Gender): "girl" | "boy" | "unknown" => {
    if (g === "Чоловіча") return "boy";
    if (g === "Жіноча") return "girl";
    return "unknown";
  };

  const handleSubmit = async (
    values: ProfileFormValues,
    { setSubmitting }: FormikHelpers<ProfileFormValues>
  ) => {
    setSubmitError(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const payload: Record<string, unknown> = {
        name: values.name,
        email: values.email,
        babyGender: mapBabyGenderToBackend(values.babyGender),
        dueDate: values.dueDate,
      };

      const updatedUser = await updateUser(payload);

      setUser({ ...user, ...updatedUser } as UserData);

      setSuccessMessage("Профіль успішно оновлено");
iziToast.success({
  title: "Успіх",
  message: "Профіль успішно оновлено",
  position: "topRight",
});

    } catch (err: unknown) {
      let message = "Помилка при збереженні";
      if (typeof err === "string") {
        message = err;
      } else if (err && typeof err === "object") {
        const e = err as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message = e.response?.data?.message ?? e.message ?? message;
      }
      setSubmitError(message);
      iziToast.error({
    title: "Помилка",
    message,
    position: "topRight",
  });

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting }) => (
        <>
          {submitError && <div className={styles.error}></div>}
          {successMessage && (
            <div className={styles.success}></div>
          )}


          <Form className={styles.profileform} noValidate>
            <div className={styles.profilefield}>
              <label
                htmlFor={`${fieldId}-username`}
                className={styles.profilelabel}
              >
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
                    aria-invalid={meta.touched && !!meta.error}
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
              <label
                htmlFor={`${fieldId}-useremail`}
                className={styles.profilelabel}
              >
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
                    readOnly
                    aria-readonly={true}
                    aria-invalid={meta.touched && !!meta.error}
                    // необов'язково: не дозволити фокус клавіатурою
                    tabIndex={-1}
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
              <label
                htmlFor={`${fieldId}-babyGender`}
                className={styles.profilelabel}
              >
                Стать дитини
              </label>

              <Field name="babyGender">
                {({
                  field,
                  form,
                  meta,
                }: FieldProps<Gender, ProfileFormValues>) => {
                  const selectedOption =
                    genderOptions.find((opt) => opt.value === field.value) ||
                    null;

                  // instanceId робить id стабільним між SSR/клієнтом
                  return (
                    <Select
                      placeholder="Оберіть стать"
                      name={field.name}
                      instanceId={`${fieldId}-babyGender`}
                      inputId={`${fieldId}-babyGender-input`}
                      loadOptions={(input, cb) => cb(genderOptions)}
                      value={selectedOption}
                      closeMenuOnSelect
                      onChange={(option) =>
                        form.setFieldValue(field.name, option?.value ?? "")
                      }
                      onBlur={() => form.setFieldTouched(field.name, true)}
                      hasError={meta.touched && !!meta.error}
                      options={genderOptions}
                    />
                  );
                }}
              </Field>

              <ErrorMessage
                name="babyGender"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.profilefield}>
              <label
                htmlFor={`${fieldId}-userDate`}
                className={styles.profilelabel}
              >
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
                    aria-invalid={meta.touched && !!meta.error}
                  />
                )}
              </Field>
              <ErrorMessage
                name="dueDate"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.profileactions}>
              <button
                type="button"
                onClick={() => resetForm()}
                className={styles.profilecancel}
                disabled={isSubmitting}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.profilesave}
              >
                {isSubmitting ? "Зберігання..." : "Зберегти зміни"}
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
