import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    // Hook para gerenciar a navegação do usuário
    const navigate = useNavigate()

    // Váriavel de Estado que recebe os dados de um Tema
    const [tema, setTema] = useState<Tema>({} as Tema)

    // Variavel de Estado que serve para indicar que existe um carregamento ocorrendo
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // useContext acessa nosso contexto, buscando dele as informações necessárias para esse Componente
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Hook que pega uma variavel que foi passada pela rota do navegador - similar ao PathVariable do back
    const { id } = useParams<{ id: string }>()

    // Função que chama a service buscar() para receber os dados de um Tema especifico - usada na atualização
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // Esse useEffect verifica se quando o usuário acessou esse componente, ele tem um token válido
    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate('/')
        }
    }, [token])

    // Esse useEffect verifica se existe um ID, se sim, 
    // quer dizer que estamos fazendo uma atualização e chamamos a função buscarPorId
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // Função que realiza a Exclusão de um Tema
    async function deletarTema() {
        setIsLoading(true)  // Atualiza a Variavel de Estado, indicando que existe uma carregamento ocorrendo

        try {
            await deletar(`/temas/${id}`, { // Chama a service Deletar
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Tema apagado com sucesso!", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta("Erro ao deletar tema!", "erro")
            }
        }

        setIsLoading(false) // Atualiza a Variavel de Estado, indicando que o carregamento parou
        retornar()  // Chama a função retornar()
    }

    // Função que envia o usuário para a rota de listagem de temas
    function retornar() {
        navigate("/temas")
    }

    
    return (
        <div className='container flex flex-col w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-8'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-darkorange text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-700 hover:bg-red-500 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-green-700 
                        hover:bg-green-500 flex items-center justify-center'
                                   onClick={deletarTema}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema