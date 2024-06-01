import Input from "@/components/Input";

import Link from "next/link";
import * as formik from "formik";
import * as yup from "yup";
import AuthFormContainer from "@/components/AuthFormContainer";
import AuthScreensWrapper from "@/components/AuthScreensWrapper";

export default function ForgotPassword() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
  });

  return (
    <AuthScreensWrapper>
      <AuthFormContainer>
        <AuthFormContainer.Header text={"Nie pamiętasz hasła?"} />
        <p className={"text-white mb-8"}>
          Wyślemy do Ciebie wiadomość e-mail z instrukcją resetowania hasła.
        </p>
        <Formik
          validateOnMount={true}
          validationSchema={schema}
          onSubmit={() => console.log("Xd")}
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            email: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            handleBlur,
            errors,
            touched,
          }) => (
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className={"flex flex-col gap-5"}
            >
              <Input
                label={"Email"}
                id={"email"}
                type={"email"}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email! && !!errors.email}
                isValid={touched.email! && !errors.email}
                errorMessage={errors.email!}
              />
              <button
                type={"submit"}
                className={
                  "py-3 bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition"
                }
              >
                {"Wyślij przypomnienie"}
              </button>
            </form>
          )}
        </Formik>
        <p className={"mt-5 text-neutral-500"}>
          Pamiętasz hasło?&nbsp;
          <Link
            href={"/login"}
            className={
              " text-white self-center hover:underline cursor-pointer "
            }
          >
            {"Zaloguj się"}
          </Link>
        </p>
      </AuthFormContainer>
    </AuthScreensWrapper>
  );
}
