import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as formik from "formik";
import * as yup from "yup";
import AuthFormContainer from "@/components/AuthFormContainer";
import AuthScreensWrapper from "@/components/AuthScreensWrapper";
import { PulseLoader } from "react-spinners";

export default function Register() {
  const { Formik } = formik;

  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Pole jest wymagane"),
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
    password: yup
      .string()
      .required("Pole jest wymagane")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Hasło musi zawierać:\n" +
          "- Co najmniej 8 znaków\n" +
          "- Przynajmniej jedną dużą literę\n" +
          "- Przynajmniej jedną małą literę\n" +
          "- Przynajmniej jedną cyfrę\n" +
          "- Przynajmniej jeden znak specjalny",
      ),
  });

  const register = useCallback(
    async ({
      email,
      name,
      password,
    }: {
      email: string;
      name: string;
      password: string;
    }) => {
      setIsLoading(true);
      try {
        await axios.post("api/register", {
          email,
          name,
          password,
        });
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/profiles",
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [],
  );

  return (
    <AuthScreensWrapper>
      <AuthFormContainer>
        <AuthFormContainer.Header text={"Zarejestruj się"} />
        <AuthFormContainer.Error show={userExists}>
          Konto na wprowadzony adres mailowy jest już zarejestrowane.
        </AuthFormContainer.Error>
        <Formik
          validateOnMount={true}
          validationSchema={schema}
          onSubmit={(values) =>
            register({
              email: values.email,
              name: values.name,
              password: values.password,
            })
          }
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            name: "",
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
            dirty,
            isValid,
          }) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className={"flex flex-col gap-5"}
            >
              <Input
                label={"Nazwa użytkownika"}
                id={"name"}
                type={"text"}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name! && !!errors.name}
                isValid={touched.name! && !errors.name}
                errorMessage={errors.name!}
              />
              <Input
                label={"Email"}
                id={"email"}
                type={"email"}
                value={values.email}
                onChange={handleChange}
                onBlur={async (e) => {
                  handleBlur(e);
                  try {
                    await axios.post("api/checkIfUserExists", {
                      email: values.email,
                    });
                    setUserExists(false);
                  } catch (error) {
                    setUserExists(true);
                    console.log(error);
                  }
                }}
                isInvalid={(touched.email! && !!errors.email) || userExists}
                isValid={touched.email! && !errors.email && !userExists}
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
                disabled={!(isValid && dirty) || userExists}
                type={"submit"}
                className={
                  "py-3 bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition disabled:opacity-70 disabled:hover:bg-red-600"
                }
              >
                {isLoading ? (
                  <PulseLoader color={"#fff"} size={10} />
                ) : (
                  "Zarejestruj się"
                )}
              </button>
            </form>
          )}
        </Formik>
        <AuthFormContainer.Outh />
        <p className={"text-neutral-500"}>Posiadasz konto w CinemaWave?</p>
        <div>
          <Link
            href={"/login"}
            className={"text-white hover:underline cursor-pointer "}
          >
            {"Zaloguj się"}
          </Link>
        </div>
      </AuthFormContainer>
    </AuthScreensWrapper>
  );
}
