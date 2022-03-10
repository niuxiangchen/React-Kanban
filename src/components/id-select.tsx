import { Raw } from "../types";
import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectPros
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * value可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true的时候 代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
export const IdSelect = (props: IdSelectPros) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        //  toNumber会被所有无意义的值转换为0 所以这是默认的
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option value={option.id}>{option.name}</Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
