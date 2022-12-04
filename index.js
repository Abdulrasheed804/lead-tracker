let myLeads = [] 

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const inputBtn2 = document.getElementById("input-btn-2")
const inputBtn3 = document.getElementById("save-btn")

const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

console.log(leadsFromLocalStorage);




if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}
  

inputBtn3.addEventListener("click", function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
      render(myLeads)
     })
    
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
});


inputBtn2.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads) 
 })