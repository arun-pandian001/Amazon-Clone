import { cart } from "../../data/cart.js";
import { products } from "../../data/product.js";
import { Deliveryoption } from "../../data/deliveryoptiondata.js";



export function paymentsummary(){
  let paymenthtml='';
  let quantity=0;
    let itemcost =0;
    let Shippingcost=0;

    cart.forEach((items)=>{
     quantity += items.quantity
    })

cart.forEach((cartitem) => {
    let matched;
    let shippingcostmatched;
   products.forEach((productitem)=>{
        if(productitem.id === cartitem.productsId){
            matched = productitem
        }
   })
   Deliveryoption.forEach((Deliveryoption)=>{
    if( cartitem.Deliveryoptionid === Deliveryoption.id){
       shippingcostmatched = Deliveryoption.price
    }
   })
  itemcost +=  cartitem.quantity * matched.priceCents
  Shippingcost += shippingcostmatched
  
  const beforetax= itemcost + Shippingcost;
  const tax = Math.round( beforetax * 0.1)
  const ordertotal = beforetax + tax

   paymenthtml =     
      ` <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">${itemcost.toLocaleString('en')}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${Shippingcost.toLocaleString('en')}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${beforetax.toLocaleString('en')}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${tax.toLocaleString('en')}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:${ordertotal.toLocaleString('en')}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
  
  
     
});
 
document.querySelector(".payment-summary").innerHTML =paymenthtml

}
