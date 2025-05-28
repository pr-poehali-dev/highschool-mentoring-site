import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useTutorForm } from "@/hooks/useTutorForm";
import FormField from "@/components/forms/FormField";
import SubjectSelector from "@/components/forms/SubjectSelector";
import { TutorFormProps } from "@/types/tutor";

const TutorForm = ({ onSubmit }: TutorFormProps) => {
  const {
    formData,
    subjects,
    updateField,
    addSubject,
    removeSubject,
    handleSubmit,
  } = useTutorForm(onSubmit);

  return (
    <Card className="mb-8 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Icon name="UserPlus" size={24} />
          Создать визитку репетитора
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Имя и фамилия"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Анна Иванова"
              required
            />
            <FormField
              label="Класс"
              value={formData.grade}
              onChange={(value) => updateField("grade", value)}
              placeholder="10"
              required
            />
          </div>

          <SubjectSelector
            currentSubject={formData.currentSubject}
            subjects={subjects}
            onCurrentSubjectChange={(value) =>
              updateField("currentSubject", value)
            }
            onAddSubject={addSubject}
            onRemoveSubject={removeSubject}
          />

          <FormField
            label="Описание"
            value={formData.description}
            onChange={(value) => updateField("description", value)}
            placeholder="Расскажите о своем опыте и подходе к обучению..."
            type="textarea"
          />

          <FormField
            label="Контакт для связи"
            value={formData.contact}
            onChange={(value) => updateField("contact", value)}
            placeholder="email@example.com или @telegram"
            required
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white h-12"
          >
            <Icon name="Send" size={20} />
            Создать визитку
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TutorForm;
