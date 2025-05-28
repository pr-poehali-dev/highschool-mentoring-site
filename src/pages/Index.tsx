import { useState } from "react";
import TutorForm from "@/components/TutorForm";
import TutorCard from "@/components/TutorCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Tutor {
  id: number;
  name: string;
  grade: string;
  subjects: string[];
  description: string;
  contact: string;
}

const Index = () => {
  const [tutors, setTutors] = useState<Tutor[]>([
    {
      id: 1,
      name: "Алексей Петров",
      grade: "11",
      subjects: ["Математика", "Физика"],
      description:
        "Помогаю с математикой и физикой. Готовлюсь к ЕГЭ, знаю все подводные камни. Объясняю просто и понятно!",
      contact: "@alex_tutor",
    },
    {
      id: 2,
      name: "Мария Сидорова",
      grade: "10",
      subjects: ["Английский язык", "Литература"],
      description:
        "Люблю английский и литературу. Помогу с грамматикой, сочинениями и подготовкой к экзаменам.",
      contact: "maria.s@email.com",
    },
    {
      id: 3,
      name: "Дмитрий Козлов",
      grade: "11",
      subjects: ["Информатика", "Математика"],
      description:
        "Программирую с 8 класса. Помогу разобраться с алгоритмами, Python и подготовиться к олимпиадам.",
      contact: "@dmitry_code",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const addTutor = (newTutor: Tutor) => {
    setTutors([newTutor, ...tutors]);
  };

  const allSubjects = [...new Set(tutors.flatMap((tutor) => tutor.subjects))];

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesSubject =
      !selectedSubject || tutor.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🎓 Репетиторы-старшеклассники
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Платформа, где старшеклассники помогают младшим классам с учебой
          </p>
        </div>

        {/* Form */}
        <TutorForm onSubmit={addTutor} />

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск по имени или предмету..."
                className="pl-10"
              />
            </div>
            <div className="md:w-48">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Все предметы</option>
                {allSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters */}
          {(searchTerm || selectedSubject) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Активные фильтры:</span>
              {searchTerm && (
                <Badge
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setSearchTerm("")}
                >
                  Поиск: "{searchTerm}" ×
                </Badge>
              )}
              {selectedSubject && (
                <Badge
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setSelectedSubject("")}
                >
                  {selectedSubject} ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              name={tutor.name}
              grade={tutor.grade}
              subjects={tutor.subjects}
              description={tutor.description}
              contact={tutor.contact}
            />
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <Icon
              name="Users"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedSubject
                ? "Не найдено репетиторов по вашему запросу"
                : "Пока нет репетиторов. Будьте первым!"}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {tutors.length}
              </div>
              <div className="text-gray-600">Репетиторов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {allSubjects.length}
              </div>
              <div className="text-gray-600">Предметов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(
                  tutors.reduce(
                    (acc, tutor) => acc + parseInt(tutor.grade),
                    0,
                  ) / tutors.length,
                ) || 0}
              </div>
              <div className="text-gray-600">Средний класс</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
