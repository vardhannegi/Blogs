const fs = require('fs');
const http =require('http');
const server = http.createServer((req,res) =>{
    console.log(req.url,req.method);
    res.setHeader('content-Type','text/html');

    let path = './views/instakilo/';
        switch(req.url){
            case '/':
                path += 'index.php'
                res.statusCode = 200;
                break;
            case '/profile':
                path += 'profile.php'
                res.statusCode = 200;
                break;
            case '/welcome':
                path += 'welcome.php'
                res.statusCode = 200;
                break;
            case '/kuchbhe':
                res.setHeader('Location','/welcome');
                res.statusCode = 301;
                res.end();
                break;
            default:
                path += '404.php'
                res.statusCode = 404;
                break;
        }


    fs.readFile(path,(err,data) =>{

        if(err){
            console.log(err);
            res.end();

        }else{
            // res.write(data);
            res.end(data);

        }
    })
});

server.listen(3000,'localhost',() => {
    console.log('listing for request on port 3000');
})