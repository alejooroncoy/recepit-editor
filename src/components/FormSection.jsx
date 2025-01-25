import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/hooks/info";
import { useState } from "react";
import { es } from "date-fns/locale";

const formSchema = z.object({
  numberRecepit: z
    .string({
      message: "El número de recibo debe ser un texto",
    })
    .nullish(),
  date: z
    .date({
      message: "El dato debe ser una fecha",
    })
    .nullish(),
  vigency: z
    .string({
      message: "La vigencia debe ser un texto",
    })
    .nullish(),
  "sr/sra": z
    .string({
      message: "El Sr/Sra debe ser un texto",
    })
    .nullish(),
  address: z
    .string({
      message: "El domicilio debe ser un texto",
    })
    .nullish(),
  location: z
    .string({
      message: "La localidad debe ser un texto",
    })
    .nullish(),
  phonenumber: z
    .string()
    .regex(/^\d*$/, "El número de teléfono debe ser un número")
    .nullish(),
  iva: z
    .string({
      message: "El I.V.A debe ser un texto",
    })
    .nullish(),
  cuit: z
    .string({
      message: "El C.U.I.T debe ser un texto",
    })
    .nullish(),
  description1: z
    .string({
      message: "La descripción 1 debe ser un texto",
    })
    .nullish(),
  description2: z
    .string({
      message: "La descripción 2 debe ser un texto",
    })
    .nullish(),
  price: z
    .string()
    .regex(/^\d*\.?\d+$/, "El precio debe ser un número")
    .nullish(),
  observations: z
    .string({
      message: "Las observaciones deben ser un texto",
    })
    .nullish(),
});

const FormSection = () => {
  const updateState = useStore((state) => state.updateState);
  const clearState = useStore((state) => state.clearState);
  const info = useStore((state) => state.info);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;

    try {
      formSchema.parse({ [e.target.name]: value });
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    } catch (error) {
      const errorJson = JSON.parse(error.message);
      setErrors((prev) => ({ ...prev, [e.target.name]: errorJson[0].message }));
    }

    updateState(e.target.name, e.target.value);
  };

  return (
    <section className="overflow-y-auto h-dvh fixed top-0 print:hidden">
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Número
          </label>
          <Input
            value={info.numberRecepit}
            placeholder="Número"
            name="numberRecepit"
            onChange={handleChange}
          />
          <p className="text-xs text-red-500">{errors.numberRecepit}</p>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Fecha de factura
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !info.date && "text-muted-foreground"
                )}
              >
                {info.date ? (
                  format(info.date, "PPP", {
                    locale: es,
                  })
                ) : (
                  <span>Fecha de factura</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={info.date}
                onSelect={(date) => {
                  updateState("date", date);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Vigencia</label>
          <Input
            placeholder="Vigencia"
            name="vigency"
            value={info.vigency}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.vigency}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Sr/Sra</label>
          <Input
            placeholder="Sr/Sra"
            name="sr/sra"
            onChange={handleChange}
            value={info["sr/sra"]}
          />

          <p className="text-xs text-red-500">{errors["sr/sra"]}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Domicilio</label>
          <Input
            placeholder="Domicilio"
            name="address"
            value={info.address}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.address}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Localidad</label>
          <Input
            placeholder="Localidad"
            name="location"
            value={info.location}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.location}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Teléfono</label>
          <Input
            placeholder="Teléfono"
            name="phonenumber"
            value={info.phonenumber}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.phonenumber}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">I.V.A</label>
          <Input
            placeholder="I.V.A"
            name="iva"
            onChange={handleChange}
            value={info.iva}
          />

          <p className="text-xs text-red-500">{errors.iva}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">C.U.I.T</label>
          <Input
            placeholder="C.U.I.T"
            name="cuit"
            onChange={handleChange}
            value={info.cuit}
          />

          <p className="text-xs text-red-500">{errors.cuit}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Descripción 1
          </label>
          <Textarea
            placeholder="Descripción 1"
            name="description1"
            value={info.description1}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.description1}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Descripción 2
          </label>
          <Textarea
            placeholder="Descripción 2"
            name="description2"
            value={info.description2}
            onChange={handleChange}
          />

          <p className="text-xs text-red-500">{errors.description2}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Precio</label>
          <Input
            placeholder="Precio"
            name="price"
            onChange={handleChange}
            value={info.price}
          />

          <p className="text-xs text-red-500">{errors.price}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Observaciones
          </label>
          <Textarea
            placeholder="Observaciones"
            name="observations"
            onChange={handleChange}
            value={info.observations}
          />

          <p className="text-xs text-red-500">{errors.observations}</p>
        </div>
      </div>
      <div className="sticky bottom-0 py-4 bg-gray-400/30 flex justify-center px-4 w-full gap-2">
        <Button onClick={clearState}>Limpiar campos</Button>
        <Button onClick={() => window.print()}>Generar recibo</Button>
      </div>
    </section>
  );
};

export default FormSection;
