"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsLink extends ButtonBaseProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-10 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, { base: string; fill: string; hover: string }> = {
  primary: {
    base: "border-[#f46b6b] bg-[#f46b6b] text-white",
    fill: "bg-white",
    hover: "hover:text-[#3f1d14]",
  },
  outline: {
    base: "border-current text-current",
    fill: "bg-white",
    hover: "hover:text-[#3f1d14]",
  },
  ghost: {
    base: "border-transparent text-current",
    fill: "bg-white",
    hover: "hover:text-[#3f1d14]",
  },
};

export default function Button({ children, variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const styles = variantClasses[variant];

  const sharedClasses = cn(
    // Base button styles
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "border font-sans font-semibold uppercase tracking-widest leading-none cursor-pointer",
    "transition-colors duration-500 ease-[cubic-bezier(0.3,1,0.3,1)]",
    // Agio asymmetric border-radius
    "[border-radius:2px_2px_20px_2px]",
    // Size
    sizeClasses[size],
    // Variant
    styles.base,
    styles.hover,
    className,
  );

  const fillEl = (
    <span
      className={cn(
        "absolute top-[-50%] left-[-25%] w-[150%] h-[200%] rounded-full pointer-events-none z-0",
        "translate-y-[76%] group-hover/btn:translate-y-0",
        "transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.3,1)]",
        styles.fill,
      )}
    />
  );

  const label = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={sharedClasses} {...rest}>
        {fillEl}
        {label}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={sharedClasses} {...buttonProps}>
      {fillEl}
      {label}
    </button>
  );
}
