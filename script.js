dat= document.getElementById('date')

const d= new Date()
dat.innerHTML= "Date\n"+d.toLocaleDateString()

tim=document.getElementById('time')
setInterval(()=>{
    const d= new Date()
    tim.innerHTML= "Time\n"+d.toLocaleTimeString()
},1000)

function getAndUpdate(){
    console.log("updating list")
    tit=document.getElementById('title').value
    desc=document.getElementById('description').value
    if(localStorage.getItem('itemsJson')==null){
        itemJArr=[];
        itemJArr.push([tit,desc])
        localStorage.setItem('itemsJson',JSON.stringify(itemJArr))
    }
    else{
        itemJArrStr =localStorage.getItem('itemsJson')
        itemJArr =JSON.parse(itemJArrStr)
        itemJArr.push([tit,desc])
        localStorage.setItem('itemsJson',JSON.stringify(itemJArr))
    }
    update()
}

function update(){
    if(localStorage.getItem('itemsJson')==null){
        itemJArr=[];
        localStorage.setItem('itemsJson',JSON.stringify(itemJArr))
    }
    else{
        itemJArrStr =localStorage.getItem('itemsJson')
        itemJArr =JSON.parse(itemJArrStr)
    }

    //adding into the Table
    tbody=document.getElementById('tbody')
    let str =''
    itemJArr.forEach((e, ind) => {
        str+=`
        <tr>
        <th scope="row">${ind+1}</th>
        <td>${e[0]}</td>
        <td>${e[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${ind})">Delete</button></td>
    </tr> `  
    });
    tbody.innerHTML =str;
}
add=document.getElementById("add")
add.addEventListener("click",getAndUpdate)
update()

function deleted(itemInd){
    console.log("delete",itemInd)
    itemJArrStr =localStorage.getItem('itemsJson')
    itemJArr =JSON.parse(itemJArrStr)
    // delete itemIndex element from the array
    itemJArr.splice(itemInd,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJArr))
    update()
}