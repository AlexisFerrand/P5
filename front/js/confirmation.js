let params = new URL(document.location).searchParams;
let orderId = params.get("order");
const confirmation = document.getElementById("orderId");
confirmation.innerHTML = orderId;