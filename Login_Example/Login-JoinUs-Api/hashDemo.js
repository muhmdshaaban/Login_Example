const bcrypt=require('bcrypt');

//hash code => one way encryption
async function gen(){
let salt=await bcrypt.genSalt(10);

let hash=await bcrypt.hash('12345',salt);

let result= await bcrypt.compare('12345',hash);
console.log(result);
console.log(hash);
console.log(salt);
}

gen();