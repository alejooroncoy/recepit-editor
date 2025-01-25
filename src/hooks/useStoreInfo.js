import { create } from "zustand";

const useStoreInfo = create((set) => ({
  info: {
    numberRecepit: "",
    date: new Date(),
    vigency: "",
    srSra: "",
    address: "",
    location: "",
    phonenumber: "",
    iva: "",
    cuit: "",
    description1: "",
    description2: "",
    price: "",
    observations: "",
  },
  updateState: (key, value) =>
    set((state) => ({ ...state, info: { ...state.info, [key]: value } })),
  clearState: () =>
    set(() => ({
      info: {
        numberRecepit: "",
        date: new Date(),
        vigency: "",
        ["sr/sra"]: "",
        address: "",
        location: "",
        phonenumber: "",
        iva: "",
        cuit: "",
        description1: "",
        description2: "",
        price: "",
        observations: "",
      },
    })),
}));

export default useStoreInfo;
