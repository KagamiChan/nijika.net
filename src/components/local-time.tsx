"use client";

import { cn } from "~/lib/utils";

interface LocalTimeProps {
  date: string;
  className?: string;
}

export const LocalTime = ({ date, className }: LocalTimeProps) => {
  return (
    <time
      dateTime={date}
      className={cn(className, "mb-2 block text-xs text-gray-600")}
      suppressHydrationWarning
    >
      {new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZoneName: "long",
      }).format(new Date(date))}
    </time>
  );
};
