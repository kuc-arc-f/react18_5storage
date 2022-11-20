import * as React from 'react';
import { useEffect, useState } from 'react';
//import { useEffect } from 'react';
import LibSqlite from '../lib/LibSqlite';
import LibStorage from '../lib/LibStorage';
import LibTest from '../lib/LibTest';
//
function Page() {
  const [usageValue, setUsageValue] = useState("");

  useEffect(() => {
    (async() => {
      //@ts-ignore
//      const estimatePromise = StorageManager.estimate();
//console.log(estimatePromise);
      navigator.storage.estimate().then(function(estimate) {
        //@ts-ignore
        const d = (estimate.usage / estimate.quota * 100).toFixed(2);
console.log(d);
        setUsageValue(d);
      });
    })()    
   
  }, []);
  //
  const dbSave = async function (){
    const db = await LibSqlite.getDb();
    const sql = `
    INSERT INTO Post(title, content, CategoryId, createdAt, updatedAt)
     VALUES
    (
      't1', 
      'c1',
      'ca11',
      DATETIME('now','localtime'), 
      DATETIME('now','localtime')
    );
    `;
    await db.exec(sql);    
    await LibStorage.save(db);
  }
  //
  const dbGet = async function (){
    const db = await LibStorage.get();
    if(db === null) {
      alert("Error, db is null")
      return;
    }
    await LibSqlite.setImportDb(db);
    let res = JSON.stringify(db.exec("SELECT sqlite_version();"));
    console.log(res)
  }  
  //
  const test = async function (){
    const db = await LibSqlite.getDb();
    let res = JSON.stringify(db.exec("SELECT sqlite_version();"));
    console.log(res);
    res = JSON.stringify(db.exec(`SELECT * FROM Post;`));
    console.log(res)
    res = JSON.stringify(db.exec(`SELECT count(*) FROM Post;`));
    console.log(res)
  }   
  //
  const testData = async function (){
    try{
//      const s = await LibTest.getTestContent()
      await LibTest.saveTestData()
//      console.log(s)
    } catch (e) {
      console.error(e);
      throw new Error('Error , testData');
    }    
  }     
  //
  return (
    <div className="container">
      <h3>Test </h3>
      {/*
      <hr />
      <p>welcome, about</p>
      */}
      <hr />
      <button onClick={() => dbSave()}>save
      </button>
      <hr />
      <button onClick={() => dbGet()}>get
      </button>
      <hr />
      <button onClick={() => test()}>test
      </button>
      <hr />
      <h3>Storage Usage Value</h3>
      {usageValue}
      , percent = {Number(usageValue) * 100} %
      <hr />
      <h3>Test Data</h3>      
      <button onClick={() => testData()}>testData
      </button>
      <hr />
    </div>
  );
}
export default Page;
/* testData
*/