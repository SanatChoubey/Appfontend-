import React, { useState } from 'react';
import {Dropdown, Input, Button} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom'
import addTransactionvalidation from '../validation/index';
import moment from 'moment'
import fetchfunction from '../fetch/index';
const AddTransction  = () => {
  const [adddata, setaddData] = useState({
    description: '',
    amount: 0,
    date: '',
    runningBalance: 2000,
    type: '',
    error: {
    description: '',
    amount: '',
    date: '',
    runningBalance: '',
    type: ''
    }
  })
  const history = useHistory();

  return (
    <div className="App-header">
      Add Transacation
      {/* <div style={{width:'80%', height:'50vh', background:'#ffff'}}> */}
        <label>
          {
           adddata.error.type
          }
        </label>
      <Dropdown
        placeholder='Select'
        fluid
        onChange={(e, {value})=>{
          console.log(value)
          setaddData({
            ...adddata,
            type: value
          })
        }}
        selection
        style={{width:'300px', marginTop:20, marginLeft:'30px'}}
        options={[{
          key: 'Credit',
          text: 'Credit',
          value: 'Credit',},
          {
          key: 'Debit',
          text: 'Debit',
          value: 'Debit'}]}
      />
      <label>
          {
           adddata.error.amount
          }
        </label>
      <Input onChange={(event)=>{
        console.log(event.target.value)
        setaddData({
          ...adddata,
          amount: event.target.value
        })
      }}  type="number"  placeholder='Amount' style={{marginLeft:'30px', marginTop:'20px'}} />
      <label>
          {
           adddata.error.description
          }
        </label>
      <Input onChange={(event)=>{
        setaddData({
          ...adddata,
          description: event.target.value
        })
      }}  placeholder= 'description' style={{marginLeft:'30px', marginTop:'20px'}} />
      <Button onClick={async()=>{
        const valid = addTransactionvalidation(adddata)
        console.log(valid)
        if(!valid){
          var CurrentDate =  moment().unix();
          if(adddata.type=='Credit'){
            const body = {
              "description": adddata.description,
                "debit": 0,
                "credit": adddata.amount,
                "date": CurrentDate,
                "runningBalance": adddata.runningBalance
            }
            const result = await fetchfunction('post', 'transaction', body)
            console.log('reslt', result)
            if(result.status===201){
            console.log(result)
            history.push('/')
            }
          }else{
            const body = {
              "description": adddata.description,
                "debit": adddata.amount,
                "credit": 0,
                "date": CurrentDate,
                "runningBalance": adddata.runningBalance
            }
            const result = await fetchfunction('post', 'transaction', body)
            console.log('reslt', result)
            if(result.status===201){
            console.log(result)
            history.push('/')
            }
          }
          // console.log(CurrentDate)
        }else{
          setaddData({
            ...adddata,
            error: valid
          })
        }
      }} color='green' style={{marginLeft:'30px', marginTop:'20px'}}>
        SAVE
      </Button>
      <Button onClick={()=>{
        history.push('/')
      }} color="red" style={{marginLeft:'30px', marginTop:'20px'}}>
        CANCEL
      </Button>
      </div>
      
    // </div>
  )
}
export default AddTransction;
