import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome, faSearch, faBook, faCog } from '@fortawesome/free-solid-svg-icons';
import './MainMenu.scss';

interface MainMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MainMenu = ({ isOpen, onClose }: MainMenuProps) => {
    return (
        <>
            {/* Keeping the styles in the scss file so we can have cleaner JSX considering the complexity of the styles */}
            <div className={`main-menu ${isOpen ? 'main-menu--open' : ''}`}><div className="main-menu__header">
                    <button className="p-2 main-menu__close" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <ul className="main-menu__list flex flex-col gap-4 font-bold font-[Lora] text-xl">
                    <li className="main-menu__item"><FontAwesomeIcon icon={faHome} /> Home</li>
                    <li className="main-menu__item"><a href="#"><FontAwesomeIcon icon={faSearch} /> Search</a></li>
                    <li className="main-menu__item"><FontAwesomeIcon icon={faBook} /> My Books</li>
                    <li className="main-menu__item"><FontAwesomeIcon icon={faCog} /> Settings</li>
                </ul>
            </div>
        </>
    );
}

export default MainMenu;