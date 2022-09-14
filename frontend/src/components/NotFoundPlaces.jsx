import {FaSearchLocation} from 'react-icons/fa'

function NotFoundPlaces(){
    return(
        <div  className="container text-center">
            <h1 className="mt-5 text-danger">Oops!!</h1>
            <h1 className="text-dark"><FaSearchLocation className='text-secondary' style={{"fontSize":"150%"}} />Not founded places !</h1>
            <h4 className="text-secondary">Search for places to get cards <br/> that include information about spicifice place </h4>
           
        </div>
    )
}

export default NotFoundPlaces