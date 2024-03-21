import { createContext, useContext, useState } from "react";

type ConfigContextValue = {
  totalMulti: number;
  level: number | string;
  mesoObtained: number | string;
  setTotalMulti: React.Dispatch<React.SetStateAction<number>>;
  setLevel: React.Dispatch<React.SetStateAction<number | string>>;
  setMesoObtained: React.Dispatch<React.SetStateAction<number | string>>;
};

const defaultConfigContextValue: ConfigContextValue = {
  totalMulti: 1,
  level: 0,
  mesoObtained: 0,
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
  const [totalMulti, setTotalMulti] = useState<number>(1);
  const [level, setLevel] = useState<number | string>(0);
  const [mesoObtained, setMesoObtained] = useState<number | string>(0);

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
