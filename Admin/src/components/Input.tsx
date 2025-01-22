import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id?: string;
  type: string;
  title: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
  state: any;
  className?: string;
}

const Input = (props: InputProps) => {
  if (props.type === "area") {
    return (
      <div className="flex flex-col text-xs gap-1"> 
      {props.title === ""?<></>: <label htmlFor={props.id}>{props.title}</label>}
        <textarea
          id={props.id}
          className={twMerge("text-sm p-2 border-[1px] w-fit border-gray-200 rounded-md h-32 resize-none", props.className)}
          value={props.state}
          onChange={(e) => props.setState(e.target.value)}
        />
      </div>
    );
  } else
    return (
      <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
        {props.title === ""?<></>: <label htmlFor={props.id}>{props.title}</label>}
        <input
          type={props.type}
          id={props.id}
          className={twMerge("text-sm p-2 w-fit border-[1px] border-gray-200 rounded-md", props.className)}
          value={props.state}
          onChange={(e) => props.setState(e.target.value)}
        />
      </div>
    );
};

export default memo(Input);
