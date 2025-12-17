'use client';

interface DatePickerInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

export default function DatePickerInput({
  value,
  onChange,
  disabled = false,
  required = false,
}: DatePickerInputProps) {
  return (
    <input
      type="date"
      name="dateOfBirth"
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full px-4 py-3 rounded-lg bg-secondary/10 border border-border hover:border-primary/50 focus:border-primary focus:outline-none transition-colors text-foreground cursor-pointer"
    />
  );
}
