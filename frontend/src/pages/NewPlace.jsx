import Header from "../components/Header"
import OpeningHours from "../components/OpeningHours";
import Map from "../components/Map";
import {useState} from 'react'

function NewPlace(){
    const [workingHours,setWorkingHours]=useState()
    const WorkingHours=(workHours)=>{
        setWorkingHours(workHours)
    }

    return(
        <>
            <div className="home-header">
                <Header/>
            </div>
            <div className="mt-5 ml-3 mr-3">
                <form >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label >Business Name:</label>
                        <input type="name" className="form-control" id="inputEmail4" placeholder="Name"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label >Phone Number:</label>
                        <input type="name" className="form-control" id="inputEmail4" placeholder="Phone"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
                    </div>
                    <div className="form-group col-md-6 col-sm-2 ">
                        <label for="floatingTextarea2">Description:</label>
                        <textarea className="form-control " placeholder="Leave a description about your business here" id="floatingTextarea2" style={{"height":"100px","width":"100%"}}></textarea>
                        <h4 className="my-3">Opening Hours :</h4>
                        <OpeningHours WorkingHours={WorkingHours}/>
                        
                    </div>
                    <div className="form-group col-md-6 col-sm-2 ">
                        <label for="floatingTextarea2">Set your Location Business:</label>
                        <Map/>
                    </div>

                </div>
                
                
                </form>
            </div>
        </>
        
    )

}
export default NewPlace