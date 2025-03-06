import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("px-[50px] py-[15px] transition hover:dark:opacity-90", {
        "bg-[--foreground] text-[--background]": variant === "primary",
        "bg-[--background] dark:bg-[#ededed33]": variant === "secondary",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
