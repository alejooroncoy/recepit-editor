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
import { Loader2 } from "lucide-react";

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
            {loading && <Loader2 className="w-6 h-6 animate-spin" />}
            Ingresar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormEntryRecepit;
