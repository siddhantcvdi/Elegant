import React from "react";

interface InputProps {
  id: string;
  type: string;
  title: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  value: any;
}

const Input = (props: InputProps) => {
  console.log(props);
  if (props.type === "area") {
    return (
      <>
        <div className="flex flex-col text-xs gap-1">
          <label htmlFor={props.id}>{props.title}</label>
          <textarea
            id={props.id}
            className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md h-32 resize-none"
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
        </div>
      </>
    );
  } else
    return (
      <div className="flex flex-col text-xs gap-1 text-neutral-600 font-medium">
        <label htmlFor={props.id}>{props.title}</label>
        <input
          type={props.type}
          id={props.id}
          className="text-sm w-full sm:w-[70%] p-2 border-[1px] border-gray-200 rounded-md"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        />
      </div>
    );
};

export default Input;
