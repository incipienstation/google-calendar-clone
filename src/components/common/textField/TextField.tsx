import { ChangeEventHandler } from "react";
import "./TextField.styles.scss";

const TextField = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange?: ChangeEventHandler;
}) => {
  return (
    <>
      <input placeholder={placeholder} autoFocus onChange={onChange} className="text-field" />
    </>
  );
};

export default TextField;
