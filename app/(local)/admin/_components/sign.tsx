import React from "react";

interface SignProps {
  content: string;
}
const Sign = ({ content }: SignProps) => {
  return <h3 className={"text-sm text-muted-foreground"}>{content}</h3>;
};

export default Sign;
