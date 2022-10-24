import TimePicker from 'react-time-picker'
import {useEffect, useState} from 'react'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Switch from "react-switch";

function OpeningHours({WorkingHours}){
    const [value, setValue] = useState({
        sun:{
            start:null,
            end:null,
            isOpen:false
        },
        mon:{
            start:null,
            end:null,
            isOpen:false
        },
        tue:{
            start:null,
            end:null,
            isOpen:false
        },
        wed:{
            start:null,
            end:null,
            isOpen:false
        },
        thu:{
            start:null,
            end:null,
            isOpen:false
        },
        fri:{
            start:null,
            end:null,
            isOpen:false
        },
        sat:{
            start:null,
            end:null,
            isOpen:false
        },
    });
    const [checked, setChecked] = useState({
        sunday:false,
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
    });
    useEffect(()=>{
        WorkingHours(value)
    },[checked,value,setValue,setChecked])

   const onSwitch = (e,checked) => {
    //   console.log(e.target.value)
      console.log(checked)

   }
    return <>
        <div className=' ml-3' >
            <ul className='col '>
                    {/* Sunday */}
                <li className='row'>
                        <h4 className='mr-5'>Sun</h4> 
                        <Switch className='mr-3' name='sun'  onChange={(nextChecked) => {setValue((prev)=>{return({...prev,sun:{...prev.sun,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, sunday: nextChecked}})} } checked={checked.sunday}  height={25}/>
                        
                        {checked.sunday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.sun.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,sun:{...prev.sun,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.sun.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,sun:{...prev.sun,end:e.target.value}})})}}/>
                        </div>
                        
                        ):(<h4 className='d-flex  ml-2 text-danger'>Close</h4> )}
                        
                </li>
                    
                    {/* Monday */}
                <li className='row'>
                        <h4 className='mr-5'>Mon</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,mon:{...prev.mon,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, monday: nextChecked}})} } checked={checked.monday}  height={25}/>
                        {checked.monday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                         required value={value.mon.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,mon:{...prev.mon,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                         required value={value.mon.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,mon:{...prev.mon,end:e.target.value}})})}}/>
                        </div>
                    ):(<h4 className='d-flex  ml-2 text-danger'>Close</h4>)}
                </li>
                   
                    {/* Tuesday */}
                <li className='row'>
                        <h4 className='mr-5'>Tue</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,tue:{...prev.tue,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, tuesday: nextChecked}})} } checked={checked.tuesday}  height={25}/>
                        {checked.tuesday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.tue.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,tue:{...prev.tue,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.tue.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,tue:{...prev.tue,end:e.target.value}})})}}/>
                        </div>
                    ):(<h4 className='d-flex  ml-2 text-danger'>Close</h4>)}
                </li>
                    
                    {/* Wednesday */}
                <li className='row'>
                        <h4 className='mr-5'>Wed</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,wed:{...prev.wed,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, wednesday: nextChecked}})} }  checked={checked.wednesday}  height={25}/>
                        {checked.wednesday?(
                        <div className='pl-lg-5 '>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 '
                        type="time" id="appt" name="appt"
                        required value={value.wed.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,wed:{...prev.wed,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.wed.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,wed:{...prev.wed,end:e.target.value}})})}}/>
                        </div>
                    ):<h4 className='d-flex  ml-2 text-danger'>Close</h4>}
                </li>
                    
                    {/* Thursday */}
                <li className='row'>
                        <h4 className='mr-5'>Thu</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,thu:{...prev.thu,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, thursday: nextChecked}})} }  checked={checked.thursday}  height={25}/>
                        {checked.thursday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.thu.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,thu:{...prev.thu,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.thu.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,thu:{...prev.thu,end:e.target.value}})})}}/>
                        </div>
                    ):<h4 className='d-flex  ml-2 text-danger'>Close</h4>}
                </li>
                   
                    {/* Friday */}
                <li className='row'>
                        <h4 className='mr-5'>Fri</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,fri:{...prev.fri,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, friday: nextChecked}})} }  checked={checked.friday}  height={25}/>
                        {checked.friday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.fri.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,fri:{...prev.fri,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.fri.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,fri:{...prev.fri,end:e.target.value}})})}}/>
                        </div>
                    ):(<h4 className='d-flex  ml-2 text-danger'>Close</h4>)}
                </li>
                    
                    {/* Saturday */}
                <li className='row'>
                        <h4 className='mr-5'>Sat</h4> 
                        <Switch className='mr-3' onChange={nextChecked => {setValue((prev)=>{return({...prev,sat:{...prev.sat,isOpen:nextChecked}})});setChecked((prev)=>{ return {...prev, saturday: nextChecked}})} }  checked={checked.saturday}  height={25}/>
                        {checked.saturday?(
                        <div className='pl-lg-5'>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.sat.start} onChange={(e)=>{setValue((prev)=>{return ({...prev,sat:{...prev.sat,start:e.target.value}})})}}/>
                        <label >To:</label>
                        <input
                        style={{"height":"30px"}}
                        className='mx-1 px-1'
                        type="time" id="appt" name="appt"
                        required value={value.sat.end} onChange={(e)=>{setValue((prev)=>{return ({...prev,sat:{...prev.sat,end:e.target.value}})})}}/>
                        </div>
                    ):(<h4 className='d-flex  ml-2 text-danger'>Close</h4>)}
                </li>

            </ul>

        </div>
    </>
}
export default OpeningHours