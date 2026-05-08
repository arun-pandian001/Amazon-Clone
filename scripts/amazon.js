import {cart,Addtocart} from "../data/cart.js";
import { products } from "../data/product.js";



let lists='';
products.forEach((product)=>{
lists +=`  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.images}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            Rs ${product.priceCents.toLocaleString('en')}
          </div>

          <div class="product-quantity-container ">
            <select class='quantity-selector${product.id}'  >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer">
          ${product.keywords}
          </div>

          <div class="added-to-cart  pop-up-msg${product.id}">
            <img src="icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary "
           data-products-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>

`

})
document.querySelector(".container-grid").innerHTML=lists




document.querySelectorAll(".button-primary").forEach((buttons)=>{
   buttons.addEventListener('click',()=>{
    const data= buttons.dataset.productsId;

  let selector = document.querySelector(`.quantity-selector${data}`)
  let quantityselector=Number(selector.value)
  selector.value='1';
 
    Addtocart(data,quantityselector);
    popupmsg(data);
    cartcount();
   
   })
  })

  function popupmsg(data){ 
  
let popmsg =document.querySelector(`.pop-up-msg${data}`)
popmsg.classList.add("updated-cart")
setTimeout(()=>{
  popmsg.classList.remove("updated-cart")
},2000)
  }
 export function cartcount(){
 let carttotal=document.querySelector('.cart-total');

let count=0;
let cartcount=cart.map((x)=>{ count += x.quantity})

if(count){
 carttotal.textContent=count
}
else{
  carttotal.textContent;
}
  }
 
  window.onload=()=>{
    cartcount()
  }
  
  let search=document.querySelector(".search-bar")
  search.addEventListener("input",(e)=>{
  let searcheditem=e.target.value.toLowerCase()
 var searcharray= products.filter(x=>x.name.includes(searcheditem))
 console.log(searcharray)
 filteredarray(searcharray,searcheditem)
  
  })
function filteredarray(arr,letter){
  let letters=letter
 let cards= document.querySelectorAll(".product-container")
cards.forEach((x)=>{ 
 let cardname=x.querySelector(".product-name.limit-text-to-2-lines").textContent.toLowerCase()
 if(cardname.includes(letters)){x.style.display="block"}else{x.style.display="none" }
}

)

}

    
 
