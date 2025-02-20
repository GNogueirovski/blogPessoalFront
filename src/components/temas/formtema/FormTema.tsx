import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {

    // Hook para gerenciar a navegação do usuário
    const navigate = useNavigate();

    // Váriavel de Estado que recebe os dados de um Tema
    const [tema, setTema] = useState<Tema>({} as Tema)

    // Variavel de Estado que serve para indicar que existe um carregamento ocorrendo
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // useContext acessa nosso contexto, buscando dele as informações necessárias para esse Componente
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Hook que pega uma variavel que foi passada pela rota do navegador - similar ao PathVariable do back
    const { id } = useParams<{ id: string }>();

    // Função que chama a service buscar() para receber os dados de um Tema especifico - usada na atualização
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
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
            alert('Você precisa estar logado!')
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

    // Função que pega os dados do Formulário e atualiza a Variavel de Estado Tema
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    // Função que envia o usuário para a rota de listagem de temas
    function retornar() {
        navigate("/temas")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;