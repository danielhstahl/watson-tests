const ConversationV1=require('watson-developer-cloud/conversation/v1')
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const DocumentConversionV1 = require('watson-developer-cloud/document-conversion/v1')
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1')
const credentials=require('./credentials.json')
const fs=require('fs')
const getObjFromCredentials=(credentials, key)=>{
    return credentials[key]
}

const conversation = new ConversationV1(Object.assign({}, 
    getObjFromCredentials(credentials, "conversation"),
    {version_date: ConversationV1.VERSION_DATE_2017_04_21}
))
const personality = new PersonalityInsightsV3(Object.assign({}, 
    getObjFromCredentials(credentials, "personality"),
    {version_date: '2016-10-19'}
))
const languageUnderstanding = new NaturalLanguageUnderstandingV1(Object.assign({}, 
    getObjFromCredentials(credentials, "languageUnderstanding"),
    {version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27}
))
const toneAnalyzer = new ToneAnalyzerV3(Object.assign({}, 
    getObjFromCredentials(credentials, "toneAnalyzer"),
    {version_date: '2016-05-19'}
))
const docConversion = new DocumentConversionV1(Object.assign({}, 
    getObjFromCredentials(credentials, "docConversion"),
    {version_date: '2015-12-01'}
))
const discovery = new DiscoveryV1(Object.assign({}, 
    getObjFromCredentials(credentials, "discovery"),
    {version_date: DiscoveryV1.VERSION_DATE_2017_04_27}
))


/**Conversation */
conversation.message({
  input: { text: 'What is Up?' },
  workspace_id:getObjFromCredentials(credentials, "conversation").workspace_id
 }, (err, response)=>{
     //console.log(response.output.text)
     //console.log(response.intents)
     fs.writeFile('./conversationResponse.json', JSON.stringify(response, null, 2), (err)=>err?console.log(err):null)
});
/**Doc Conversion*/
docConversion.convert({
    file:fs.createReadStream('ex7.pdf'),
    // (JSON) ANSWER_UNITS, NORMALIZED_HTML, or NORMALIZED_TEXT
    conversion_target: docConversion.conversion_target.ANSWER_UNITS,

}, (err, response)=>{
    if (err)
    console.log('error:', err);
    else
    fs.writeFile('./ex7.json', JSON.stringify(response, null, 2), (err)=>err?console.log(err):null)
})

/**Discovery */
const query={aggregation:'filter(keywords.text:"Comey").term(docSentiment.type,count:3)', query:"", count:0}
discovery.query(Object.assign({}, getObjFromCredentials(credentials, "discovery"), query), (err, response)=>{
    if (err) {
        console.error(err);
    } else {
        fs.writeFile('./comeyNews.json', JSON.stringify(response, null, 2), (err)=>err?console.log(err):null)
    }
});

/**Comey work */
fs.readFile('./comey.txt', (err, data)=>{
    const text=data.toString()
    personality.profile({
        text,
        consumption_preferences: true
    },
    (err, response)=>{
        if (err)
        console.log('error:', err);
        else
        fs.writeFile('./comeyPersonality.json', JSON.stringify(response, null, 2), (err)=>err?console.log(err):null)
        //console.log(JSON.stringify(response, null, 2));
    });
    languageUnderstanding.analyze({
        'html': text, // Buffer or String
        'features': {
            'concepts': {},
            'keywords': {},
            'sentiment':{}
        }
    }, (err, response)=>{
        if (err)
        console.log('error:', err);
        else
        fs.writeFile('./comeyLanguage.json', JSON.stringify(response, null, 2), (err)=>err?console.log(err):null)
        //console.log(JSON.stringify(response, null, 2));
    });
    toneAnalyzer.tone({ text},
    (err, tone)=>{
        if (err)
        console.log(err);
        else
        fs.writeFile('./comeyTone.json', JSON.stringify(tone, null, 2), (err)=>err?console.log(err):null)
    })
})
