export default function ReviewSurveyField({ label, value, elementType }) {
  function getRenderElement(elementType) {
    switch (elementType) {
      case "textarea":
        return (
          <textarea
            disabled
            className="textarea textarea-bordered w-full"
            value={value}
          />
        );

      case "email":
        return (
          <div className="flex flex-wrap gap-3 w-full ">
            {value.split(",").map(
              (email) =>
                email && (
                  <div
                    className="badge badge-lg badge-warning badge-outline"
                    key={email}
                  >
                    {email}
                  </div>
                )
            )}
          </div>
        );

      case "input":
      default:
        return (
          <input
            disabled
            type="text"
            className="input input-bordered w-full"
            value={value}
          />
        );
    }
  }

  return (
    <div className="mb-2">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      {getRenderElement(elementType)}
    </div>
  );
}
