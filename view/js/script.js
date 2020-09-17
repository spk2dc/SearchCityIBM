//function to run when button is clicked
let clickFunc = () => {
  //show loader icon
  document.getElementsByClassName("loader")[0].style.display = 'revert'

  //get input
  let inp = document.getElementById("input").value
  console.log("input: ", inp)

  //if incorrect input then display alert and end function
  if (!inp.match("^[A-Za-z]+$")) {
    alert('Please provide a valid input')
    //hide loader icon
    document.getElementsByClassName("loader")[0].style.display = 'none'
    return;
  }

  //add input to url api call
  let url = `https://jsonmock.hackerrank.com/api/cities/?city=${inp}`

  //make fetch get request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      //hide loader icon
      document.getElementsByClassName("loader")[0].style.display = 'none'

      //show total # of cities
      document.getElementById("totalCount").innerText = `Total cities found: ${data.total}`

      //create tbody on table
      let tbody = document.createElement("tbody")
      document.getElementsByClassName("table")[0].appendChild(tbody)

      //add table row and create variable to check when state changes
      let tr = tbody.insertRow()
      let state
      //loop through all items and add cities to rows
      for(const item of data.data){
        //if new state then add new row
        if(item.state != state){
          state = item.state

          tr = tbody.insertRow()
          let td = document.createElement("td")
          td.innerText = state
          tr.appendChild(td)
        }

        //add cities to current row
        let td = document.createElement("td")
        td.innerText = item.city
        tr.appendChild(td)
      }
    });


  //hide loader icon in case fetch was not successful
  document.getElementsByClassName("loader")[0].style.display = 'none'

}

//add click event to button
document.getElementById("button").addEventListener("click", clickFunc)
