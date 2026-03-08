interface MethodBadgeProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
}

const methodStyles: Record<string, string> = {
  GET: "method-badge method-get",
  POST: "method-badge method-post",
  PUT: "method-badge method-put",
  DELETE: "method-badge method-delete",
};

const MethodBadge = ({ method }: MethodBadgeProps) => {
  return <span className={methodStyles[method]}>{method}</span>;
};

export default MethodBadge;
