import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAcesso = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [inicio, setInicio] = useState(true);
    const [tempoParaExpirar, setTempoParaExpirar] = useState(null);
    const [select, setSelect] = useState(0);

    useEffect(() => {
        const storedValue = localStorage.getItem('selectedItem');
        if (storedValue !== null) {
            setInicio(false)
            const routeIndex = parseInt(storedValue, 10);
            setSelect(routeIndex);
            navigate(getRouteByIndex(routeIndex));
        }
    }, [navigate]);

    function getRouteByIndex(index) {
        switch (index) {
            case 0:
                return '/home/estoque';
            case 1:
                return '/home/pdv';
            case 2:
                return '/home/cadastrar-produtos';
            case 3:
                return '/home/history';
            case 4:
                return '/home/history-fechamento';
            case 5:
                return '/home/clientes-fidelidades';
            default:
                return '/';
        }
    }

    const handleItemClick = (index, to) => {
        setSelect(index);
        localStorage.setItem('selectedItem', index.toString());
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const expirationDate = new Date(decodedToken.exp * 1000);
                const currentDate = new Date();
                // console.log(decodedToken)
                if (expirationDate > currentDate) {
                    setAuthenticated(true);
                    setUserData({ decodedToken, token: token });
                    const diffInMilliseconds = expirationDate - currentDate;
                    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
                    setTempoParaExpirar(diffInSeconds);
                } else {
                    console.log("Token expirado");
                    localStorage.removeItem('token');
                    localStorage.removeItem('token-data');
                    localStorage.removeItem('selecteditem')
                    navigate('/login');
                }
            } catch (error) {
                console.log("Erro ao decodificar token:", error);
                navigate('/login');
            }
        } else {
            console.log("Token não encontrado");
            navigate('/login');
        }
    }, [navigate]);

    return {
        userData,
        handleItemClick,
        setSelect,
        navigate,
        select,
        inicio,
        tempoParaExpirar,
    };
};

export default useAcesso;
