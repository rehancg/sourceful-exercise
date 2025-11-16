import { FormHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface PromptInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  textareaProps?: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'placeholder' | 'rows' | 'id' | 'aria-label' | 'aria-describedby'>;
  formProps?: Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function PromptInput({ 
  className, 
  placeholder, 
  value,
  onChange,
  onSubmit,
  textareaProps,
  formProps,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: PromptInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} {...formProps}>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={cn(
          'w-full bg-transparent border-none outline-none resize-none',
          'text-base text-black placeholder:text-gray-400',
          'focus:ring-0 focus:outline-none',
          className
        )}
        rows={4}
        {...textareaProps}
      />
    </form>
  );
}

