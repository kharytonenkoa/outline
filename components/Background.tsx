import bg from '@/public/background-gallery/abstract-figures-dark.jpg'

const Background = () => {
    return ( 
        <div style={{
            backgroundImage: `url(${bg.src})`,
            width: '100%',
            height: '100%' }} className="bg-cover bg-center fixed top-0 left-0 flex z-0">
        </div>
    );
}
 
export default Background;