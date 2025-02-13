import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
    
    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    return (
        <>
            <div className="w-full flex justify-center py-6 shadow-md bg-gradient-to-b from-darkorange to bg-verygrey text-white">
                <div className="container flex justify-between text-lg mb-7">
                <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    <div className="flex gap-4">
                    Postagens
                    Temas
                    Cadastrar Tema
                    Perfil
                    <Link to='' onClick={logout} className='hover:underline'> Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar