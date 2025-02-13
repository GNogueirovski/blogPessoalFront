import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center py-6 px-4 shadow-md text-white bg-gradient-to-b from-verygrey to-heavyorange">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold text-heavyorange'>
                            Blog Pessoal Generation | Copyright: {data}
                        </p>
                    <p className='text-lg text-verygrey'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2 text-verygrey'>
                        <LinkedinLogo size={48} weight='bold' />
                        <InstagramLogo size={48} weight='bold' />
                        <FacebookLogo size={48} weight='bold' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer