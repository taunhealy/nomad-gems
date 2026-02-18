import Link from "next/link";

interface ArrowLinkProps {
  href?: string;
  text: string;
  onClick?: () => void;
  className?: string;
}

export default function ArrowLink({ href, text, onClick, className = "" }: ArrowLinkProps) {
  const content = (
    <>
      <span className="font-sans font-medium text-[16px] text-black uppercase tracking-widest transition-colors group-hover:text-[#f46b6b]">
        {text}
      </span>
      <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#f46b6b]">
        →
      </span>
    </>
  );

  const baseClasses = `group flex items-center gap-2 py-2 ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
