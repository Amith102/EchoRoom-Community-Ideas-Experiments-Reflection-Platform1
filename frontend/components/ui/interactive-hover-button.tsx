import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-colors",
        "bg-white dark:bg-slate-900",
        "text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {/* DOT */}
        <div className="
          h-2 w-2 rounded-full
          bg-blue-700 dark:bg-blue-300
          transition-all duration-300
          group-hover:bg-blue-600 dark:group-hover:bg-blue-200
          group-hover:scale-[100.8]
        " />

        {/* NORMAL TEXT */}
        <span className="
          transition-all duration-300
          group-hover:translate-x-12
          group-hover:opacity-0
        ">
          {children}
        </span>
      </div>

      {/* HOVER TEXT */}
      <div className="
        absolute top-0 z-10 flex h-full w-full
        translate-x-12 items-center justify-center gap-2
        opacity-0 transition-all duration-300
        group-hover:-translate-x-5 group-hover:opacity-100

        text-blue-600 dark:text-blue-200
      ">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  )
}
