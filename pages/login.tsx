import Input from "@/components/Input";
import { useCallback, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as formik from "formik";
import * as yup from "yup";
import AuthScreensWrapper from "@/components/AuthScreensWrapper";
import { useRouter } from "next/navigation";
import AuthFormContainer from "@/components/AuthFormContainer";

export default function Login() {
  const { Formik } = formik;
  const router = useRouter();
  const [userExists, setUserExists] = useState(true);
  const handleShow = () => setUserExists(false);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result!.error) {
          console.log(result!.error);
          handleShow();
        } else {
          router.push("/profiles");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
    password: yup.string().required("Pole jest wymagane"),
  });

  return (
    <AuthScreensWrapper>
      <AuthFormContainer>
        <AuthFormContainer.Header text={"Zaloguj się"} />
        <AuthFormContainer.Error show={!userExists}>
          Niestety, nie możemy znaleźć konta z tym adresem e-mail. Spróbuj
          ponownie lub{" "}
          <Link className={"underline block"} href={"/register"}>
            utwórz nowe konto.
          </Link>
        </AuthFormContainer.Error>
        <Formik
          validationSchema={schema}
          onSubmit={(values) =>
            login({ email: values.email, password: values.password })
          }
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            email: "",
            password: "",
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
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={"flex flex-col gap-5 mb-5"}
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
              <Input
                label={"Hasło"}
                id={"password"}
                type={"password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password! && !!errors.password}
                isValid={touched.password! && !errors.password}
                errorMessage={errors.password!}
              />
              <button
                type={"submit"}
                className={
                  "py-3  bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition"
                }
              >
                {"Zaloguj się"}
              </button>
            </form>
          )}
        </Formik>
        <AuthFormContainer.Route
          text={"Nie pamiętasz hasła?"}
          href={"/forgotPassword"}
        />
        <AuthFormContainer.Outh />
        <p className={"text-neutral-500"}>
          Nie masz jeszcze konta w CinemaWave?
        </p>
        <div>
          <Link
            href={"/register"}
            className={"text-white  hover:underline cursor-pointer inline"}
          >
            {"Zarejestruj się"}
          </Link>
        </div>
      </AuthFormContainer>
    </AuthScreensWrapper>
  );
}
