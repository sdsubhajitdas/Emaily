import { object, string } from "yup";

export default function emailValidationSchema() {
  return object({
    title: string().required("You must provide a title"),
    body: string().required("You must provide an email body"),
    recipients: string()
      .transform((emails) =>
        Array.from(
          new Set(emails.split(",").map((email) => email.trim()))
        ).join(",")
      )
      .required("At least one recipient's email is required")
      .test({
        name: "emails",
        test: (emails, ctx) => {
          const isEmailSchema = string().email();
          const firstInvalidEmail = emails
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email !== null || email !== "")
            .find((email) => !isEmailSchema.isValidSync(email));

          return !firstInvalidEmail
            ? true
            : ctx.createError({
                message: `${firstInvalidEmail} is an invalid email address`,
              });
        },
      }),
  });
}
