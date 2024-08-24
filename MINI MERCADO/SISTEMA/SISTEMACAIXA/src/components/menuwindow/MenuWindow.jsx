import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';
import { Dash, X } from 'react-bootstrap-icons';
import "./menuwindow.css"
const MenuTauri = () => {
    useEffect(() => {
        document.getElementById('titlebar-minimize').addEventListener('click', () => appWindow.minimize());
        // document.getElementById('titlebar-maximize').addEventListener('click', () => appWindow.toggleMaximize());
        document.getElementById('titlebar-close').addEventListener('click', () => appWindow.close());

        return () => {
            document.getElementById('titlebar-minimize').removeEventListener('click', () => appWindow.minimize());
            //   document.getElementById('titlebar-maximize').removeEventListener('click', () => appWindow.toggleMaximize());
            document.getElementById('titlebar-close').removeEventListener('click', () => appWindow.close());
        };
    }, []);

    return (
        <div className="top-bar">
            <h1 id="title-top-bar">sistema pdv</h1>
            <div data-tauri-drag-region className="title-bar">
                <div className="titlebar-button" id="titlebar-minimize">
                    <Dash size={30} id='minimize' />
                </div>
                <div className="titlebar-button" id="titlebar-close">
                    <X size={30} id='close' />
                </div>
            </div>
        </div>
    );
}

export default MenuTauri;