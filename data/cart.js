
import { products } from "./product.js";

 export let cart= JSON.parse(localStorage.getItem('cart')) ||[]
 

 export  function Addtocart(data,quantityselector){
 let matched;
        
       
      cart.forEach((item)=>{
       if(item.productsId === data){
        matched=item;        
        } })

      if(matched){matched.quantity +=quantityselector}
      
       else{ 
          cart.push({
         productsId:data,
         quantity:quantityselector,
         Deliveryoptionid:'1'
       }); 
      }   
      localStorage.setItem('cart',JSON.stringify(cart))

       console.log(cart)
   }
export function Deliveryoptionupdate(deliveryoptionId,productsId){
console.log(deliveryoptionId,productsId)
   let match;

      cart.forEach((item)=>{
       if(item.productsId === productsId){
        match=item;
            
        } 
   }) 
        match.Deliveryoptionid = deliveryoptionId
      localStorage.setItem('cart',JSON.stringify(cart))
  
    console.log(cart)
     


}