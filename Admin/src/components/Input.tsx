import React, { memo } from "react";

interface InputProps {
  id: string;
  type: string;
  title: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: any;
}

const Input = (props: InputProps) => {
  if (props.type === "area") {
    return (
      <div className="flex flex-col text-xs gap-1">
        <label htmlFor={props.id}>{props.title}</label>
        <textarea
          id={props.id}
          className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md h-32 resize-none"
          value={props.state}
          onChange={(e) => props.setState(e.target.value)}
        />
      </div>
    );
  } else
    return (
      <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
        <label htmlFor={props.id}>{props.title}</label>
        <input
          type={props.type}
          id={props.id}
          className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
          value={props.state}
          onChange={(e) => props.setState(e.target.value)}
        />
      </div>
    );
};

export default memo(Input);
