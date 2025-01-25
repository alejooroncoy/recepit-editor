import { Button } from "./ui/button";

const ButtonLink = () => {
  return (
    <Button asChild>
      <a href="/factura">Ir a factura</a>
    </Button>
  );
};

export default ButtonLink;
