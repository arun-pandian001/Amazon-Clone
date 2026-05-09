import { rendersummaryorder } from "./checkout/rendersummaryorder.js";
import { paymentsummary } from "./checkout/paymentsummary.js";
import { cart } from "../data/cart.js";

rendersummaryorder()
if(cart.length>0){paymentsummary()}