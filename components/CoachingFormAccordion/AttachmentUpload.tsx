"use client";

import * as React from "react";
import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AttachmentUpload({
  name,
  onChange,
}: {
  name: string | null;
  onChange: (name: string | null) => void;
}) {
  const input = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);
  const [error, setError] = React.useState("");
  const choose = (file?: File) => {
    if (!file) return;
    if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
      setError("Choose a PDF or Word document.");
      return;
    }
    setError("");
    onChange(file.name);
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-medium leading-7 text-gray-800">
        Attach a document (optional)
      </p>
      <input
        ref={input}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        aria-label="Attach a document"
        onChange={(event) => choose(event.target.files?.[0])}
      />
      {name ? (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 px-4 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <FileText className="size-5 text-blue-700" aria-hidden />
          </div>
          <span className="min-w-0 flex-1 break-words text-sm text-gray-700">
            {name}
          </span>
          <Button
            type="button"
            variant="tertiary"
            size="icon"
            aria-label="Remove attachment"
            onClick={() => {
              onChange(null);
              if (input.current) input.current.value = "";
            }}
          >
            <Trash2 aria-hidden />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-400 py-8",
            dragging && "bg-blue-25",
          )}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            choose(event.dataTransfer.files?.[0]);
          }}
        >
          <p className="text-sm font-medium leading-5 text-gray-800">
            Drag file to upload or
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => input.current?.click()}
          >
            Browse files
          </Button>
        </div>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
