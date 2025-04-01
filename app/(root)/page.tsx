import { signOut } from "@/actions/auth-actions";

const Page = () => {
  return <button onClick={signOut}>Log out</button>;
};

export default Page;
