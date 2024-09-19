import checkIcon from "@/assets/icons/ic_check.svg";
import indetIcon from "@/assets/icons/ic_indet.svg";
import designSystem from "@/styles/designSystem";
import { Checkbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

type Size = "h16" | "h20";

type Props = {
  size: Size;
  checkType?: "check" | "indet";
} & Pick<
  CheckboxProps,
  "checked" | "disabled" | "onChange" | "inputProps" | "id"
>;

export default function CheckBox({
  size,
  checkType = "check",
  checked,
  disabled,
  onChange,
  inputProps,
}: Props) {
  return (
    <Checkbox
      icon={<UncheckedIcon $size={size} />}
      checkedIcon={<CheckedIcon $size={size} $checkType={checkType} />}
      disableRipple={true}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      inputProps={inputProps}
      style={{ padding: 0, display: "flex", alignItems: "center" }}
    />
  );
}

const getIcon = (checkType: "check" | "indet") => {
  return checkType === "check" ? checkIcon : indetIcon;
};

const UncheckedIcon = styled.span<{ $size: Size }>`
  width: ${({ $size }) => `${$size === "h16" ? 16 : 20}px`};
  height: ${({ $size }) => `${$size === "h16" ? 16 : 20}px`};
  background-color: ${designSystem.color.neutral.white};
  border: 1px solid ${designSystem.color.neutral.gray400};
  border-radius: 4px;

  .Mui-focusVisible & {
    outline: 2px auto rgba(19, 124, 189, 0.6);
  }

  input:hover ~ & {
    background-color: ${designSystem.color.neutral.gray50};
    border-color: ${designSystem.color.neutral.gray400};
  }

  input:disabled ~ & {
    background-color: ${designSystem.color.neutral.gray50};
    border-color: ${designSystem.color.neutral.gray200};
  }
`;

const CheckedIcon = styled(UncheckedIcon)<{
  $checkType: "check" | "indet";
  $size: Size;
}>`
  position: relative;
  background-color: ${designSystem.color.primary.blue500};
  border-color: ${designSystem.color.primary.blue500};

  &:before {
    content: "";
    width: ${({ $size }) => `${($size === "h16" ? 16 : 20) - 4}px`};
    height: ${({ $size }) => `${($size === "h16" ? 16 : 20) - 4}px`};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${({ $checkType }) => getIcon($checkType)});
    background-size: contain;
  }

  input:hover ~ & {
    background-color: ${designSystem.color.primary.blue700};
    border-color: ${designSystem.color.primary.blue700};
  }
`;
