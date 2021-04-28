import Circles from './Loaders/Circles.tsx'
import Rings from './Loaders/Rings.tsx'
import PacMan from './Loaders/PacMan.tsx'
import MyBarLoader from './Loaders/MyBarLoader.tsx'

interface Type {
    type: string
}

const Loader: Function = (props: Type) => {
    switch(props.type) {
        case 'rings': {
            return <Rings />
        }
        case 'circles': {
            return <Circles />
        }
        case 'pacman': {
            return <PacMan />
        }
        case 'barloader': {
            return <MyBarLoader />
        }
        default: {
            break;
        }
    }
}

export default Loader;