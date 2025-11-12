"use client";

import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { useId } from "react";
import * as Yup from "yup";
import Select from "../SelectComponent/Select";

import css from "./AddDiaryEntryForm.module.css";
import { Emotion, fetchEmotions } from "@/lib/api/clientApi";
import { createNote, updateNote } from "@/lib/api/diaryApi";
import { useNoteModalStore } from "@/lib/store/modalNoteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DiaryValues {
  title: string;
  emotions: Emotion[];
  description: string;
}

interface Note {
  _id: string;
  title: string;
  description: string;
  emotions: Emotion[];
  createdAt?: string;
  updatedAt?: string;
}

const emptyValues: DiaryValues = {
  title: "",
  emotions: [],
  description: "",
};

const diaryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Введіть заголовок")
    .max(100, "Максимум 100 символів"),
  emotions: Yup.array().min(1, "Оберіть хоча б одну категорію"),
  description: Yup.string()
    .required("Поле запису не може бути порожнім")
    .max(1000, "Максимум 1000 символів"),
});

interface Props {
  editingNote?: Note | null;
}

export default function AddDiaryEntryForm({ editingNote = null }: Props) {
  const fieldId = useId();
  const { closeNoteModal } = useNoteModalStore();
  const queryClient = useQueryClient();

  // Мутація для створення
  const createMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      emotions: string[];
    }) => createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeNoteModal();
    },
  });

  // Мутація для оновлення
  const updateMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      body: { title: string; description: string; emotions: string[] };
    }) => updateNote(payload.id, payload.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeNoteModal();
    },
  });

  const initialValues: DiaryValues = editingNote
    ? {
        title: editingNote.title,
        emotions: editingNote.emotions || [],
        description: editingNote.description,
      }
    : emptyValues;

  const handleSubmit = async (
    values: DiaryValues,
    actions: FormikHelpers<DiaryValues>
  ) => {
    const emotionIds = values.emotions.map(({ _id }) => _id);

    if (editingNote && editingNote._id) {
      // Update
      updateMutation.mutate(
        {
          id: editingNote._id,
          body: {
            title: values.title,
            description: values.description,
            emotions: emotionIds,
          },
        },
        {
          onSettled: () => {
            actions.setSubmitting(false);
          },
        }
      );
    } else {
      // Create
      createMutation.mutate(
        {
          title: values.title,
          description: values.description,
          emotions: emotionIds,
        },
        {
          onSettled: () => {
            actions.setSubmitting(false);
            actions.resetForm();
          },
        }
      );
    }

    closeNoteModal();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={diaryValidationSchema}
      enableReinitialize // важливо для підстановки editingNote
    >
      <Form className={css.form}>
        <h2 className={css.title}>
          {editingNote ? "Редагувати запис" : "Новий запис"}
        </h2>

        <div className={css.formGroup}>
          <label className={css.labelText} htmlFor={`${fieldId}-title`}>
            Заголовок
          </label>
          <Field name="title">
            {({ field, meta }: FieldProps<string, DiaryValues>) => (
              <input
                {...field}
                type="text"
                id={`${fieldId}-title`}
                placeholder="Введіть заголовок запису"
                className={`${css.textInputTitle} ${
                  meta.touched && meta.error ? css.inputError : ""
                }`}
              />
            )}
          </Field>
          <ErrorMessage className={css.error} name="title" component="span" />
        </div>

        <div className={css.formGroup}>
          <label className={css.labelText} htmlFor={`${fieldId}-emotions`}>
            Категорії
          </label>

          <Field name="emotions">
            {({ field, form, meta }: FieldProps<Emotion[]>) => (
              <Select
                placeholder="Оберіть категорію"
                name={field.name}
                value={field.value}
                onChange={(value) => form.setFieldValue(field.name, value)}
                onBlur={() => form.setFieldTouched(field.name)}
                loadOptions={async () => {
                  const { emotions } = await fetchEmotions();
                  return emotions;
                }}
                isMulti
                getOptionValue={(emotion) => emotion._id}
                getOptionLabel={(emotion) => emotion.title}
                hasError={meta.touched && !!meta.error}
              />
            )}
          </Field>
          <ErrorMessage
            name="emotions"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label className={css.labelText} htmlFor={`${fieldId}-description`}>
            Запис
          </label>
          <Field name="description">
            {({ field, meta }: FieldProps<string, DiaryValues>) => (
              <textarea
                {...field}
                id={`${fieldId}-description`}
                placeholder="Запишіть, як ви себе відчуваєте"
                className={`${css.textInputTextArea} ${
                  meta.touched && meta.error ? css.inputError : ""
                }`}
              />
            )}
          </Field>

          <ErrorMessage
            className={css.error}
            name="description"
            component="span"
          />
        </div>

        <button className={css.button} type="submit">
          Зберегти
        </button>
      </Form>
    </Formik>
  );
}
