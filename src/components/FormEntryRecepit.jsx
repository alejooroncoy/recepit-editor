import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import useLogin from "@/hooks/useLogin";

const schema = z.object({
  password: z.string().nonempty({
    message: "La contraseña es requerida",
  }),
});

const FormEntryRecepit = () => {
  const { login, loading } = useLogin();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const response = await login(data.password);

    if (response.success) {
      location.href = "/factura";
      return;
    }

    form.setError("password", {
      type: "manual",
      message: response.error,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="**********" />
                </FormControl>
                <FormDescription>Contraseña para ingresar</FormDescription>
                <FormMessage>
                  {fieldState.error ? fieldState.error.message : ""}
                </FormMessage>
              </FormItem>
            )}
            name="password"
          />
          <Button type="submit" disabled={loading}>
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
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEntryRecepit;
