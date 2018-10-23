let addZero=function(num){
    if (num<10){
        return "0"+num
    }
    else{
        return num       
    }
}
export function getLocalTime(s){
    var myYear= new Date(s).getFullYear()

    var myMonth= new Date(s).getMonth()+1
    var myDay= new Date(s).getDate()
    var showDate = myYear+"-"+addZero(myMonth)+'-'+addZero(myDay)   
   return showDate
};

export function getLocalTimeH(s){
    var myYear= new Date(s).getFullYear()
    var myMonth= new Date(s).getMonth()+1
    var myDay= new Date(s).getDate()
    var myH= new Date(s).getHours()
    var myM= new Date(s).getMinutes()
    var myS= new Date(s).getSeconds()
    var showDate = myYear+"-"+addZero(myMonth)+'-'+addZero(myDay) +'  '+  myH+':'+addZero(myM)+':'+addZero(myS)
   return showDate
};