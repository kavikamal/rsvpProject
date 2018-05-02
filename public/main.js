// When event form button is clicked
 

function submitRSVP(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    //var radios = document.getElementsByName('attending');
    let isAttending;
    let attending = Array.from(document.getElementsByName("attending")).find(r => r.checked).value;
    attending=='0'?isAttending=false:isAttending=true;
    
    let numGuests = document.getElementById("numOfGuests").value;
    
    const postRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, email: email, attending: isAttending, numGuests: numGuests}),
    }
    fetch('/reply', postRequestOptions)
        .then(response => response.json())
        .then(data => {

        })
    .catch(error => {
        console.log("An error has occurred when attempting to Fetch:", error);
    })
}

// When event form button is clicked
document.getElementById("rsvpBtn").onclick = submitRSVP;

