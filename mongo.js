const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

/** 插入数据 */
const insertData = (params) => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(url,(err, db) => {
      if (err) throw err;
      
      searchData({name:params.name}).then(res => {
        if(res.length !== 0) {
          reject(res);  
        }else{
          let dbo = db.db("test");
          // 将数据插入site表
          dbo.collection("site").insertOne(params,(err, res) => {
            if (err) throw err;
            db.close();
            resolve(res);
          });
        }
      })
      
    });
  })
  
}
/** 查询数据 */
const  searchData = (params) => {
  return new Promise(function(resolve,reject) {
    MongoClient.connect(url,(err, db) => {
      if (err) throw err;
      let dbo = db.db("test");
      dbo.collection("site").find(params).toArray((err, res) => { // 返回集合中所有数据
        console.log(res)
        if (err) throw err;
        db.close();
        resolve(res)
      });
    });
  })
} 

/** 更新数据 */
const updateData = (params) => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(url,(err,db) => {
      if(err) throw err;
      let dbo = db.db("test");
      let whereStr = {"name": params.name};
      let updateStr = { $set : {"password": params.password}};
      searchData(whereStr).then(res => {   
        if(res.length === 0) {
          reject(res);  
        }else{
          dbo.collection("site").updateOne(whereStr,updateStr,(err,res) => {
            if(err) throw err;
            db.close();
            resolve(res)
          })
        }
      })
      
    })
  })
}


module.exports = {
  searchData,
  insertData,
  updateData
};