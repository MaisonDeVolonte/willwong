type NavFolderProps = {
  name: string;
  level: number;
  chevron: string;
  children: React.ReactNode;
};

export default function NavFolder({ name, level, chevron, children }: NavFolderProps) {
  return (
    <div className="nav__folder">
      <a className={`nav__link nav__link--lvl${level}`} href="#">
        <span className="nav__icon" dangerouslySetInnerHTML={{ __html: chevron }} />
        <div className="nav__text">{name}</div>
      </a>
      <div className="nav__list">{children}</div>
    </div>
  );
}
