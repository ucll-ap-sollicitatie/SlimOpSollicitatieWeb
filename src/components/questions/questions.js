/**
 *  -JOB- wordt vervangen door de job titel
 *  -COMP- wordt vervangen door elke competentie
 */
const vrTaken = "Welke taken denk jij dat het belangrijkste zijn in deze job van -JOB-?"
const vrTakenD2 = "Van de eerder genoemde taken, kan je aangeven welke je leuk, lastig of tweeledig vindt? Tweeledig betekent dat je een stukje leuk en een stukje lastig vindt."
const vrCar = "Welke ervaring heb jij die relevant is om deze taken uit te voeren?"
const vrCom = "Je hebt aangegeven dat competentie -COMP- belangrijk is. Geef een voorbeeld van een situatie waarin je deze competentie hebt toegepast."
const vrA = "Wat is jouw motivatie voor deze job als -JOB-?"
const vrU = "Welke vragen heb jij over deze job of over het werken bij ons?"
const vrS = "Geef een score van 1-5 hoe je jezelf deze job ziet doen? En leg uit"


function parsedvragenlijst(functie, skills){
    var list = []
    vragenlijst().forEach(vraag => {
        vraag = vraag.replace("-JOB-", functie)
        if(vraag.includes("-COMP-")){
            for(var i = 0; i<skills.length; i++){
                var q = vraag.replace("-COMP-", skills[i])
                list.push(q)
            }
        }
        else{
            list.push(vraag)
        }
    }); 
    return list
}

function vragenlijst(){
    return [vrTaken, vrTakenD2, vrCar, vrCom, vrA, vrU, vrS]
}

export {vragenlijst, parsedvragenlijst};