
const addTransactionvalidation  = ({description, amount, runningBalance, type })=>{
  if(description&&amount&&runningBalance&&type ){
    return null
  }else{
    return {
      description:description? '':'required',
    amount:amount ?'': 'required',
    runningBalance:runningBalance? '':'required',
    type: type? '':'*required'
    }
  }
}
export default addTransactionvalidation;
