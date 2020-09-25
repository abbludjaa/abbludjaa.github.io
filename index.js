class Calculator {                                     //skapar classen Calculator och kör dessa när du startar "applikationen". 
  constructor(reminderTextElement, inputTextElement) { //skapar dessa variabler
    this.reminderTextElement = reminderTextElement     //tar värderna ifrån this.reminer..., alltså html'en och gör att dessa varibler får samma värden 
    this.inputTextElement = inputTextElement           //samma som tidigare, bara för inputfälltet iställer för reminder-fältet 
    this.clear()                                       // nollställ räknaren "minne" - ropar på funtionen "clear"
  }                                                    //Sätter dessa elementen i classen Calculator

  DisplayNumber(number) {
    const floatNumber = parseFloat(number)    //sätter nummer till en float / gör stringen till nummer 
    if (isNaN(floatNumber)) return ''         //Ifall floatnumber inte är ett nummer så retrerar vi en tom string 
    return floatNumber.toLocaleString('he-IL')  //ifall vi har ett nummer, retunera till LocaleString efersom
  }
  updateDisplay() {                                                 //som det låter, uppdaterar displayen
    this.inputTextElement.innerText =    
      this.DisplayNumber(this.input)                             //"starta" metoden "get displayNumber"
    if (this.operation != null) {                                   //ifall vi har ett räknesätt, skicka värdet från inputfältet till reminderfältet och visa även vilket räknesätt vi använt
      this.reminderTextElement.innerText = 
        `${this.DisplayNumber(this.reminder)} ${this.operation}` //"starta" metoden "get displayNumber"
    } else {
      this.reminderTextElement.innerText = ''                       //annars, rensa data/ sett värdet till en tom sträng
    }
  }
   
  appendNumber(number) {
    this.input = this.input.toString() + number.toString() //gör om inputen och number till strings efterom det blir blir ex 2+3 istället för inputen 2 och 3 = 23 annars
  }

  chooseOperation(operation) {
    this.operation = operation //sätter ihop "html'en och js'en, typ. Vi måste berätta för datorn att dessa hör ihop"
    this.reminder = this.input //Berättar att vi är klara med att välja räknesätt, så skicka upp inputen till reminden 
    this.input = ''            //ta bort datan ifrån stringen input
  }

  compute() {
    let answer //skapar "answer"
    const reminder = parseFloat(this.reminder) //gör om stringen till endast siffror i remindr
    const input = parseFloat(this.input)       //gör om stringen till endast siffror
    if (isNaN(reminder)) return                //ifall reminder är 0 retunera 
    if (isNaN(input)) return                   //ifall input är 0 retunera 
    switch (this.operation) {                  //skapar en switch funktion - tittar ifall något utav casen uppfylls och genomför det
      case '+':                                //är "+" valt; ta reminder + input och avsluta sedan swithen 
        answer = reminder + input
        break
      case '-':
        answer = reminder - input
        break
      case '*':
        answer = reminder * input
        break
      case '÷':
        answer = reminder / input 
        break
      default:                                 //uppfylls inget krav för detta;  ...inget/return 
        return
    }
    this.input = answer                        //inputen är / blir svaret 
    this.operation = ''                        //rensar data ur operation / tar bort räknesättet
    this.reminder = ''                         //reminder fältet töms efterom svaret ska stå i inputfältet
    
  }

  delete() {                                        //tar bort sista inputen, sista siffran
    this.input = this.input.toString().slice(0, -1) //hämtar input, gör om till en string och "slicear" bort senaste siffan
  }

  clear() {             //overright tidigare data i strängarna
    this.operation = '' //tar bort räknesättet
    this.input = ''     //tar bort siffrorna inputfältet 
    this.reminder = ''  //tar bort siffrorna i reminderfältet 
  }
}
  
const numberButtons = document.querySelectorAll('[data-number]') //Hämtar data ifrån html och "data-" och gör om till element som vi använder i javascriptet för uträkningar 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector('[data-reset]')
const reminderTextElement = document.querySelector('[data-previous-operand]')
const inputTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(reminderTextElement, inputTextElement) //skapar calculatorn

numberButtons.forEach(button => {             //Tar in data ifrån elementet och sätter igång olika "senarion"/ vilka event som ska köras
  button.addEventListener('click', () => {    //När du klickar vill vi göra;
    calculator.appendNumber(button.innerText) //lägg numret i calulator.appendNumber, alltså lägg nummret i arrayen
    calculator.updateDisplay()                //Uppdatera display med nya siffran i arrayen
  })
})

operationButtons.forEach(button => {                 //samma som siffrorna, men för räknesätten
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {   //samma som siffrorna, men för likamed knappen 
  calculator.compute()
  calculator.updateDisplay()
})

resetButton.addEventListener('click', button => { //samma som siffrorna, men för AC knappen 
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {   //samma som siffrorna, men för delete
  calculator.delete()
  calculator.updateDisplay()
})
