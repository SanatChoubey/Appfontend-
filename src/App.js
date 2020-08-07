import React,{ useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react';
import fetchfunction from './fetch/index';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import moment from 'moment';

const columns = [
  {
    headerName: 'Date',
    field: 'date'
  },
  {
    headerName: 'Description',
    field: 'description',

  },
  {
    headerName: 'Debit',
    field: 'debit',

  },
  {
    headerName: 'Credit',
    field: 'credit'
  },
  {
    headerName: 'RunningBalance',
    field: 'runningBalance'
  }
]
function App() {
  const history = useHistory()
  const [listData, setListData] = useState([])
  const getTransaction  = async() =>{
   const result = await fetchfunction('get', 'transaction')
   
   if(result.status===200){
    const sorted = result.data.data.sort((a,b)=>{
       return b.date-a.date
     })
     console.log(sorted)
     const changeTImedata =  sorted.map((data)=>{
       const dates= moment.unix(data.date)
      
      return {
        ...data,
        date: dates.format('DD/MM/yyyy')
      }
     })
    setListData(changeTImedata)
   }

  }
  useEffect(()=>{
    getTransaction()
  },[])
  return (
    <div className="App-header">
      <h1>
        List of Transaction
      </h1>
      <Button onClick={()=>{
        history.push('/add')
      }} primary>ADD Transcation</Button>
      <div className="ag-theme-alpine" style={ {height: '90vh', width: '600px', marginTop:10} }>
 
      <AgGridReact
            columnDefs={columns}
            rowData={listData}>
        </AgGridReact>
        </div>
    </div>
  );
}

export default App;
