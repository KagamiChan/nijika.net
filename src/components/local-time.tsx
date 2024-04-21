"use client";

import { useMounted } from "~/hooks/use-mounted";
import { cn } from "~/lib/utils";

interface LocalTimeProps {
  date: string;
  className?: string;
}

export const LocalTime = ({ date, className }: LocalTimeProps) => {
  const mounted = useMounted()
  return (
    <time
      dateTime={date}
      className={cn(className, "mb-2 block text-xs")}
      suppressHydrationWarning
      key={mounted ? 'client' : 'server'}
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
