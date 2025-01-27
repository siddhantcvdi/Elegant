import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";

interface DropInputProps {
  items: string[];
  values: string[];
  title: string;
  setState: any;
  className?: string;
  state?: string;
}

const DropInput = (props: DropInputProps) => {
  return (
    <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
      <label>{props.title}</label>
      <Select onValueChange={(value) => props.setState(value)} value={props?.state}>
        <SelectTrigger className={twMerge("font-normal", props.className)}>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{props.title}</SelectLabel>
            {props.items.map((item, index) => (
              <SelectItem key={item} value={props.values[index]}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropInput;
