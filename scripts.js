let calculation_string='';
document.addEventListener("DOMContentLoaded", function() {
// we wait for dom to get loaded

let input_box = document.getElementById('input');
// we add event listener for key to whole document sa whwen i 
// click enter I want the calculation to take place
document.addEventListener("keydown", function(event){
    event.preventDefault();
    key = event.key;
    calculation_string=handle(event.key, calculation_string, input_box, event.metaKey);

} );
document.querySelectorAll(".txt-button").forEach(button => {
    button.addEventListener("click", function() {

        let value = this.textContent;// this is the current button
        let meta = false;
        if(value==='Ans')
        value ='a';
        else if(value === 'Clr'){
        value = 'Backspace';
        meta = true;
        }
        else if(value==='Del')
        value = 'Backspace';

        calculation_string = handle(value, calculation_string, document.querySelector(".input"), meta);
    });
    });

    document.querySelectorAll(".num-button").forEach(button => {
        button.addEventListener("click", function() {
    
            let value = this.textContent;// this is the current button
            if(value ==="\u00D7" )
            value ='*';
            else if(value ==="\u00F7")
            value='/';
            calculation_string = handle(value, calculation_string, document.querySelector(".input"));
        });
});


document.querySelectorAll(".equal-button").forEach(button => {
    button.addEventListener("click", function() {

        let value = this.textContent;// this is the current button
        if(value ==="=" )
        value ='Enter';
        else 
        value='.';
        calculation_string = handle(value, calculation_string, document.querySelector(".input"));
    });
});
});

function handle(key, calculation_string, input_box, metaKey=false){
    
    if(/([0-9]|[+\-]|[\(\)\.])/.test(key))// regular expression to check if it is a digit
    {input_box.value+=key;
        return calculation_string+=key;}
    
    else if( metaKey && key ==='Backspace'){
        input_box.value='';
        calculation_string='';
    }
    
    else if(key === 'Backspace'){
    input_box.value = input_box.value.substring(0, input_box.value.length-1);
    return calculation_string.substring(0, calculation_string.length-1);
    }

    else if(key=== '*'){
        input_box.value+="\u00D7"; 
        return calculation_string+='*';
    }

    else if(key=== '/'){
        input_box.value+="\u00F7"; 
        return calculation_string+='/';
    }
    else if(key==='Enter'|| key==='='){
        calculate(calculation_string);
    }
    else if(key =='a'){
        let previous = localStorage.getItem('answer');
        if(previous !== null && previous !== undefined)
        {
            input_box.value+=previous;
            calculation_string+=previous;
        }
        return calculation_string;
    }
    
    return calculation_string;
    

}
function calculate(calculation_string)
{
    if(eval(calculation_string)!== undefined){
    answer= document.querySelector('.answer').innerHTML= eval(calculation_string);
    localStorage.setItem('answer',eval(calculation_string));
    }
    else
    answer= document.querySelector('.answer').innerHTML= 'Error';

}