"use client";
import React, { useEffect, useState } from "react";

import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

// Componente principal con datos de ejemplo
export const PDFButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button size="sm" className="gap-1 text-xs" asChild>
      <a download="resume.pdf">
        <FileText className="size-3" />
        PDF
      </a>
    </Button>
  );
};
