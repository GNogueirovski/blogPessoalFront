import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

interface CardPostagensProps {
    postagem: Postagem // Indicamos que a prop postagem é um Objeto (do Tipo/da Model) Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {   // Passamos a props postagem para o card

    const { usuario } = useContext(AuthContext);


    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>

            <div>
                <div className="py-2 px-6 bg-darkorange text-white font-bold text-2xl">
                    <h3 className='text-lg font-bold text-center uppercase'>
                       POR: {postagem.usuario?.nome}
                       <p>Tema: {postagem.tema?.descricao}</p>
                    </h3>
                </div>
                <div className='p-6 '>
                    <h4 className='text-lg font-semibold uppercase'>{postagem.titulo}</h4>
                    <p>{postagem.texto}</p>
                    
                    <p>{new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>

            {
                postagem.usuario?.id === usuario.id &&
                (
                    <div className="flex">
                        <Link to={`/editarpostagem/${postagem.id}`}
                            className='w-full text-slate-100 bg-heavyorange hover:bg-green-700
                            flex items-center justify-center py-2'>
                            <button>editar</button>
                        </Link>
                        <Link to={`/deletarpostagem/${postagem.id}`}
                            className='text-slate-100 bg-heavyorange hover:bg-red-700 w-full 
                            flex items-center justify-center'>
                            <button>deletar</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default CardPostagem 