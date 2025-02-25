import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="flex justify-center bg-verygrey ">
                <div className='container grid grid-cols-2 text-darkorange'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem-vindo!
                        </h2>
                        <p className='text-xl text-heavyorange'>
                            Expresse aqui seus pensamentos e opiniões
                        </p>

                        <div className="flex justify-around gap-4 ">
                            <div className='rounded text-heavyorange border-darkorange border-solid border-2 bg-verygrey'> 
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/7fyx55ocq/gifhome.gif?updatedAt=1739407751453"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>
            <div className="flex py-10">
            <ListaPostagens />
            </div>
        </>
    )
}

export default Home