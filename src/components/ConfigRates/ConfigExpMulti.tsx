import { useState, useEffect } from "react";
import InputSelect from "./InputSelect";
import {
  CASH_SHOP_OPTIONS,
  USE_COUPON_OPTIONS,
} from "../../utils/ratesConstants";
import { ConfigState } from "../../types/dataTypes";

type Props = {
  ratesConfig: ConfigState;
  setRatesConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
};

export default function ConfigExpMulti(props: Props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (props.ratesConfig.expMulti.torment === "1.075") {
      setIsChecked(true);
    }
  }, []);

  return (
    <>
      <h2 className="mb-2 mt-8 underline">Multiplicative Exp Bonuses</h2>
      <InputSelect
        label="Use Coupons"
        name="useCoupon"
        value={props.ratesConfig.expMulti.useCoupon}
        options={USE_COUPON_OPTIONS}
        handlerFnc={handleExpMultiChange}
        isMulti={true}
      />
      <InputSelect
        label="Cash Shop Coupons"
        name="cashShop"
        value={props.ratesConfig.expMulti.cashShop}
        options={CASH_SHOP_OPTIONS}
        handlerFnc={handleExpMultiChange}
        isMulti={true}
      />
      <div className="mb-12 mt-1 flex items-center">
        <input
          type="checkbox"
          id="torment"
          name="torment"
          value="1.075"
          checked={isChecked}
          onChange={(e) => handleCheckedChange(e)}
        />
        <label className="ml-4 py-1" htmlFor={"torment"}>
          (1.075 x exp) Ring of Torment
        </label>
      </div>
    </>
  );

  function handleExpMultiChange(e: any) {
    const { name, value } = e.target;

    props.setRatesConfig((prev) => ({
      ...prev,
      expMulti: { ...prev.expMulti, [name]: value },
    }));
  }

  function handleCheckedChange(e: any) {
    setIsChecked((prev) => !prev);

    const { name, value, checked } = e.target;
    let newMulti = "1";
    if (checked) {
      newMulti = value;
    }

    props.setRatesConfig((prev) => ({
      ...prev,
      expMulti: { ...prev.expMulti, [name]: newMulti },
    }));
  }
}
