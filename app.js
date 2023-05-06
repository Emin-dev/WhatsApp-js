$(document).ready(function () {


    
    $("#me").click(function (e) {
        e.preventDefault()
        function myel(myclass = "") {
            if (!$("#inputme").val().trim() == '') {
                let vall = $("#inputme").val()
                    , newH3 = $('<h3> </h3>')
                    , newDiv = $('<div class="line" > </div>')
                    , bigDiv = $(`<div ${myclass} > </div>`)
                $(newH3).append(vall)
                $(newDiv).append(newH3)
                $(bigDiv).append(newDiv)
                return bigDiv
            }
            else {
                return
            } 

        }
        $("#messageyou").append(myel())
        $("#messageme").append(myel('class="end"'))
        $("#inputme").val("")
        document.querySelector("#messageme").scrollTo(0, document.querySelector("#messageme").scrollHeight)
        document.querySelector("#messageyou").scrollTo(0, document.querySelector("#messageyou").scrollHeight)
    })















    $("#you").click(function (e) {
        e.preventDefault()
        if (!$("#inputyou").val().trim() == '') {
            myel = (myclass = "") => {
                let vall = $("#inputyou").val()
                    , newH3 = $('<h3> </h3>')
                    , newDiv = $('<div class="line" > </div>')
                    , bigDiv = $(`<div ${myclass} > </div>`)
                $(newH3).append(vall)
                $(newDiv).append(newH3)
                $(bigDiv).append(newDiv)
                return bigDiv
            }
        }
        else {
            return
        }

        $("#messageyou").append(myel('class="end"'))
        $("#messageme").append(myel())
        $("#inputyou").val("")
        document.querySelector("#messageme").scrollTo(0, document.querySelector("#messageme").scrollHeight)
        document.querySelector("#messageyou").scrollTo(0, document.querySelector("#messageyou").scrollHeight)
    })


























    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${$("#myWeather").val()}&appid=012d3a58b4fd8ab58c50576d8d087fc1&units=metric`
            async function myweather() {
                let responce = await fetch(url)
                let data = await responce.json()
                $("#city").html(data.name)
                $("#temp").html(data.main.temp)
                $("#feels").html(data.main.feels_like)
                $("#myWeather").val("")
                console.log(data)
            }
            myweather()
        }
    })

    $("#btn").click(function (e) {
        e.preventDefault()
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${$("#myWeather").val()}&appid=012d3a58b4fd8ab58c50576d8d087fc1&units=metric`
        async function myweather() {
            let responce = await fetch(url)
            let data = await responce.json()
            $("#city").html(data.name)
            $("#temp").html(data.main.temp)
            $("#feels").html(data.main.feels_like)
            $("#myWeather").val("")
            console.log(data)
        }
        myweather()
    })
















// $('h2').click(function (e) { 
//     e.preventDefault();
//     $('h2').html(1234);
// });



// $('.btn').click(function (e) { 
//     e.preventDefault();
    
//     let a = (a) =>  {
//         for (let i = 1; i <=a; i++) {
//             $('.col-md-12').append(`<h1>${i}</h1>`);
//         }
//     }
//     a($('input').val())
//     $('input').val('');

// });












































    // function sum1(a, b) {
    //     return a + b
    //   }
    //   let sum2 = function(a, b) {
    //     return a + b
    //   }
    let sum3 = (a, b) => a + b || ''


    // console.log(sum3(null, undefined))
    // console.log(sum3(1, 2))
    //a+=b




    




    // let count = function(array) { 
    //     return array.length
    //   }
    let count = (array) => array ? array.length : ''


    let methods = {
        numbers: [1, 5, 8],
        sum: function () {
            return this.numbers.reduce(function (acc, num) {
                return acc + num
            })
        }
    }
    // console.log(count(null))
    // console.log(count(undefined))
    // console.log(count([5, 7, 8]))
    // console.log(methods.sum())



    let c
    if (!c) {
        // do something...
    }




    let z = 333;
    // let x = () =>  console.log('x');
    // let y = () =>  console.log('y') ;

    // (z == 3 ? x : y )()



    let m = 33, n = 20
    let obj = { m, n }
    // console.log(obj)


    myf = (a) => {
        // console.log(a)
        // console.log(a * 2)
    }
    myf(4998)


    volume = (l, w = 3, h = 4) => (l * w * h) || ''
    // console.log(volume(1,null,2))
    // console.log(volume(1,undefined,9)) 
    // console.log(volume(1,1,9))
    // console.log(volume(8))
    // console.log(volume(  ))



    let odd = [1, 3, 5]
    let nums = [2, 4, 6, ...odd]
    // console.log(nums) // [ 2, 4, 6, 1, 3, 5 ]

    // cloning arrays
    let arr = [1, 2, 3, 4]
    let arr2 = [...arr]
 


    // miss = () =>('Missing parameter!')
    // foo = (bar = miss()) => bar
    // console.log(foo(22));


    foo = (bar) => bar || 'Missing parameter!'
    // console.log(foo(33));




    const pets = [
        { type: 'Dog', name: 'Max' },
        { type: 'Cat', name: 'Karl' },
        { type: 'Dog', name: 'Tommy' },
    ]

    pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Tommy');

    findDog = (name) => {
        for (let i = 0; i < pets.length; ++i) {
            if (pets[i].type === 'Dog' && pets[i].name === name) {
                return pets[i];
            }
        }
    }

    // console.log(pet)



    //  Calling .keys() returns an iterator, which lets you iterate over the key values. Important thing at this step is it doesn't return an actual array, you have to spread or loop over the iterator to get the values.

    // myarr = (a) => console.log(a[a.indexOf(Math.min(...a)) + 1], a[a.indexOf(Math.max(...a)) - 1])
    // myarr(ararr = [...Array(50).keys()])

    //     for (let fruit of fruits)
    // If you just wanted to access the index, do:

    // for (let index in fruits)



    let sarray = [12, 89, 67, 54, 32, 21, 98, 57, 27, 83, 10]
    // let funs = (arr,num) => console.log(arr.filter(a=>a>num))
    // funs(sarray,70)


    // console.log(sarray.filter(a=>a>70))





    ///bad
    // function uppercase(str) {
    //     var array1 = str.split(' ');
    //     var newarray1 = [];

    //     for (var x = 0; x < array1.length; x++) {
    //         newarray1.push(array1[x].charAt(0).toUpperCase() + array1[x].slice(1));
    //     }
    //     return newarray1.join(' ');
    // }
    // console.log(uppercase("the quick brown fox"));

    ///good
    upse = a => {
        newarr = []
        for (let i of a.split(' '))
            newarr.push(i.charAt(0).toUpperCase() + i.slice(1))
        return newarr.join(' ')
    }
    // console.log(upse('the quick brown fox'))
    $("#big").click(me = () => $("#anw").val(upse($("#anw").val())))

    //// video


    
})
