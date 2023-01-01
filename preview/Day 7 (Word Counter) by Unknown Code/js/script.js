var textArea= document.getElementById("text-area");

textArea.addEventListener("input",function(){
    let count = (textArea.value).length
    document.getElementById("count").innerHTML= count;
});