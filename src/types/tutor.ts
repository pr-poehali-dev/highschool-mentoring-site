export interface TutorFormData {
  name: string;
  grade: string;
  description: string;
  contact: string;
  currentSubject: string;
}

export interface Tutor extends Omit<TutorFormData, "currentSubject"> {
  id: number;
  subjects: string[];
}

export interface TutorFormProps {
  onSubmit: (tutor: Tutor) => void;
}
