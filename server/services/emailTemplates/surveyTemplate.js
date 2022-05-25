const keys = require("../../confing/keys");
module.exports = (survey) => {
  return ` <html> 
      <body>
        <div style="text-align : center;"> 
          <h2>I'd Like to your Input ! </h2>
          <p> Please answer these Questions !</p>
          <p>${survey.body} </p>
          <div>
          <div">
           <button type="button"><a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a></button>
          </div>
          <div>
            <button type="button"><a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a></button>
          <div>
        </div>
      </body>
    </html>
  
  `;
};
