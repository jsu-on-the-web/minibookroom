import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './Header.scss';

interface HeaderProps {
    title: string,
    onMenuClick: () => void,
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
    return (
        <header className="w-full mb-4 shadow-md bg-stone-300 header">
            <div className="w-full px-4 py-4 mx-auto header-container">
                <nav className="flex items-center justify-between header-nav">
                    <FontAwesomeIcon icon={faBars} id="header-menu" className="text-xl cursor-pointer header-icon" onClick={onMenuClick} />
                    <h1 className="header-title text-black-800">{title}</h1>
                    <FontAwesomeIcon icon={faUserCircle} id="header-user" className="text-xl header-icon" />
                </nav>
            </div>
        </header>
    );
}