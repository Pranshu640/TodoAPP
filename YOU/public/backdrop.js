let body = document.querySelector('body');
console.log('fsdf');



function rgb(r,g,b,a) {
    return 'rgba(' + [(r||0),(g||0),(b||0),(a||0)].join(',') + ')';
}

// while (true){
//     let a = 43,b = 0,c = 171;
//     if(a<43 || c<171 ){
//         a+=1;
//         body.style.backgroundColor = rgb(a,b,c,1);
//         c+=1;
//     }else if(a>63 || c> 191){
//         a-=1;
//         body.style.backgroundColor = rgb(a,b,c,1);
//         c-=1;
//     }
// }
let a = 4,b = 0,c = 31;
setInterval(() => {
    if ( c ==31){
        color = true
    }else if ( c == 200){
        color = false;
    }
    if(color){
        // a+=0.25;

        c+=0.25;
    }else{
        // a-=0.25;
        c-=0.25;
    }
    // console.log(a,c);
    body.style.backgroundImage = 'linear-gradient(to bottom right,'+ rgb(a,b,c,1)+','+ rgb(0,0,0,1)+')';
}, 33.33);

