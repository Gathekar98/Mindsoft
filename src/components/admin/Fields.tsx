/** Labelled admin form inputs (server-renderable). */
export function TextField({
  name,
  label,
  defaultValue,
  error,
  hint,
  type = "text",
  required = true,
  className = "",
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  error?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="label">
        {label} {!required && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input id={id} name={name} type={type} required={required} defaultValue={defaultValue ?? ""} className="field !py-2.5" aria-invalid={!!error} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} />
      {hint && !error && <p id={`${id}-h`} className="text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-e`} className="field-error">{error}</p>}
    </div>
  );
}

export function TextArea({
  name,
  label,
  defaultValue,
  error,
  hint,
  rows = 5,
  required = true,
  className = "",
  mono = false,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  error?: string;
  hint?: string;
  rows?: number;
  required?: boolean;
  className?: string;
  mono?: boolean;
}) {
  const id = `f-${name}`;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="label">
        {label} {!required && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <textarea id={id} name={name} rows={rows} required={required} defaultValue={defaultValue ?? ""} className={`field resize-y ${mono ? "font-mono text-[14px]" : ""}`} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : hint ? `${id}-h` : undefined} />
      {hint && !error && <p id={`${id}-h`} className="text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-e`} className="field-error">{error}</p>}
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  className = "",
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  className?: string;
}) {
  const id = `f-${name}`;
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} name={name} defaultValue={defaultValue} className="field !py-2.5">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
