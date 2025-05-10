"use client";

import React, { useState } from "react";
import { motion } from "@/components/ui/motion";

const fadeIn = {
  keyframes: [
    { opacity: 0, transform: "translateY(-10px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  options: {
    duration: 300,
    easing: "ease-out",
    fill: "both" as const,
  },
};

const fadeOut = {
  keyframes: [
    { opacity: 1, transform: "translateY(0)" },
    { opacity: 0, transform: "translateY(-10px)" },
  ],
  options: {
    duration: 300,
    easing: "ease-out",
    fill: "both" as const,
  },
};

const Example: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        {open ? "Ukryj panel" : "Pokaż panel"}
      </button>
      <motion.div
        show={open}
        initial={fadeIn}
        exit={fadeOut}
        className="mt-4 rounded bg-gray-100 p-6 shadow"
      >
        <h2 className="mb-2 text-lg font-medium">Panel z animacją</h2>
        <p>
          To jest przykładowa zawartość wewnątrz komponentu Motion. Animacja „fade” plus lekkie
          przesunięcie w pionie.
        </p>
      </motion.div>
    </div>
  );
};

export default Example;
