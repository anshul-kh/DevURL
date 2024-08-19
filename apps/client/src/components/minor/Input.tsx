import React from "react";

interface Dashboard_InputProps {
  title: string;
  className?: string;
  value: string;
  setValue: (value: string) => void;
}

export const Dashboard_Input: React.FC<Dashboard_InputProps> = ({
  title,
  className,
  value,
  setValue,
}) => {
  return (
    <input
      className={`bg-anti-flash_white ${className} text-center outline-none`}
      placeholder={`Enter Text Here (eg:${title})`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
