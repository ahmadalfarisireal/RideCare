"use client";

import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onValueChange,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("space-y-3", className)}>
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid gap-2">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const isChecked = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface p-3 transition-colors hover:border-accent/50",
                isChecked && "border-accent bg-accent/5",
              )}
            >
              <input
                id={inputId}
                name={name}
                type="radio"
                value={option.value}
                checked={value === undefined ? undefined : isChecked}
                onChange={() => onValueChange?.(option.value)}
                className="mt-0.5 size-4 accent-accent"
              />
              <span className="space-y-0.5">
                <span className="block text-sm font-medium text-foreground">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="block text-sm text-muted">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
