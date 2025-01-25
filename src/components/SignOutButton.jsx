import useLogin from "@/hooks/useLogin";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const { logout, loading } = useLogin();
  const onSignOut = async () => {
    await logout();
    location.href = "/";
  };

  return (
    <Button className="fixed bottom-0 right-0 m-3" onClick={onSignOut}>
      {loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-loader-circle"
          className="w-6 h-6 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      Cerrar sesión
    </Button>
  );
};

export default SignOutButton;
