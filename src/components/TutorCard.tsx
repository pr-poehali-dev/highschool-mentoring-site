import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface TutorCardProps {
  name: string;
  grade: string;
  subjects: string[];
  description: string;
  contact: string;
  avatar?: string;
}

const TutorCard = ({
  name,
  grade,
  subjects,
  description,
  contact,
  avatar,
}: TutorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-purple-100">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <CardTitle className="text-lg text-gray-800">{name}</CardTitle>
            <p className="text-sm text-purple-600 font-medium">{grade} класс</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {subjects.map((subject, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-100 text-purple-700 hover:bg-purple-200"
              >
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>

        <div className="pt-2 border-t border-purple-50">
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
            onClick={() => {
              if (contact.includes("@")) {
                window.location.href = `mailto:${contact}`;
              } else if (contact.includes("t.me")) {
                window.open(contact, "_blank");
              } else {
                navigator.clipboard.writeText(contact);
              }
            }}
          >
            <Icon name="MessageCircle" size={16} />
            Связаться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
