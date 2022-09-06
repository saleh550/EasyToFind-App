import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsScissors} from 'react-icons/bs'
import PlaceItem from '../components/PlaceItem'




function Home(){
    const {user}=useSelector(state=>state.auth)
    // console.log(user.name)
    const navigate=useNavigate()
    return(
        <>

        
      
           <header className='home-header'>
           <div className='home-profile'>
           <ul>
            <li><div onClick={()=>{navigate('/')}}> <BsScissors style={{"fontSize":"150%" }} /> <h3>Barber Shop</h3></div></li>
            <li><div>
                {user?(
                    <>
                    <p>{user.name}</p>
                    <img src={user.imageUrl?user.imageUrl:"https://img-c.udemycdn.com/user/200_H/anonymous_3.png"}/>
                    </>  
                ):(
                <h3 onClick={()=>navigate('/login')} className='btn-logout'>login</h3>
                )}
            </div></li>
           </ul>
           </div>
            <section className='home-search'>
            <div className='search'>
                 <AiOutlineSearch  style={{"color":"#555","fontSize":"20px"}}/>
                <input placeholder='Search For Places'/>
            </div>
            </section>
           </header>
            {/* map function: */}
            <div >
            <div className='row home-main'>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem />
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem/>
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem/>
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem/>
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem/>
                    </div>
                    <div className='col-sm-6 col-md-4 col-lg-3 sa'>
                    <PlaceItem/>
                    </div>
           </div>
            </div>
           
           {/* <div className='container'>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-3" style={{"backgroundColor":"red"}}>
      1 of 2
    </div>
    <div class="col">
      2 of 2
    </div>
  </div>
  
</div> */}
           </>
           
           
       
    )
}
export default Home 