# Some demos for Watson

## Conversation

The [Conversation](https://www.ibm.com/watson/developercloud/conversation.html) algorithm's output is [conversationResponse](./conversationResponse.json).  This is the result of sending `What is Up` to the conversation algorithm.  Note that I asked it to respond to "What's Up".  The confidence is high but not 100 percent.

## Comey's Testimony
Comey's opening statement is in [comey.txt](./comey.txt).  The following algorithms use this testinomy to gain insights.

### Personality

The [Personality](https://www.ibm.com/watson/developercloud/personality-insights.html) algorithm's output is [comeyPersonality](./comeyPersonality.json).

### Natural Language Understanding

The [Language Understanding](https://www.ibm.com/watson/developercloud/natural-language-understanding.html) algorithm's output is [comeyLanguage](./comeyLanguage.json).

### Tone Analyzer

The [Tone Analyzer](https://www.ibm.com/watson/developercloud/tone-analyzer.html) algorithm's output is [comeyTone](./comeyTone.json).

## Doc Conversion

The [Document Conversion](https://www.ibm.com/watson/developercloud/document-conversion.html) algorithm takes PDFs and converts them into JSON.  I have a [ML Homework PDF](./ex7.pdf) which I convert to [JSON](./ex7.json).

## Query news

The [Discovery](https://www.ibm.com/watson/developercloud/discovery-news.html) API finds news related to search terms.  I have searched for sentiment regarding Comey (on 2017-06-10).  The results are in the [comeyNews](./comeyNews.json) file.