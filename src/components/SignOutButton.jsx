import useLogin from "@/hooks/useLogin";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const { logout, loading } = useLogin();
  const onSignOut = async () => {
    await logout();
    location.href = "/";
  };

  return (
    <Button className="fixed bottom-0 right-0 m-3" onClick={onSignOut}>
      {loading && <Loader2 className="w-6 h-6 animate-spin" />}
      Cerrar sesión
    </Button>
  );
};

export default SignOutButton;
