/**
 * ========================================================================================
 * @file Folder.tsx - ui wrapper for nestable directory lists
 * ========================================================================================
 * @description
 * - renders the expandable folder grouping in the navigation sidebar
 * - wraps child nodes in a data-attributed container for the state controller
 * @see /src/modules/nav/Panel.tsx/, /src/modules/nav/states.tsx/
 */

type FolderProps = {
  name: string;
  level: number;
  chevron: string;
  children: React.ReactNode;
};

export default function Folder({ name, level, chevron, children }: FolderProps) {
  return (
    <div className="nav__folder">
      <a className={`nav__link nav__link--lvl${level}`} href="#">
        <span className="nav__icon" dangerouslySetInnerHTML={{ __html: chevron }} />
        <div className="nav__text">{name}</div>
      </a>
      <div className="nav__list" data-folder-key={name}>{children}</div>
    </div>
  );
}
