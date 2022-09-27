function ImagesCarousel({place}){
    return(
        <div className="carousel-image">
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-interval="100000"
            >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    {place.photos?<img src={`${process.env.REACT_APP_GOOGLE_REQUIST_PHOTO}photo_reference=${place.photos[0]}&key=${process.env.REACT_APP_API_KEY}&maxheight=300&maxwidth=300`} class="d-block w-100" alt="image"/>:<img src="https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=" class="d-block w-100" alt="image"/>}
                </div>
                {place.photos&&place.photos.map((reference)=>{ return( <div className="carousel-item">
                <img src={`${process.env.REACT_APP_GOOGLE_REQUIST_PHOTO}photo_reference=${reference}&key=${process.env.REACT_APP_API_KEY}&maxheight=300&maxwidth=300`} className="d-block w-100" alt="image"/>
                </div>)})}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
            >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden"></span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
            >
       
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden"></span>
            </button>
            </div>
           
            
        </div>
    )
}
export default ImagesCarousel
