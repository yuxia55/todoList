/**
 * Created by kingson on 2019/7/10.
 */
//获取输入框的元素对象
var inpDom = document.querySelector("#write")
var todoList = document.querySelector(".todo .clist")
var doneList = document.querySelector(".done .clist")
var todoNum = document.querySelector(".todo .num")
var doneNum = document.querySelector(".done .num")

var main = document.querySelector(".main")

var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[]
renderList()
//
inpDom.onkeypress = function(e){
    if(e.key == "Enter" && inpDom.value !=""){
        var data={
            content:inpDom.value,
            type:"todo"
        }
       dataList.push(data)
       renderList()
    }

}
function renderList(){
    localStorage.dataList = JSON.stringify(dataList)

    todoList.innerHTML = ""
    doneList.innerHTML = ""

    var todoNo = 0;
    var doneNo = 0;
    dataList.forEach(function(item,index){
         var newDiv = document.createElement("div")
         newDiv.className = "item"
        if(item.type == "todo"){
            todoNo ++;
            newDiv.innerHTML = `
         <span class="checkbox">
              <input type="checkbox" name="check" value="" data-index =${index}>
         </span>
         <span class="content">
            ${item.content}
         </span>
         <span class="delete" data-index =${index}></span>
        `
            todoList.appendChild(newDiv)
        }else{
            doneNo ++;
            newDiv.innerHTML = `
         <span class="checkbox">
              <input type="checkbox" name="check" value="" checked ="checked">
         </span>
         <span class="content">
            ${item.content}
         </span>
         <span class="delete" data-index =${index}></span>
        `
            doneList.appendChild(newDiv)
        }
    })
    todoNum.innerHTML = todoNo;
    doneNum.innerHTML = doneNo;

}
//将代办移到完成
todoList.onchange = function(e){
    var i = e.target.dataset.index
    dataList[i].type = "done"
    renderList()
}
//
main.addEventListener("click",function(e) {
    if(e.target.className == "delete"){
        var i = e.target.dataset.index
        dataList.splice(i,1)
        renderList()
    }
})


