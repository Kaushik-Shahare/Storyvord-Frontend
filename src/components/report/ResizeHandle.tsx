import { PanelResizeHandle } from "react-resizable-panels";

interface ResizeHandleProps {
  className?: string;
  id?: string;
}

export default function ResizeHandle({ className = "", id }: ResizeHandleProps) {
  return (
    <PanelResizeHandle
      id={id}
      className={`relative outline-none flex-none basis-2 group ${className}`}
      style={{ "--background-color": "transparent" } as React.CSSProperties}
    >
      <div className="absolute inset-[0.25em] hidden group-hover:block rounded-[0.25em] bg-[var(--background-color)] transition-colors duration-200 ease-linear border-2 border-green-300" />
    </PanelResizeHandle>
  );
}
