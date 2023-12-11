function Input({
  id,
  type,
  placeholder,
  defaultValue,
  label,
  required,
  autoComplete,
}: {
  id: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={id}
        id={id}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                focus:ring-1 focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Input;
