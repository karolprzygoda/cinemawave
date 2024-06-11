import Input from "@/components/Input";
import { useCallback, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as formik from "formik";
import * as yup from "yup";
import AuthScreensWrapper from "@/components/AuthScreensWrapper";
import { useRouter } from "next/navigation";
import AuthFormContainer from "@/components/AuthFormContainer";
import { PulseLoader } from "react-spinners";

export default function Login() {
  const { Formik } = formik;
  const router = useRouter();
  const [userExists, setUserExists] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleShow = () => setUserExists(false);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result!.error) {
          console.log(result!.error);
          handleShow();
          setIsLoading(false);
        } else {
          router.push("/profiles");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    },
    [router],
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
                isInvalid={(touched.email! && !!errors.email) || !userExists}
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
                isInvalid={
                  (touched.password! && !!errors.password) || !userExists
                }
                isValid={touched.password! && !errors.password}
                errorMessage={errors.password!}
              />
              <button
                type={"submit"}
                className={
                  "py-3  bg-red-600 text-white rounded-md w-full hover:bg-red-700 transition"
                }
              >
                {isLoading ? (
                  <PulseLoader color={"#fff"} size={10} />
                ) : (
                  "Zaloguj się"
                )}
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
