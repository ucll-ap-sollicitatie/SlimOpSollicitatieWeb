const fTaken = "Weet -VNAAM- vlot te vertellen welke taken hij moet uitvoeren?"
const fCarriere = "Is de ervaring die -VNAAM- vertelt echt relevant voor deze job?"
const fCompetentiesJob = "Hoe geloofwaarig en helder komt in het verhaal naar voor dat -VNAAM- de competentie -COMP- bezit?"
const fCompetentiesPers = "Hoe geloofwaarig en helder komt in het verhaal naar voor dat -VNAAM- de competentie -COMPJOB- bezit?"
const fAttitudes = "We horen een voorbeeld dat authentiek aangeeft waarom -VNAAM- gemotiveerd is voor deze job. "
const fUitzoeken = "De vraag die -VNAAM- stelde ging die over: \n Het goed kunnen uitvoeren van het werk : zeer goed 5 of 4 \n De verloning voor de job: zeer slecht 1 \n Een vraag naar het selectieproces dat hij/zij dient te doorlopen: OK 2 of 3"
const fScorenAlgemeen = "Het is niet de hoogte van de score, maar de uitleg die -VNAAM- gaf voor zijn score die je beoordeelt op geloofwaardigheid"
const fScorenL = " -VNAAM- heeft voor de verkeerde job gesolliciteerd. Hoe goed wordt deze vergissing toegegeven?"
const fScorenM = "-VNAAM- vertelt waarom hij/zij zich in staat acht om deze job te doen. Maar heeft -VNAAM- ook verteld waarin hij/zij tekortschiet?"
const fScorenH = "Dan is dit omdat -VNAAM- zich heel goed in staat acht om deze job te doen. Hoe geloofwaardig is zijn uitleg?"

/**
 * Make object from all feedback questions
 */
function getAllFeedbackObject(){
    return{ 
        "fTaken": fTaken,
        "fCarriere" : fCarriere,
        "fCompetentiesJob": fCompetentiesJob,
        "fCompetentiesPers": fCompetentiesPers,
        "fAttitudes" : fAttitudes,
        "fUitzoeken" : fUitzoeken,
        "fScorenAlgemeen" : fScorenAlgemeen,
        "fScorenL" : fScorenL,
        "fScorenM" : fScorenM,
        "fScorenH" : fScorenH
    }
}

function parseQuestionFeedback(vnaam, compj, comps){

}

/**
 * Make array from all feedback questions
 */
function getAllFeedbackArray(){
    return [fTaken, fCarriere, fCompetentiesPers, fCompetentiesJob, fUitzoeken, fScorenAlgemeen]
}
export {getAllFeedbackObject, getAllFeedbackArray};