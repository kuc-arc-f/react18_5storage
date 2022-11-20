import LibStorage from '../lib/LibStorage';
import LibSqlite from '../lib/LibSqlite';
//
const LibTest = {
  /**
  * getRandomStr
  * @param
  *
  * @return
  */
   getRandomStr :function(){
    const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const random = Math.floor( Math.random()* s.length );
    if(random >= s.length){ throw new Error('Error , getRandomStr'); }
   //    console.log(s.length ,random )
   //    console.log(s[random] )
    return s[random]    
  },
  /**
  * getTestContent
  * @param
  *
  * @return
  */  
  getTestContent :function(){
    try{
      let s = ""
      for(let i=0; i< 1000; i++ ){
        s += this.getRandomStr()
      }
//      console.log(s)
      return s
    } catch (err) {
      console.log(err);
      throw new Error('error, getTestContent');
    }    
  },
  /**
  * saveTestData
  * @param
  *
  * @return Promise<void>
  */    
  saveTestData :async function(): Promise<void>
  {
    try{
//      let s = ""
      const db = await LibSqlite.getDb();
      for(let i=0; i< 1000; i++ ){
console.log(i);
        let content =  LibTest.getTestContent();
        const sql = `
        INSERT INTO Post(title, content, CategoryId, createdAt, updatedAt)
         VALUES
        (
          'title_1234,Test,Test', 
          '${content}',
          0,
          DATETIME('now','localtime'), 
          DATETIME('now','localtime')
        );
        `;
        await db.exec(sql);    

      }
      await LibStorage.save(db);
      //      console.log(s)
//      return s
    } catch (err) {
      console.log(err);
      throw new Error('error, saveTestData');
    }    
  },

}
export default LibTest;
