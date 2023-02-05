export default function SurveyField({
  name,
  label,
  placeholder,
  error,
  register,
  elementType,
}) {
  function getRenderElement(elementType) {
    switch (elementType) {
      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            className="textarea textarea-bordered w-full"
            {...register}
          />
        );

      case "input":
      default:
        return (
          <input
            type="text"
            placeholder={placeholder}
            className="input input-bordered w-full"
            {...register}
          />
        );
    }
  }

  return (
    <div className="mb-2">
      <label className="label">
        <span className="label-text dark:text-white">{label}</span>
      </label>
      {getRenderElement(elementType)}
      <label className={!error ? "hidden" : "label"}>
        <span className="label-text-alt text-red-700 dark:text-error">
          {error}
        </span>
      </label>
    </div>
  );
}
