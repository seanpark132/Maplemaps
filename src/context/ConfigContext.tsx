import { createContext, useContext, useState } from "react";

type ConfigContextValue = {
  totalMulti: number;
  level: string;
  mesoObtained: string;
  setTotalMulti: React.Dispatch<React.SetStateAction<number>>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setMesoObtained: React.Dispatch<React.SetStateAction<string>>;
};

const defaultConfigContextValue: ConfigContextValue = {
  totalMulti: 1,
  level: "0",
  mesoObtained: "0",
  setTotalMulti: () => {},
  setLevel: () => {},
  setMesoObtained: () => {},
};

const ConfigContext = createContext<ConfigContextValue>(
  defaultConfigContextValue,
);

export function useConfig() {
  return useContext(ConfigContext);
}

export const ConfigContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalMulti, setTotalMulti] = useState<number>(
    Number(localStorage.getItem("totalMulti")) || 1,
  );
  const [level, setLevel] = useState<string>(
    localStorage.getItem("level") || "0",
  );
  const [mesoObtained, setMesoObtained] = useState<string>(
    localStorage.getItem("mesoObtained") || "0",
  );

  return (
    <ConfigContext.Provider
      value={{
        totalMulti: totalMulti,
        level: level,
        mesoObtained: mesoObtained,
        setTotalMulti: setTotalMulti,
        setLevel: setLevel,
        setMesoObtained: setMesoObtained,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
