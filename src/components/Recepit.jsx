import useStore from "@/hooks/info";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const splitText = (text) => {
  const MAX_LENGTH = 60;
  const MAX_LENGTH_2 = 67;

  const firstLine = text.slice(0, MAX_LENGTH);

  let restText = text.slice(MAX_LENGTH);

  const lines = [];

  while (restText.length > MAX_LENGTH_2) {
    lines.push(restText.slice(0, MAX_LENGTH_2));
    restText = restText.slice(MAX_LENGTH_2);
  }

  if (restText) lines.push(restText);

  return [firstLine, ...lines];
};

const Recepit = ({ children }) => {
  const info = useStore((state) => state.info);

  const description1Lines = splitText(info.description1);
  const description2Lines = splitText(info.description2);

  return (
    <article className="ml-auto p-8 w-[941px]">
      <header className="grid grid-cols-3 pb-8">
        <div className="flex flex-col gap-12">
          <div>{children}</div>
          <div className="text-first">
            <h2 className="text-lg font-bold">MEPLIFE SALUD SRL</h2>
            <div className="flex flex-col gap-0">
              <span>CUIT: 30-71541748-7</span>
              <span>Domicilio: SAN MARTIN 663 1B - CABA</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-24 border-first border-solid border-[3px] flex justify-end items-end px-2">
            <h2 className="text-[5rem] leading-[5rem]  text-first">X</h2>
          </div>
          <div className="w-28 text-lg text-first font-oswald font-extralight text-center flex-col flex uppercase">
            <span className="leading-normal">Documento</span>
            <span className="leading-normal">No válido</span>
            <span className="leading-normal">Como factura</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <div>
            <h2 className="text-first text-3xl font-bold">RECIBO</h2>
            <p className="text-[1rem] leading-5 w-48 text-first">
              Valido Únicamente para cobro cuota afiliación
            </p>
          </div>
          <div className="flex flex-col justify-between pt-5  flex-1">
            <div className="flex gap-2 text-lg">
              <span className="font-bold text-first">N°:</span>
              <span className="flex-1 border-b border-first border-dotted">
                {info.numberRecepit}
              </span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="font-bold text-first">Fecha:</span>
              <span className="flex-1 border-b border-first border-dotted">
                {format(new Date(info.date), "dd/MM/yyyy", {
                  locale: es,
                })}
              </span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="font-bold text-first">Vigencia:</span>
              <span className="flex-1 border-b border-first border-dotted">
                {info.vigency}
              </span>
            </div>
          </div>
        </div>
      </header>
      <div>
        <section>
          <div className="w-full bg-gradient-to-r from-first  to-second py-[1px] print:bg-gradient-to-r print:from-first  print:to-second">
            <h3 className="text-white px-2 text-lg font-normal">
              Recibimos de:
            </h3>
          </div>
          <div className="py-4">
            <div className="flex gap-2 text-lg">
              <span className="font-normal text-first">Sr./Sra:</span>
              <span className="flex-1 border-b border-first border-dotted">
                {info["sr/sra"]}
              </span>
            </div>
            <div className="flex gap-2 text-lg">
              <span className="font-normal text-first">Domicilio:</span>
              <span className="flex-1 border-b border-first border-dotted">
                {info.address}
              </span>
            </div>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-lg flex-[2]">
                <span className="font-normal text-first">Localidad:</span>
                <span className="flex-1 border-b border-first border-dotted min-h-6">
                  {info.location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg flex-1">
                <span className="font-normal text-first">Tel:</span>
                <span className="flex-1 border-b border-first border-dotted min-h-6">
                  {info.phonenumber}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-lg flex-[2]">
                <span className="font-normal text-first">I.V.A:</span>
                <span className="flex-1 border-b border-first border-dotted min-h-6">
                  {info.iva}
                </span>
              </div>
              <div className="flex items-center gap-2 text-lg flex-1">
                <span className="font-normal text-first">C.U.I.T:</span>
                <span className="flex-1 border-b border-first border-dotted min-h-6">
                  {info.cuit}
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full h-1 my-4 bg-first" />
        <section>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-x-1 gap-y-10 text-lg">
              <span className="text-first">Recibí(mos) la suma de:</span>
              {description1Lines.map((line, index) => (
                <p
                  key={index}
                  className="first-of-type:flex-1 flex-[100%] border-b border-first border-dotted"
                >
                  {line}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-1 gap-y-10 text-lg">
              <span className="text-first ">En concepto de:</span>
              {description2Lines.map((line, index) => (
                <p
                  key={index}
                  className="first-of-type:flex-1 flex-[100%] border-b border-first border-dotted"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 pt-8">
            <div className="flex flex-col gap-1">
              <span className="text-first text-sm">SON</span>
              <div className="border border-first rounded-2xl w-52 px-4 py-2 bg-[#d1d3d4] flex gap-1">
                <span className="text-first text-3xl">$</span>
                <span className="flex-1 border-b border-first border-dotted text-3xl text-first">
                  {info.price}
                </span>
              </div>
            </div>
            <div className="h-full">
              <ul className="flex flex-col gap-2 items-center justify-end">
                <li className="flex flex-col items-center">
                  <div className="w-80 border-b border-first border-dotted h-12"></div>
                  <span className="text-center text-first">FIRMA</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="w-80 border-b border-first border-dotted h-8"></div>
                  <span className="text-center text-first">ACLARACIÓN</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="w-full h-1 my-4 bg-first" />
      </div>
      <footer>
        <h3 className="text-first text-xl">Observaciones:{" "}{info.observations}</h3>
        <p className="text-first">
          Ingreso Sujeto a aprobación de auditoría Médica
        </p>
      </footer>
    </article>
  );
};

export default Recepit;
