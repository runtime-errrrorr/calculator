document.addEventListener("DOMContentLoaded", function(){
    const butContainer = document.querySelector(".buttonPanel");
    const display = document.querySelector(".inputDisplay");
    let values = ['C','+/-','%','/',7,8,9,'*',4,5,6,'-',1,2,3,'+',0,'⌫','.','='];
    let countOperator = 0;
    values.forEach((value) =>{
        let button = document.createElement('button');
        button.innerText = value;
        if((value >=0 && value <= 9) || value == '.' || value == '⌫')
        {
           button.classList.add("button"); 
        }
        else if(value == 'C' || value == "+/-" || value == '%')
        {
            button.classList.add('spclOperators');
        }
        else
        {
            button.classList.add('operators');
        }
        button.addEventListener('click',() => {
            const value = button.innerText;
            console.log(value);
  
            if(['+','-','%','*','/','.'].includes(display.innerText.charAt(display.innerText.length - 1)) && ['+','-','%','*','/','.'].includes(value))
            {
               display.innerText = display.innerText.slice(0,-1);
               display.innerText += value;
            }
            else if(value != '⌫' && value != 'C' && value != '=' && value != '+/-')
            {
                if(['+','-','%','*','/'].includes(value))
                {
                    countOperator++;
                }
                if(countOperator > 1)
                {
                    let res = evaluate(display.innerText);
                    display.innerText = res;
                    countOperator = 0;
                    
                }
                display.innerText += value;
            }
            else if(value == '=')
            {
                
                let res = evaluate(display.innerText);
                display.innerText = res;
            }
            else if(value == '⌫')
            {
                let val = display.innerText;
                val = val.slice(0,-1);
                display.innerText = val;
            }
            else if(value == 'C')
            {
                display.innerText = "";
            }
        });
        butContainer.appendChild(button);
        
    });
    

});

function evaluate(str)
{
    const regex = /^(\d+(\.\d+)?)\s*([+\-*/])\s*(\d+(\.\d+)?)$/;

    // Test if the expression matches the pattern
    const match = str.match(regex);

    // if (!match) {
    //     return 'you dumb';
    // }
     // Extract operands and operator from the match
     const operand1 = parseFloat(match[1]);
     const operator = match[3];
     const operand2 = parseFloat(match[4]);
 
     // Perform the calculation based on the operator
     let result;
     switch (operator) {
         case '+':
             result = operand1 + operand2;
             break;
         case '-':
             result = operand1 - operand2;
             break;
         case '*':
             result = operand1 * operand2;
             break;
         case '/':
             if (operand2 === 0) {
                 return 'sikeee';
             }
             result = Math.round((operand1 / operand2)*1000)/1000;
             break;
        case '%':
            
         default:
             return 'Invalid operator';
     }
 
     return result;
 
}