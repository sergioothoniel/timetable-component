import { useEffect, useRef, useState } from "react"
import { TimetableContainer } from "./styles"


const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

const Timetable = ({ dayOfWeek = daysOfWeek, schedulesDefeault, schedulesConfirmed = [], userId = "user", timetableOwner = "owner", scheduleSubmitFunction = console.log, year}) =>{    
   

    const [week, setWeek] = useState([])

    const [confirmSchedule, setConfirmSchedule] = useState(false)
    const [timeSelect, setTimeSelect] = useState('')
    const [scheduleDate, setScheduleDate] = useState('')

    //const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    
    const today = new Date()
    const day = today.getDate()
      
       
    const currentWeek = (week = 0)=>{
        const arrWeek = []
        const firstDay = day+7*week

        for(let i = firstDay; i<firstDay+7; i++){
            const newDate = new Date(year, today.getMonth(), i)
            arrWeek.push(newDate)
        }
        return arrWeek
    }

    const classSelected = useRef('selected')


    const onClickFunction = (event, appoint, date, time) =>{                  

        if(!!!appoint){

            if(!confirmSchedule || event.target.className === 'selected' ){
                if(!!!event.target.className){
                    event.target.className = 'selected'                    
                    setConfirmSchedule(true)
                    setTimeSelect(time)
                    setScheduleDate(`${date}/${year}`)   

                }
                else{
                    event.target.className = ''                    
                    setConfirmSchedule(false)
                    setTimeSelect('')
                    setScheduleDate('')
                }    
            }                       
        }            
        
          
    }

    const confirmAppointment = () =>{
        const owner = timetableOwner        
        const user = userId
        const date = scheduleDate
        const time = timeSelect

        const appointmentObj = {owner, user, date, time}

        scheduleSubmitFunction(appointmentObj)        

    }   
    
    useEffect(()=>{
        const newWeek = currentWeek()        
        setWeek(newWeek)
    }, [])

    return(
       <TimetableContainer btnConfirm={confirmSchedule}>
           
           <div className="table">
               {week.map(date=>{
                   const dateFormated = date.toLocaleDateString('pt-BR')
                   const appointmentsToday = schedulesConfirmed.filter(appointment => appointment.date === dateFormated)
                   const currentDay = dateFormated.slice(0, -5)
                   const dayOfWeek = daysOfWeek[date.getDay()]
                 

                   return(
                   <div key={currentDay} className="table-column">
                       <span className='currentDay'>{currentDay}</span>
                       <span>{dayOfWeek}</span>
                       {schedulesDefeault.map(horario=>{
                           const appointment =  appointmentsToday.length > 0 ? appointmentsToday.find(appointment => appointment.time === horario) : false
                           const scheduleCheck = !!appointment    
                           
                           if(dayOfWeek === 'Sab' || dayOfWeek === 'Dom'){
                               return(
                                   <span id='fds' key={horario}>

                                   </span>
                               )
                           }else{
                               
                               return(
                                <span key={horario}><button ref={classSelected}
                                 id={scheduleCheck ? 'confirmed' : undefined} onClick={(event) => onClickFunction(event, appointment, currentDay, horario)}>
                                    {horario}
                                </button></span>

                               )
                           }                   
                                                     
                                                 
                       })}

                   </div>                   
               )}
               )}
           </div>

          <button className="btn-confirm" onClick={confirmAppointment}>Confirmar Consulta</button>           

       </TimetableContainer>
    )
}

export default Timetable