# Interview Bot Server

Ensure that you have the lastest version of Node.js installed and preferably the lastest version of sqlite installed. Once this is done run:
```
git clone https://github.com/Bachmair-Boys/interview-bot-server
cd interview-bot-server
```

# Running

```
npm start
```

# Interview Bot API

# Category Identification
BASIC = 0 <br>
BEHAVIORAL = 1<br>
SALARY = 2<br>
BRAINTEASER = 3<br>

# RETURN CODES
SUCCESS = 0<br>
DATABASE_CONNECTION_ERROR = 100<br>
DATABASE_LOOKUP_ERROR = 101<br>

## Methods
---
_get-count_: POST, Gets the number of questions in a given question category.<br>
Parameters:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**category**: int, category identification number to get count from<br>
Return:<br>
&nbsp;&nbsp;&nbsp;&nbsp;JSON-Encoded Data: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;**status**: _int_, SUCCESS if check succeeded, DATABASE_LOOKUP_ERROR otherwise,<br>
&nbsp;&nbsp;&nbsp;&nbsp;**count**: _int_, number of comments in the requested category<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
<br>

_get-question_: POST, Gets the requested question number in the requested question category.<br>
Parameters:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**category**: _int_, category identification number to find question in.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**question**: _int_, number of the question in the category<br>
Return: <br>
&nbsp;&nbsp;&nbsp;&nbsp; JSON-Encoded Data: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;**status**: _int_, SUCCESS if check succeeded, DATABASE_LOOKUP_ERROR otherwise,<br>
&nbsp;&nbsp;&nbsp;&nbsp;**count**: _int_, number of comments in the requested category<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>

_create-question_: POST, Adds the given question to the database in the requested question category.<br>
Parameters:<br>
&nbsp;&nbsp;&nbsp;&nbsp;**category**: _int_, category identification number to find question in.<br>
&nbsp;&nbsp;&nbsp;&nbsp;**question**: _string_, user created question<br>
Return: <br>
&nbsp;&nbsp;&nbsp;&nbsp; JSON-Encoded Data: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;**status**: _int_, SUCCESS if check succeeded, DATABASE_LOOKUP_ERROR otherwise,<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>

_get-categories_: GET, Gets the categories of questions currently in the database.<br>
Parameters:<br>
&nbsp;&nbsp;&nbsp;&nbsp; None<br>
Return: <br>
&nbsp;&nbsp;&nbsp;&nbsp; JSON-Encoded Data: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;**status**: _int_, SUCCESS if check succeeded, DATABASE_LOOKUP_ERROR otherwise,<br>
&nbsp;&nbsp;&nbsp;&nbsp;**categories**: _string[]_ , number of comments in the requested category<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>

_get-categories_: GET, Adds the given category of questions into the database.<br>
Parameters:<br>
&nbsp;&nbsp;&nbsp;&nbsp; **category\_name**: _string_, name of the new <br>
Return: <br>
&nbsp;&nbsp;&nbsp;&nbsp; JSON-Encoded Data: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;**status**: _int_, SUCCESS if check succeeded, DATABASE_LOOKUP_ERROR otherwise,<br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
