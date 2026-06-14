import Link from "next/link";

type NavLinkProps = {
  href: string;
  name: string;
  level: number;
  icon: string;
  iconColor?: string;
};

export default function NavLink({ href, name, level, icon, iconColor }: NavLinkProps) {
  return (
    <Link className={`nav__link nav__link--lvl${level}`} href={href}>
      <span
        className="nav__icon"
        style={iconColor ? { color: iconColor } : undefined}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <div className="nav__text">{name}</div>
    </Link>
  );
}
