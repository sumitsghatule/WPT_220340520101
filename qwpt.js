const express= require('express');
const app =express();
const mysql=require('mysql2');

app.listen(550,()=>{
    console.log("port listen work");
});

app.use(express.static("statfunc"));

let dbprams={
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'sumit',
	port:3306
}

const conn=mysql.createConnection(dbprams);

app.get("/getdetails",(req,resp)=>{
    console.log("in the get ");
    let bookid=req.query.bookid;
    console.log("connection sucessed");

    let output={ status:false,bookdetails:{bookid:0,bookname:"", price:0 }}
    conn.query('select * from book where bookid=?',[bookid],
    (error,rows) =>{
        if(error){
            console.log("error");
        }
        else{
            if(rows.length>0){
                output.status=true;
                output.bookdetails=rows[0];
            }
            else{
                console.log("error");
            }
        }
        resp.send(output);
    });

});

    app.get("/updatedetails",(req,resp)=>{
        console.log("in the update ");

        let bookdetails={bookid:req.query.bookid,bookname:req.query.bookname,
                              price:req.query.price};

        
    
        let output={ status:false}

        conn.query('update book set bookid=? ,bookname=?,price=?',[bookdetails.bookid , bookdetails.bookname,
                                bookdetails.price],
        (error,res) => {
            if(error){
                console.log("error");
             }
            else{
                if(res.affectedRows>0){
                    output.status=true;
                    console.log("done update");
                    
                }
                else{
                    console.log("error update");
                }
            }
            resp.send(output);
        });
    



});