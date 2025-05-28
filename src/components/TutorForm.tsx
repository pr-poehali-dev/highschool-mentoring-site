import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface TutorFormProps {
  onSubmit: (tutor: any) => void;
}

const TutorForm = ({ onSubmit }: TutorFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    description: "",
    contact: "",
    currentSubject: "",
  });
  const [subjects, setSubjects] = useState<string[]>([]);

  const availableSubjects = [
    "Математика",
    "Русский язык",
    "Английский язык",
    "Физика",
    "Химия",
    "Биология",
    "История",
    "География",
    "Литература",
    "Информатика",
  ];

  const addSubject = (subject: string) => {
    if (subject && !subjects.includes(subject)) {
      setSubjects([...subjects, subject]);
      setFormData({ ...formData, currentSubject: "" });
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
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
      setFormData({
        name: "",
        grade: "",
        description: "",
        contact: "",
        currentSubject: "",
      });
      setSubjects([]);
    }
  };

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя и фамилия
              </label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Анна Иванова"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Класс
              </label>
              <Input
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                placeholder="10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предметы (выберите или добавьте свой)
            </label>
            <div className="flex gap-2 mb-3">
              <Input
                value={formData.currentSubject}
                onChange={(e) =>
                  setFormData({ ...formData, currentSubject: e.target.value })
                }
                placeholder="Введите предмет"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSubject(formData.currentSubject);
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addSubject(formData.currentSubject)}
                variant="outline"
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {availableSubjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-100"
                  onClick={() => addSubject(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>

            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    className="bg-purple-100 text-purple-700 cursor-pointer"
                    onClick={() => removeSubject(subject)}
                  >
                    {subject} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Расскажите о своем опыте и подходе к обучению..."
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Контакт для связи
            </label>
            <Input
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              placeholder="email@example.com или @telegram"
              required
            />
          </div>

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
