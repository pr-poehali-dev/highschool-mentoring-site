import { useState } from "react";
import { TutorFormData, Tutor } from "@/types/tutor";

export const useTutorForm = (onSubmit: (tutor: Tutor) => void) => {
  const [formData, setFormData] = useState<TutorFormData>({
    name: "",
    grade: "",
    description: "",
    contact: "",
    currentSubject: "",
  });

  const [subjects, setSubjects] = useState<string[]>([]);

  const updateField = (field: keyof TutorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSubject = (subject: string) => {
    if (subject && !subjects.includes(subject)) {
      setSubjects((prev) => [...prev, subject]);
      updateField("currentSubject", "");
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects((prev) => prev.filter((s) => s !== subject));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.grade &&
      subjects.length > 0 &&
      formData.contact
    ) {
      onSubmit({
        ...formData,
        subjects,
        id: Date.now(),
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      grade: "",
      description: "",
      contact: "",
      currentSubject: "",
    });
    setSubjects([]);
  };

  return {
    formData,
    subjects,
    updateField,
    addSubject,
    removeSubject,
    handleSubmit,
  };
};
