import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (

            <div className='w-full flex justify-center py-6 shadow-md bg-gradient-to-b from-darkorange to bg-verygrey text-white'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Blogaard</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens' className='hover:text-heavyorange'>Postagens</Link>
                        <Link to='/temas' className='hover:text-heavyorange'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:text-heavyorange'>Cadastrar tema</Link>
                        <Link to='/perfil' className='hover:text-heavyorange'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:text-heavyorange'>Sair</Link>
                    </div>
                </div>
            </div>

        )

    }

    return (
        <>
            { component }
        </>
    )
}

export default Navbar