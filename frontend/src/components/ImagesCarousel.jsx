function ImagesCarousel({place}){



    return(
        <>
         <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-interval="100000"
    >
      <div className="carousel-inner">
      <div className="carousel-item active">
        {place.photos?<img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photos[0]}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} class="d-block w-100" alt="image"/>:<img src="https://cdn.pixabay.com/photo/2017/10/06/19/20/fantasy-2824304__340.jpg" class="d-block w-100" alt="image"/>}
        
        </div>
        {place.photos&&place.photos.map((reference)=>{ return( <div className="carousel-item">
                <img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} className="d-block w-100" alt="image"/>
            </div>)
           
        })}
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
        {/* <div className="carousel-item active">
        {place.photos?<img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photos[0]}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} class="d-block w-100" alt="image"/>:<img src="https://cdn.pixabay.com/photo/2017/10/06/19/20/fantasy-2824304__340.jpg" class="d-block w-100" alt="image"/>}
        
        </div>
        {place.photos&&place.photos.map((reference)=>{ return( <div className="carousel-item">
                <img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} className="d-block w-100" alt="image"/>
            </div>)
           
        })} */}
        </>
    )
}
export default ImagesCarousel
{/* <div className="carousel-item active">
{place.photos?<img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${place.photos[0]}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} class="d-block w-100" alt="image"/>:<img src="https://cdn.pixabay.com/photo/2017/10/06/19/20/fantasy-2824304__340.jpg" class="d-block w-100" alt="image"/>}

</div>
{place.photos&&place.photos.map((reference)=>{ return( <div className="carousel-item">
        <img src={`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${reference}&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300`} className="d-block w-100" alt="image"/>
    </div>)
   
})} */}

{/* <img src='https://maps.googleapis.com/maps/api/place/photo?photo_reference=AeJbb3dkp0DNPn0n5sYFMdpyykYpz_o57H488Y5Szt7--VL7tree7N-wgCqcRwHJhb26BYpX9eFnpWf_J5OVSzJ4XMsnSwDPd-svDohHq3tSGsMldkiVB25FQVpPBw6bFX4Cx98_lEB7zYzt1tpl2xKsnDkW2Hs2Iu6GBaf45XClgMOySZHQ&key=AIzaSyBIe2QFVIIH3xniljRlgqJLCB9dhbjtSxg&maxheight=300&maxwidth=300'/> */}