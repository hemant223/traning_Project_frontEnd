import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({name : 'vendor.db'});


// Create table after call this function
export const createTable = ()=>{
  db.transaction(function(txn){
    txn.executeSql(
        'CREATE TABLE IF NOT EXISTS Vendor_Table(transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,vendor_id INTEGER ,vendor_name VARCHAR(30), demand VARCHAR(255), demand_date DATE, remark VARCHAR(255))',
   []
        )
  })
// alert('SQLite Database and Table Successfully Created...')
}



// Insert the data after call this function and put body into it
export const insertRecord = (body)=>{
   console.log('BODY',body)
    db.transaction(function(txn){
      txn.executeSql(
          'insert into Vendor_Table(vendor_id,vendor_name,demand,demand_date,remark)values(?,?,?,?,?)',[body.vendor_id,body.vendor_name,body.demand,body.demand_date,body.remark],
    
          (error,results)=>{
             if(results.rowsAffected>0){
        console.log('Results',results.rowsAffected)
     return true
     
     }
     else{
        return false
     }
     
    }
 )   
    })
   
  }



// delete the table when call this Function
  export const deleteTable = ()=>{
    db.transaction(function(txn){
      txn.executeSql(
          'DROP TABLE Vendor_Table',[]
          )
    })
  }
 
  // delete the all rows data when call this Function
  export const deleteTableRows = ()=>{
    db.transaction(function(txn){
      txn.executeSql(
          'DELETE FROM Vendor_Table',[]
          )
    })
  }
 
 

   //To Read the Data 
  export const ReadAll=(setDataaa)=>{
            var records=[]
    db.transaction((tx)=>{
                tx.executeSql(
                    'SELECT * FROM Vendor_Table',
                    [],
                    (tx, results)=>{
                     for (let i = 0; i < results.rows.length; i++) {
                        records.push(results.rows.item(i))

                    }
                    setDataaa(records)
                    console.log('recordssss51',records);
                    return (records)
                }
                )
               
            })
  }
