import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  type?: "input" | "textarea";
}

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "input",
}: FormFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {type === "input" ? (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    )}
  </div>
);

export default FormField;
