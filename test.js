
let i = 0;
while ( i < 10){
    try{
        if( i === 3 ){
            const response = fetch('https://www.instagram.com/accounts/login/?source=auth_switcher');
            console.log(response);
        }
        console.log(i);
    }
    catch{
        console.log("tinega")
        continue;
    }
    i++
}