import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { AVAILABLE_SUBJECTS } from "@/constants/subjects";

interface SubjectSelectorProps {
  currentSubject: string;
  subjects: string[];
  onCurrentSubjectChange: (value: string) => void;
  onAddSubject: (subject: string) => void;
  onRemoveSubject: (subject: string) => void;
}

const SubjectSelector = ({
  currentSubject,
  subjects,
  onCurrentSubjectChange,
  onAddSubject,
  onRemoveSubject,
}: SubjectSelectorProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Предметы (выберите или добавьте свой)
    </label>

    <div className="flex gap-2 mb-3">
      <Input
        value={currentSubject}
        onChange={(e) => onCurrentSubjectChange(e.target.value)}
        placeholder="Введите предмет"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAddSubject(currentSubject);
          }
        }}
      />
      <Button
        type="button"
        onClick={() => onAddSubject(currentSubject)}
        variant="outline"
      >
        <Icon name="Plus" size={16} />
      </Button>
    </div>

    <div className="flex flex-wrap gap-2 mb-3">
      {AVAILABLE_SUBJECTS.map((subject) => (
        <Badge
          key={subject}
          variant="outline"
          className="cursor-pointer hover:bg-purple-100"
          onClick={() => onAddSubject(subject)}
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
            onClick={() => onRemoveSubject(subject)}
          >
            {subject} ×
          </Badge>
        ))}
      </div>
    )}
  </div>
);

export default SubjectSelector;
