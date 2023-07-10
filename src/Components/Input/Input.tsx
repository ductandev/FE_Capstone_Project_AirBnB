"use client";

import { watch } from "fs";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  onInput: (e: React.ChangeEvent<any>) => any;
  name: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  onInput,
  name,
}) => {

  return (
    <div className="w-full relative">
      <input
        name={name}
        onInput={onInput}
        id={id}
        disabled={disabled}
        placeholder=" "
        type={type}
        className={`
            peer
            w-full
            pt-6
            font-light
            bg-white
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            pl-4
            `}
      />
      <label
        className={`
        absolute 
        text-md
        duration-150 
        transform 
        -translate-y-3
        top-5 
        z-10 
        origin-[0] 
        left-4
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus: scale-75
        peer-focus:scale-75
        peer-focus:-translate-y-4
        peer-focus: -translate-y-4
        text-zinc-400
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
