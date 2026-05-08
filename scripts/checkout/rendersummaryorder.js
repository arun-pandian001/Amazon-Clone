import { cart , Deliveryoptionupdate} from "../../data/cart.js";
import { products } from "../../data/product.js";
import  dayjs  from " https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { Deliveryoption } from "../../data/deliveryoptiondata.js";
import { paymentsummary } from "./paymentsummary.js";

export function rendersummaryorder(){
let html = '';

cart.forEach((cart)=>{
  let cartitem = cart.productsId;
  let matched;
    
products.forEach((item)=>{
  if(item.id === cartitem)
  {matched = item
    
  }
})
let optionobject;
Deliveryoption.forEach((options)=>{
    if(options.id == cart.Deliveryoptionid){
       optionobject = options
       
    }
})
let days = dayjs()
let adds = days.add(optionobject.deliverydays,'days')
let f =adds.format('dddd, MMMM D')

    html += ` <div class="cart-item-container main${matched.id}">
            <div class="delivery-date">
              Delivery date: ${f} 
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matched.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matched.name}
                </div>
                <div class="product-price">
                  Rs ${matched.priceCents.toLocaleString('en')}
                </div>
                <div class="product-quantity ">
                       <span>
                     Quantity:<span class="quantity-label">${cart.quantity}</span>
                     </span>
                      <input class="input  input${matched.id}"></input>
                   <span class="quantity-select  save${matched.id }">save</span>
                  <span class="update-quantity-link link-primary update-button " data-product-id= "${matched.id}" >
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-button "  data-product-id="${matched.id}">
                    Delete
                  </span>
                </div>
              </div>
          <div class="delivery-options">
                <div class="delivery-option.ids-title">
                  Choose a delivery option:
                </div>
               ${Deliveryoptionhtml(matched,cart)} 
             </div>
            </div>  
          </div> `
          })
        
document.querySelector(".order-summary").innerHTML=html
      
 function Deliveryoptionhtml(matched,cart){
  let radiohtml='';
  
 Deliveryoption.forEach((Deliveryoption)=>{
  let day=dayjs()
  let add=day.add(Deliveryoption.deliverydays,'days')
  let days= add.format('dddd, MMMM D')
  let price = Deliveryoption.price === 0 ?'Free' :Deliveryoption.price;
let checked = cart.Deliveryoptionid === Deliveryoption.id  ?'checked' : ''
console.log(cart.Deliveryoptionid)

   radiohtml +=        
               `<div class="delivery-option " >
               


                  <input type="radio" ${checked} data-Deliveryoption-id="${Deliveryoption.id}" data-products-id="${cart.productsId}"
                    class="delivery-option-input  options-button "
                    name="delivery-option-1${matched.id} ">
                  <div>
                    <div class="delivery-option-date">
                      ${days}
                    </div>
                    <div class="delivery-option-price">
                      ${price} - Shipping
                    </div>
                  </div>
                </div>`
          
              })

 
return radiohtml
}

let cartitem=document.querySelector(".cart-item")
document.querySelectorAll(".delete-button").forEach((btn)=>{
  btn.addEventListener('click',()=>{
    let data= btn.dataset.productId
  document.querySelector(`.main${data}`).remove()
    deleted(data)   
  })
})
checkoutcount()
function deleted(data){
let match;

cart.forEach((cart)=>{ 
  if(cart.productsId === data){
      match = cart     
  }
})
let index =cart.indexOf(match);
cart.splice(index,1)
paymentsummary()
 localStorage.setItem('cart',JSON.stringify(cart))
 

checkoutcount()
}
function checkoutcount(){
  let counts=0
  cart.forEach((x)=>{
     counts += x.quantity
  })
  if(counts){
  cartitem.textContent=`${counts} item`}
  else{
    cartitem.textContent=`  item`
  }
  
}
let updata;
document.querySelectorAll(".update-button").forEach((upbtn)=>{
  upbtn.addEventListener('click',()=>{
    updata=upbtn.dataset.productId
   let parent1= upbtn.closest(".product-quantity")
   let save=parent1.querySelector(".quantity-select")
  let input =parent1.querySelector('.input')
  input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){checker(input,updata,parent1,save)}
  })
document.querySelector(`.input${updata}`).style.display='inline'
document.querySelector(`.save${updata}`).style.display='inline'

   
  })
})


let parent; let value;

document.querySelectorAll(".quantity-select").forEach((savelink)=>{
  savelink.addEventListener('click',()=>{
    
  parent= savelink.closest(".product-quantity")
  value= parent.querySelector(".input")

  value.style.display='none'
   savelink.style.display='none'
   checker(value,updata,parent)
   
   
  })
});
console.log(cart)
function updatecartquantity(value,id){
  let values=Number(value)
  let matched;
cart.forEach((item)=>{ console.log('i',id)
  if(item.productsId === id)
    {
     matched = item
     console.log( 'm',matched)
    paymentsummary()

  }
  })
  if(matched){
    matched.quantity = values
  }
  console.log(cart)
   localStorage.setItem('cart',JSON.stringify(cart))
   checkoutcount()
}

function checker(value,updata,parent,save){
  if(value.value >=0 && !isNaN(value.value) && value.value.trim() !=="" && value.value<1000)
  { updatecartquantity(value.value,updata)
parent.querySelector(".quantity-label").textContent=value.value;

save.style.display='none';
value.style.display='none';



 }
    else{
    alert('Enter the valid number')
    }
}

document.querySelectorAll(".options-button").forEach((option)=>{
 option.addEventListener('click',()=>{
 
 let {deliveryoptionId, productsId} = option.dataset; 
    Deliveryoptionupdate(deliveryoptionId,productsId)
    rendersummaryorder()
    paymentsummary()
   
 })
})}

rendersummaryorder()


   