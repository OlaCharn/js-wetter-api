//вводим api c ключом
const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "6755dfc2a61ba1caca645b9c04598150"
}
//console.log(api) //проверяем

const input = document.querySelector("#input"); //даем доступ к графе ввода

input.addEventListener("keypress", enter); //ставим прослушку на действие keypress, чтобы потом сработала функция enter которую прописываем ниже

function enter(e){
    if (e.keyCode === 13){ //если нажата кнопка 13*ентер, то выполни следующее
        getInfo(input.value)  
    }
}
//https://openweathermap.org/current
//эта функция для того, чтобы связаться с арi и получить в консоли данные. Чтобы потом видеть путь для их отражения в следующей функции
async function getInfo(data){  
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`); //это мы делаем из ссылки api :  http://api.openweathermap.org/data/2.5/weather?q=   London,uk & APPID=    6755dfc2a61ba1caca645b9c04598150   units=metric - это метрическая система
    console.log(res);
    const result = await res.json(); 
    console.log(result)
    displayResult(result);
}
    

//оражаем все, что получили
function displayResult(result){
    let city = document.querySelector("#city"); //город 
    city.textContent= `${result.name}, ${result.sys.country}`

    let temp = document.querySelector("#temp"); //температура
    temp.innerHTML = `${Math.round(result.main.temp)} <span>°</span>`

    let feelsLike = document.querySelector("#feelsLike"); //температура по ощущениям
    feelsLike.innerHTML = "Feels like "+`${Math.round(result.main.feels_like)}<span>°</span>`

    let condition = document.querySelector("#condition"); //солнечно/облачно
    condition.textContent = `${result.weather[0].main}`

    let variation = document.querySelector("#variation"); //колебания температуры
    variation.innerHTML = "Min: "+`${Math.round(result.main.temp_min)}<span>°</span>`+" "+"Max: "+`${Math.round(result.main.temp_max )}<span>°</span>`

    //отражаем дату. Дата отражается в некрасовм формате. Делаем нужное нам отражение с помощью следующей функции
    getOurDate()
}

//https://www.w3schools.com/js/js_date_methods.asp

function getOurDate(){
    const myDate = new Date(); //сначала просто определили нашу дату сегодня 

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //вытаскиваем из нее в нужном нам виде информацию
    let day = days[myDate.getDay()] //это и далее это с сайта https://www.w3schools.com/js/js_date_methods.asp . Там написано, как отражать
    console.log(day)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[myDate.getMonth()];
    console.log(month)

    let dayNumber = myDate.getDate();
    console.log(dayNumber);

    let year = myDate.getFullYear();
    console.log(year);
 
    let showDate = document.querySelector("#date"); //всю вытащенную информацию соединяем и отправляем в нужное нам место
    showDate.textContent = `${day}`+" "+`${dayNumber}` + " "+`${month}` + " "+`${year}` ;


}
